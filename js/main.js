import {getTrandingDay} from '/js/trandingDayResponse.js';
import {cutText} from '/js/filmsDescription.js';
import {addEventMedia} from '/js/addEventMedia.js';



const searchForm = document.querySelector('#search-form'),
    btnForm = document.querySelector('.btnForm'),
    movies = document.querySelector('#movies'),
    imagePoster = 'https://image.tmdb.org/t/p/w500';
function apiSearch(event){
    event.preventDefault();
    const  searchText = document.querySelector('.form-control').value;

    if(searchText.trim().length === 0){
        movies.innerHTML = `<h2 class="col-12 text-center text-danger">Field shoudn't be empty</h2>`;
        return;
    }

    const  server = 'https://api.themoviedb.org/3/search/multi?api_key=a1d9f1331776385aafc953bd762fce3b&language=en-US&query=' + searchText;
    
    movies.innerHTML =`<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
    fetch(server)
    .then( response => {
        return response.json();
    })
    .then( data => {

        let inner = '';
        if(data.results.length == 0){
            inner = `<h2 class="col-12 text-center text-info titlePosters">No results found for your request</h2>`;
        }
        data.results.forEach(item => {
            let nameFilm = item.name || item.title;
            const poster = item.poster_path ? imagePoster + item.poster_path : '/image/noposter.jpg';
            let dataInfo = '';
            let overview = item.overview;
            let itemDate = (item.release_date !== "" && item.release_date !== undefined) ? (new
                    Date(Date.parse(item.release_date))).toLocaleString("en", {
                        year: 'numeric', day: 'numeric', month: 'long'
                    }) : 'Unknown';
            if(item.media_type !== 'person') dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
            inner += `
            <div class="col-12 col-md-4 cardPoster" ${dataInfo}>
                <div class="card">
                    <img src='${poster}' class='img_poster' alt='${nameFilm}' >
                    <div class="col-12 cardInfo">
                        <h5 class="card-title text-success text-center">${nameFilm}</h5>
                        <h6 class="text-center text-info font-weight-light">Release date: ${itemDate}</h6>
                        <p class="text-sm-left"><small>${cutText(overview, 40, '...')}</small></p>
                    </div>
                </div>
            </div>       
            `;
           
        });
        movies.innerHTML = inner;
        addEventMedia();
    })
    .catch( error => {
        console.log(`Error: ${error.status}`);
    });
};

searchForm.addEventListener('submit',apiSearch);
document.addEventListener('DOMContentLoaded',getTrandingDay);

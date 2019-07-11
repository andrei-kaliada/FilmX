import {getTrandingDay} from '/js/trandingDayResponse.js';
import {showDescription} from '/js/filmsDescription.js';

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
        console.log(data.results);
        let inner = '';
        if(data.results.length == 0){
            inner = `<h2 class="col-12 text-center text-info titlePosters">No results found for your request</h2>`;
        }
        data.results.forEach(item => {
            let nameFilm = item.name || item.title;
            const poster = item.poster_path ? imagePoster + item.poster_path : '/image/noposter.jpg';
            let dataInfo = '';
            if(item.media_type !== 'person') dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
            inner += `
            <div class="col-12 col-md-4 cardPoster" ${dataInfo}>
                <img src='${poster}' class='img_poster' alt='${nameFilm}' >
                <h5>${nameFilm}</h5>
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


function addEventMedia(){
    const media = movies.querySelectorAll('.cardPoster[data-id]');
    media.forEach(elem =>{
        elem.classList.add('cardBorder');
        elem.addEventListener('click',showFullInfo);
    });
};

function showFullInfo(){
    let url = '';
    if(this.dataset.type === 'movie'){
        url = 'https://api.themoviedb.org/3/movie/' + this.dataset.id + '?api_key=a1d9f1331776385aafc953bd762fce3b&language=en-US';
    } else if(this.dataset.type === 'tv'){
        url = 'https://api.themoviedb.org/3/tv/' + this.dataset.id + '?api_key=a1d9f1331776385aafc953bd762fce3b&language=en-US';
    }else{
     inner = `<h2 class="col-12 text-center text-info">No results found for your request</h2>`;
    }
    showDescription(url);
};

document.addEventListener('DOMContentLoaded',getTrandingDay);

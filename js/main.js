import {getTrandingDay} from '/js/trandingDayResponse.js';


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
            if(item.media_type !== 'person') dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
            inner += `
            <div class="col-12 col-md-4 cardPoster" ${dataInfo}>
                <div class="card">
                    <img src='${poster}' class='img_poster' alt='${nameFilm}' >
                    <div class="cardInfo">
                        <h5>${nameFilm}</h5>
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
    

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            movies.innerHTML = `
            <div class="col-12 text-center text-info titlePosters">
                <h2>${data.name || data.title}</h2>
            </div>
            <div class ="col-12">
                <div class="row">
                    <div class = "col-md-4 col-sm-12x">
                        <img src="${imagePoster + data.poster_path}" alt="${data.name || data.title}" style="max-width:100%;">
                        <div class="linksOfficial">
                            ${(data.homepage) ? `<p><a href='${data.homepage}' target="_blank">Official page</a></p>` : ''}
                            ${(data.imdb_id) ? `<p><a href='http://imdb.com/title/${data.imdb_id}' target="_blank">Page IMDB.com</a></p>` : ''}
                        </div>    
                    </div>
                    <div class = "col-md-8 col-sm-12">
                        <p>Rate: ${data.vote_average}</p>
                        <p>Status: ${data.status}</p>
                        <p>Premiere: ${data.first_air_date || data.release_date}</p>
                        ${(data.last_episode_to_air) ? `<p>${data.number_of_seasons} season
                        ${data.last_episode_to_air.episode_number} episodes released 
                        </p>`:''}
                        ${data.overview}
                    </div>              
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="youtube"></div>
                    </div>
                </div>    
            </div>
            `;

            getVideo(this.dataset.type,this.dataset.id);
        })
        .catch(error => {
            console.log(`Error: ${error.status}`);
        });
};

function getVideo(type,id){
    let youtube = movies.querySelector('.youtube');
    //youtube.innerHTML = id;
    youtube.innerHTML = type;

}

document.addEventListener('DOMContentLoaded',getTrandingDay);

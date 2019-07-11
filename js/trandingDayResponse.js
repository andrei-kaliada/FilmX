import {showDescription} from '/js/filmsDescription.js';

const movies = document.querySelector('#movies'),
    imagePoster = 'https://image.tmdb.org/t/p/w500';

function getTrandingDay(){
    movies.innerHTML =`<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=a1d9f1331776385aafc953bd762fce3b')
    .then( response => {
        return response.json();
    })
    .then( data => {
        console.log(data.results);
        let inner = `
        <div class="col-md-12 titlePosters text-info">
            <h2>Popular for the week</h2>
        </div>`;
        if(data.results.length == 0){
            inner = `<h2 class="col-12 text-center text-info">No results found for your request</h2>`;
        }
        data.results.forEach(item => {
            let nameFilm = item.name || item.title;
             const poster = item.poster_path ? imagePoster + item.poster_path : '/image/noposter.jpg';
            let mediaType = item.title ? 'movie' : 'tv';
            let dataInfo = `data-id="${item.id}" data-type="${mediaType}" `;
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
}

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

export {getTrandingDay};
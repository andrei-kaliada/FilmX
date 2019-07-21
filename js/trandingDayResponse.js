import {addEventMedia} from '/js/addEventMedia.js';
import {cutText} from '/js/filmsDescription.js';

const movies = document.querySelector('#movies'),
    imagePoster = 'https://image.tmdb.org/t/p/w500';

function getTrandingDay() {
    movies.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=a1d9f1331776385aafc953bd762fce3b')
        .then(response => {
            return response.json();
        })
        .then(data => {

            let inner = `
        <div class="col-md-12 titlePosters text-info">
            <h2>Popular for the week</h2>
        </div>`;
            if (data.results.length == 0) {
                inner = `<h2 class="col-12 text-center text-info">No results found for your request</h2>`;
            }
            data.results.forEach(item => {
                let nameFilm = item.name || item.title;
                const poster = item.poster_path ? imagePoster + item.poster_path : '/image/noposter.jpg';
                let mediaType = item.title ? 'movie' : 'tv';
                let dataInfo = `data-id="${item.id}" data-type="${mediaType}" `;
                let overview = item.overview;
                let itemDate = (item.release_date !== "" && item.release_date !== undefined) ? (new
                    Date(Date.parse(item.release_date))).toLocaleString("en", {
                        year: 'numeric', day: 'numeric', month: 'long'
                    }) : 'Unknown';
                inner += `
            <div class="col-12 col-md-4 cardPoster" ${dataInfo}>
                <div class="card">
                    <img src='${poster}'alt='${nameFilm}' >
                    <div class="col-12 cardInfo">
                        <h5 class="card-title text-success text-center">${nameFilm}</h5>
                        <h6 class="text-center text-info font-weight-light">Release date: ${itemDate}</h6>
                        <p class="lead"><small>${cutText(overview, 40, '...')}</small></p>
                    </div>
                </div>
            </div>    
            `;

            });
            movies.innerHTML = inner;
            addEventMedia();
        })
        .catch(error => {
            console.log(`Error: ${error.status}`);
        });
}

export { getTrandingDay };
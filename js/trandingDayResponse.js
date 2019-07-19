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
        .catch(error => {
            console.log(`Error: ${error.status}`);
        });
}

function addEventMedia() {
    const media = movies.querySelectorAll('.cardPoster[data-id]');
    media.forEach(elem => {
        elem.classList.add('cardBorder');
        elem.addEventListener('click', showFullInfo);
    });
};

function showFullInfo() {
    let url = '';
    if (this.dataset.type === 'movie') {
        url = 'https://api.themoviedb.org/3/movie/' + this.dataset.id + '?api_key=a1d9f1331776385aafc953bd762fce3b&language=en-US';
    } else if (this.dataset.type === 'tv') {
        url = 'https://api.themoviedb.org/3/tv/' + this.dataset.id + '?api_key=a1d9f1331776385aafc953bd762fce3b&language=en-US';
    } else {
        inner = `<h2 class="col-12 text-center text-info">No results found for your request</h2>`;
    }

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {

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
                   </p>`: ''}
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

            getVideo(this.dataset.type, this.dataset.id);
        })
        .catch(error => {
            console.log(`Error: ${error.status}`);
        });

};

function getVideo(type, id) {
    let youtube = movies.querySelector('.youtube');

    youtube.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=a1d9f1331776385aafc953bd762fce3b&language=en-US`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let videoFrame = '<h4 class="col-12 text-center text-info mt-5 mb-5" >Trailers</h4 >';
            if (data.results.length === 0) {
                videoFrame = '<h4 class="col-12 text-center text-danger mt-5 mb-5"> К сожалению видео отсутствует </h4>'
            }

            data.results.forEach(item => {

                console.log(item.site)
                if (item.site == "YouTube") {

                    videoFrame += `
          <div class="row">
            <div class="col">
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/${item.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>       
                    `
                        ;
                }
            });
            youtube.innerHTML = videoFrame;
        })
        .catch(error => {
            console.log(`Error: ${error.status}`);
        });
}


function cutText(str, num, str2) {
    let words = str.split(' ');
    if (words.length > num) {
        return words.slice(0, num).join(' ') + str2;
    } else {
        return str;
    }
}

export { getTrandingDay };
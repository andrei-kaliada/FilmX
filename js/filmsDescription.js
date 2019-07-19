const movies = document.querySelector('#movies'),
    imagePoster = 'https://image.tmdb.org/t/p/w500';

function showDescription(url) {
    movies.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
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
                    <br>
                    <div class="youtube"></div>
                </div>    
            </div>
            `;
          
           getVideo(this.dataset.type,this.dataset.id);
        })
        .catch(error => {
            console.log(`Error: ${error.status}`);
        });
}

function getVideo(type,id){
    let youtube = movies.querySelector('.youtube');
    youtube.innerHTML = type;
    youtube.innerHTML = id;

}

export { showDescription };
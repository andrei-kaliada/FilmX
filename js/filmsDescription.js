const movies = document.querySelector('#movies'),
    imagePoster = 'https://image.tmdb.org/t/p/w500';

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
                let genres = '';
                data.genres.forEach( item => {genres += item.name + ', ';});
                genres = genres.substr(0, genres.length-2);
                movies.innerHTML = `
           <div class="col-12 text-center text-info titlePosters">
               <h2>${data.name || data.title}</h2>
           </div>
           <div class ="col-12">
               <div class="row">
                   <div class = "col-md-4 col-sm-12x">
                       <img src="${imagePoster + data.poster_path}" alt="${data.name || data.title}">
                       <div class="linksOfficial">
                           ${(data.homepage) ? `<p><a href='${data.homepage}' target="_blank">Official page</a></p>` : ''}
                           ${(data.imdb_id) ? `<p><a href='http://imdb.com/title/${data.imdb_id}' target="_blank">Page IMDB</a></p>` : ''}
                       </div>    
                   </div>
                   <div class = "col-md-8 col-sm-12">
                       <p class="badge badge-danger p-3">Rate: ${data.vote_average}</p>
                       <p class="badge badge-danger p-3">Status: ${data.status}</p>
                       <p class="badge badge-success p-3">Premiere: ${data.first_air_date || data.release_date}</p>
                       ${(data.last_episode_to_air) ? `<p class="badge badge-warning p-3">${data.number_of_seasons} season. ${data.last_episode_to_air.episode_number} episodes released </p>`: ''}
                       ${(genres.length != 0) ? `<p class="badge badge-info p-3">Genre: ${genres}</p>`:''}
                       ${(data.overview.length != 0) ? `<div class="mt-5"><p class="lead">${data.overview}</p></div>` : `<h4 class="col-12 text-center text-danger mt-5"> No movie information available. </h4>`}
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
                    videoFrame = '<h4 class="col-12 text-center text-danger mt-5 mb-5"> No video </h4>';
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



export { showFullInfo, cutText };
const searchForm = document.querySelector('#search-form'),
    btnForm = document.querySelector('.btnForm'),
    movies = document.querySelector('#movies');

function apiSearch(event){
    event.preventDefault();
    const  searchText = document.querySelector('.form-control').value;

    if(searchText.trim().length === 0){
        movies.innerHTML = `<h2 class="col-12 text-center text-danger">Field shoudn't be empty</h2>`;
        return;
    }

    const  server = 'https://api.themoviedb.org/3/search/multi?api_key=a1d9f1331776385aafc953bd762fce3b&language=en-US&query=' + searchText;
    const imagePoster = 'https://image.tmdb.org/t/p/w500';
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
            inner = `<h2 class="col-12 text-center text-danger">No results found for your request</h2>`;
        }
        data.results.forEach(item => {
            let nameFilm = item.name || item.title;
            const poster = item.poster_path ? imagePoster + item.poster_path : '/image/noposter.jpg';
            inner += `
            <div class="col-12 col-md-4 col-xl-3 cardPoster">
                <img src='${poster}' alt='${nameFilm}' class='imagePoster'>
                <h5>${nameFilm}</h5>
            </div>    
            `;
           
        });

        movies.innerHTML = inner;
    })
    .catch( error => {
        console.log(`Error: ${error.status}`);
    });
};

searchForm.addEventListener('submit',apiSearch);




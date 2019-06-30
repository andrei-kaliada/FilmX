const searchForm = document.querySelector('#search-form'),
    btnForm = document.querySelector('.btnForm'),
    movies = document.querySelector('#movies');

function apiSearch(event){
    event.preventDefault();
    const  searchText = document.querySelector('.form-control').value;
    const  server = 'https://api.themoviedb.org/3/search/multi?api_key=a1d9f1331776385aafc953bd762fce3b&language=en-US&query=' + searchText;
    fetch(server)
    .then( response => {
        return response.json();
    })
    .then( data => {
        let dataArr = data.results;

        let inner = "";
        dataArr.forEach(item => {
            let nameItem = item.name || item.title;
            console.log(nameItem); 

            inner += `<div class="col-3"> ${nameItem}" </div>`;
        });
        console.log(dataArr);
        movies.innerHTML = inner;
    })
};

searchForm.addEventListener('submit',apiSearch);

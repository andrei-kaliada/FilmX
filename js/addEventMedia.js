import {showFullInfo} from '/js/filmsDescription.js';

function addEventMedia() {
    const media = movies.querySelectorAll('.cardPoster[data-id]');
    media.forEach(elem => {
        elem.classList.add('cardBorder');
        elem.addEventListener('click', showFullInfo);
    });
};

export { addEventMedia };
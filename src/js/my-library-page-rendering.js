import { watchedMovies, queuedMovies } from './local-storage'; 
import Notiflix from 'notiflix';
import {arrayLengthCheck} from './search-movie-page-rendering'

console.log( watchedMovies)
const movieWrapperEl = document.querySelector('.js-movies-wrapper') 
const myLibraryBtnEl = document.querySelector('.menu__link__library')

// myLibraryBtnEl.addEventListener('click', handleWatchedMoviesClick)
// додати eventListiner до кнопок watched i quered

function handleWatchedMoviesClick () {

    movieWrapperEl.innerHTML = '';

    try {
 if (watchedMovies.length === 0) {
        clearPage()
        return
    }
    
    console.log(watchedMovies)
   return  createLibMarkUp(watchedMovies)
    }
    catch(error) {
        console.error('Set state error: ', error.message);
    }    
}

function handleQueuedMoviesClick () {

    movieWrapperEl.innerHTML = '';

    try {
 if (queuedMovies.length === 0) {
        clearPage()
        return
    }
    createLibMarkUp(queuedMovies)
    }
    catch(error) {
        console.error('Set state error: ', error.message);
    }    
}


function clearPage() {
//   return  markUp = `<p>Sorry, there is no any movie in your library yet</p>
// <svg class="icon icon-images"><use xlink:href="#icon-images"></use></svg> `
  return  Notiflix.Notify.failure('Sorry, there is no any movie in your library yet.')
}

function createLibMarkUp (results) {
    const markUp = results.map(
        (movie) => {
            const date = new Date(`${movie.release_date}`);
            const year = date.getFullYear()

            const genresArray = movie.genres.map((genre) => genre.name
            )
            let genresNames = ''
            if (genresArray.length > 2) {
                
                 genresNames = arrayLengthCheck(genresArray).join(', ') + ", other"
            } else {
                genresNames = genresArray.join(', ')
            }
            console.log(arrayLengthCheck(genresArray));
        return `<ul>
    <li class="card__item">
        <div class="card__img-wrap">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="poster of the movie ${movie.original_title}"
                class="card__img"
            />
        </div>
        <div class="card__text-wrap">
            <h2 class="card__name">${movie.original_title}</h2>
            <div class="card__info">
                <p class="card__genres">${genresNames}</span></p>
                <p class="card__year">${year}</p>
            </div>
        </div>
    </li>
</ul>`
   })
    .join('');

    movieWrapperEl.insertAdjacentHTML('beforeend', markUp);
    return markUp
}


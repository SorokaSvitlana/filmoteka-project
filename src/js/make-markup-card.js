import fetchMoviesByName from "./get-movie-by-name";

export function makeMarkupCard(movies) {
    return movies
        .map(({ id, movieName, title, poster_path, release_date}) => {
            const releaseYear = new Date(release_date);
            const genres = fetchMoviesByName(movieName);
            const slicedGenres = sliceGenres(genres);
            let posterLink = `${urls.imageUrl}${poster_path}`;
            if (poster_path === null) {
            posterLink = `$ якйись імедж`;
        }
        return `
                    <div class="card__img-wrap" data-id=${id}>
                        <img src="${posterLink}" alt="${title}" class="card__img"/>
                    </div>
                    <div class="card__text-wrap">
                        <h2 class="card__name">${title}</h2>
                        <div class="card__info">
                            <p class="card__genres">${slicedGenres.join(', ')}</span></p>
                            <p class="card__year">${releaseYear.getFullYear()}</p>
                        </div>
                    </div>`;
    })
    .join('');
}

function sliceGenres(genres) { 
    
    if (genres.length < 4) {
        
        return genres
    } else {
        return [...genres.slice(0, 2), "Other"];
        
    }
};
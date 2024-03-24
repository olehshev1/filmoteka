export default function getFilmGenresNameArray(movie, dataGenres) {
  return movie.genre_ids
    ?.flatMap(genreId => {
      const genres = dataGenres
        .flatMap(genreEl => genreEl.id === genreId && genreEl.name)
        .filter(genre => genre);
      return genres.length !== 0 && genres;
    })
    .filter(genreName => genreName);
}

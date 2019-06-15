const userMovies = (watchlistMovies, movies) => watchlistMovies.map((watchlistMovie) => {
  const w = watchlistMovie;
  const syncedMovie = movies.find(s => s.id === w.movieId);
  if (syncedMovie) {
    w.title = syncedMovie.title;
    w.imageUrl = syncedMovie.imageUrl;
    w.mpaaRating = syncedMovie.mpaaRating;
  }
  return w;
});

const uniqueMovieView = (allMovies, watchlistMovies) => allMovies.map((movie) => {
  const a = movie;
  const syncedMovie = watchlistMovies.find(w => w.movieId === a.id);
  if (syncedMovie) {
    a.rating = syncedMovie.rating;
    a.onWatchlist = syncedMovie.onWatchlist;
    a.isWatched = syncedMovie.isWatched;
    a.watchlistId = syncedMovie.id;
  }
  return a;
});

export default { userMovies, uniqueMovieView };

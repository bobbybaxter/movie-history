import firebase from 'firebase/app';
import 'firebase/auth';

import watchlistData from '../../helpers/data/watchlistData';
import util from '../../helpers/util';
import allMoviesData from '../../helpers/data/allMoviesData';
import smash from '../../helpers/smash';

const watchlistButtonEvents = (e) => {
  const watchlistBtnBg = e.target.previousElementSibling.previousElementSibling;
  const watchlistId = e.target.closest('span').id;
  let starValue = $(e.target).closest('.movie-card').find('input:checked').val();
  let isWatched;
  if (starValue === undefined) {
    starValue = null;
    isWatched = false;
  } else {
    isWatched = true;
  }
  if (e.target.classList.contains('fa-plus')) {
    e.target.classList.remove('fa-plus');
    e.target.classList.add('fa-check');
    watchlistBtnBg.classList.add('greenBtn');
    const watchlistMovie = {
      movieId: watchlistId.split('.')[1],
      uid: firebase.auth().currentUser.uid,
      rating: starValue,
      onWatchlist: true,
      isWatched,
    };
    watchlistData.addToWatchlist(watchlistMovie);
  } else {
    e.target.classList.add('fa-plus');
    e.target.classList.remove('fa-check');
    watchlistBtnBg.classList.remove('greenBtn');
  }
};

const radioButtonEvent = (e) => {
  const rating = e.target;
  console.error(rating);
};

const eventListeners = () => {
  const watchlistButtons = document.getElementsByClassName('watchlist-button');
  for (let i = 0; i < watchlistButtons.length; i += 1) {
    watchlistButtons[i].addEventListener('click', watchlistButtonEvents);
  }
  const radioButtons = document.getElementsByClassName('ratingButton');
  for (let j = 0; j < radioButtons.length; j += 1) {
    radioButtons[j].addEventListener('click', radioButtonEvent);
  }
};

const printWatchlist = (movies) => {
  let domString = '';
  movies.forEach((movie) => {
    domString += '<div class="card movie-card bg-transparent border-0 p-0 col-3 m-2">';
    domString += '<div class="card-title d-flex p-0 m-0 justify-content-center shadow">';
    domString += `<img src="${movie.imageUrl}" class="card-img-top"/>`;
    domString += `<span id="watchlist.${movie.id}" class="fa-stack topright watchlist-button off-watchlist">`;
    domString += `<i class="fas fa-circle fa-stack-2x fa-inverse ${movie.onWatchlist === true ? 'greenBtn' : ''}"></i>`;
    domString += '<i class="far fa-circle fa-stack-2x"></i>';
    domString += `<i class="fas ${movie.onWatchlist === true ? 'fa-check' : 'fa-plus'} fa-stack-1x"></i>`;
    domString += '</span>';
    domString += '</div>';
    domString += '<div class="card-body d-flex p-1 justify-content-center align-items-end">';
    domString += '<fieldset class="rating">';
    domString += `<input type="radio" id="star5.${movie.id}" name="rating.${movie.id}" value="5" class="ratingButton" ${movie.rating === '5' ? 'checked' : ''} /><label class="full" for="star5.${movie.id}" title="5 stars"></label>`;
    domString += `<input type="radio" id="star4.${movie.id}" name="rating.${movie.id}" value="4" class="ratingButton" ${movie.rating === '4' ? 'checked' : ''} /><label class="full" for="star4.${movie.id}" title="4 stars"></label>`;
    domString += `<input type="radio" id="star3.${movie.id}" name="rating.${movie.id}" value="3" class="ratingButton" ${movie.rating === '3' ? 'checked' : ''} /><label class="full" for="star3.${movie.id}" title="3 stars"></label>`;
    domString += `<input type="radio" id="star2.${movie.id}" name="rating.${movie.id}" value="2" class="ratingButton" ${movie.rating === '2' ? 'checked' : ''} /><label class="full" for="star2.${movie.id}" title="2 stars"></label>`;
    domString += `<input type="radio" id="star1.${movie.id}" name="rating.${movie.id}" value="1" class="ratingButton" ${movie.rating === '1' ? 'checked' : ''} /><label class="full" for="star1.${movie.id}" title="1 star"></label>`;
    domString += '</fieldset>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('watchlist-movies', domString);
  eventListeners();
};

const makeUniqueMovieList = (uid) => {
  allMoviesData.getAllMovies()
    .then((allMovies) => {
      watchlistData.getWatchlistByUid(uid).then((watchlistMovie) => {
        const syncedMovies = smash.uniqueMovieView(allMovies, watchlistMovie);
        const filteredMovies = syncedMovies.filter(movie => movie.onWatchlist === true);
        console.error(filteredMovies);
        printWatchlist(filteredMovies);
      });
    })
    .catch(err => console.error('didnt make unique movie list', err));
};

export default { makeUniqueMovieList };

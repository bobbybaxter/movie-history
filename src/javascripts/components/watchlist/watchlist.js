import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import watchlistData from '../../helpers/data/watchlistData';
import util from '../../helpers/util';
import allMoviesData from '../../helpers/data/allMoviesData';
import smash from '../../helpers/smash';

const setIsWatchedStatus = (s) => {
  let isWatched;
  let starValue = s;
  if (starValue === undefined) {
    starValue = null;
    isWatched = false;
  } else {
    isWatched = true;
  }
  return isWatched;
};

const changeButtonToWatched = (e, watchlistBtnBg) => {
  const buttonSpan = e.target.closest('span');
  buttonSpan.classList.remove('off-watchlist');
  buttonSpan.classList.add('on-watchlist');
  e.target.classList.remove('fa-plus');
  e.target.classList.add('fa-check');
  watchlistBtnBg.classList.add('greenBtn');
  // eslint-disable-next-line no-use-before-define
  makeUniqueMovieList(firebase.auth().currentUser.uid);
};

const changeButtonToUnwatched = (e, watchlistBtnBg) => {
  const buttonSpan = e.target.closest('span');
  buttonSpan.classList.add('off-watchlist');
  buttonSpan.classList.remove('on-watchlist');
  // console.error(buttonSpan.classList);
  e.target.classList.add('fa-plus');
  e.target.classList.remove('fa-check');
  watchlistBtnBg.classList.remove('greenBtn');
  // eslint-disable-next-line no-use-before-define
  makeUniqueMovieList(firebase.auth().currentUser.uid);
};

const watchlistButtonEvents = (e) => {
  const watchlistBtnBg = e.target.previousElementSibling.previousElementSibling;
  const movieId = e.target.closest('span').id;
  const watchlistId = e.target.closest('.movie-card').id;
  const starValue = $(e.target).closest('.movie-card').find('input:checked').val();
  const isWatched = setIsWatchedStatus(starValue);
  if (e.target.classList.contains('fa-plus')) {
    // builds movie object, then adds to or updates watchlist
    console.error(watchlistId);
    const watchlistMovie = {
      movieId: movieId.split('.')[1],
      uid: firebase.auth().currentUser.uid,
      rating: starValue,
      onWatchlist: true,
      isWatched,
    };
    if (watchlistId === 'undefined') {
      // add if not in collection
      watchlistData.addToWatchlist(watchlistMovie)
        .then(changeButtonToWatched(e, watchlistBtnBg));
    } else {
      // update if in collection
      watchlistData.editWatchlist(watchlistId, watchlistMovie)
        .then(changeButtonToWatched(e, watchlistBtnBg));
    }
    // completion.then(changeButtonToWatched(e, watchlistBtnBg));
  } else {
    // builds movie object, then removes from or updates watchlist
    const watchlistMovie = {
      movieId: movieId.split('.')[1],
      uid: firebase.auth().currentUser.uid,
      rating: starValue,
      onWatchlist: false,
      isWatched,
    };
    // let completion;
    if (watchlistId === 'undefined') {
      // delete from collection if movie is not rated
      watchlistData.removeFromWatchlist(watchlistId)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          makeUniqueMovieList(firebase.auth().currentUser.uid);
        })
        .catch(err => console.error('didnt remove from watchlist', err));
    } else {
      // update onWatchlist to false if movie is rated
      watchlistData.editWatchlist(watchlistId, watchlistMovie)
        .then(() => changeButtonToUnwatched(e, watchlistBtnBg));
    }
    // completion.then(changeButtonToUnwatched(e, watchlistBtnBg));
  }
};

const radioButtonEvent = (e) => {
  const movieId = e.target.id.split('.')[1];
  const watchlistBtn = $(e.target).closest('.movie-card').find('span')[0].childNodes[2];
  // const movieId = e.target.closest('watchlist-button').id;
  const starValue = $(e.target).closest('.movie-card').find('input:checked').val();
  const watchlistId = e.target.closest('.movie-card').id;
  const isWatched = setIsWatchedStatus(starValue);
  // const onWatchlist = getWatchlistStatus(e);
  if (watchlistBtn.classList.contains('fa-plus')) {
    const watchlistMovie = {
      movieId,
      uid: firebase.auth().currentUser.uid,
      rating: starValue,
      onWatchlist: false,
      isWatched,
    };
    if (watchlistId === 'undefined') {
      // add if not in collection
      watchlistData.addToWatchlist(watchlistMovie)
        .then(() => {
        // eslint-disable-next-line no-use-before-define
          makeUniqueMovieList(firebase.auth().currentUser.uid);
        });
    } else {
      // update if in collection
      watchlistData.editWatchlist(watchlistId, watchlistMovie)
        .then(() => {
        // eslint-disable-next-line no-use-before-define
          makeUniqueMovieList(firebase.auth().currentUser.uid);
        });
    }
  } else {
    // builds movie object, then removes from or updates watchlist
    const watchlistMovie = {
      movieId,
      uid: firebase.auth().currentUser.uid,
      rating: starValue,
      onWatchlist: true,
      isWatched,
    };
    // let completion;
    if (watchlistId === 'undefined') {
      // delete from collection if movie is not rated
      watchlistData.removeFromWatchlist(watchlistId)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          makeUniqueMovieList(firebase.auth().currentUser.uid);
        })
        .catch(err => console.error('didnt remove from watchlist', err));
    } else {
      // update onWatchlist to false if movie is rated
      watchlistData.editWatchlist(watchlistId, watchlistMovie)
        .then(() => {
        // eslint-disable-next-line no-use-before-define
          makeUniqueMovieList(firebase.auth().currentUser.uid);
        });
    // completion.then(changeButtonToUnwatched(e, watchlistBtnBg));
    }
  }
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
    domString += `<div id="${movie.watchlistId}" class="card movie-card bg-transparent border-0 p-0 col-3 m-2">`;
    domString += '<div class="card-title d-flex p-0 m-0 justify-content-center shadow">';
    domString += `<img src="${movie.imageUrl}" class="card-img-top"/>`;
    domString += `<span id="watchlist.${movie.id}" class="fa-stack topright watchlist-button off-watchlist">`;
    domString += `<i class="fas fa-circle fa-stack-2x fa-inverse ${movie.onWatchlist === true ? 'greenBtn' : ''}"></i>`;
    domString += '<i class="far fa-circle fa-stack-2x"></i>';
    domString += `<i class="fas ${movie.onWatchlist === true ? 'fa-check' : 'fa-plus'} fa-stack-1x"></i>`;
    domString += '</span>';
    domString += '</div>';
    domString += '<div class="card-body d-flex p-0 justify-content-center align-items-end">';
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

// import firebase from 'firebase/app';
// import 'firebase/auth';

import watchlistData from '../../helpers/data/watchlistData';
import util from '../../helpers/util';

const watchlistButtonEvents = (e) => {
  const watchlistBtnBg = e.target.previousElementSibling.previousElementSibling;
  if (e.target.classList.contains('fa-plus')) {
    e.target.classList.remove('fa-plus');
    e.target.classList.add('fa-check');
    watchlistBtnBg.classList.add('greenBtn');
    // watchlist.addToWatchlist(e.target);
  } else {
    e.target.classList.add('fa-plus');
    e.target.classList.remove('fa-check');
    watchlistBtnBg.classList.remove('greenBtn');
  }

  // const watchlistId = e.target.closest('span').id;

  // const userMovie = {
  //   movieId: watchlistId.split('.')[1],
  //   uid: firebase.auth().currentUser.uid,
  //   rating: ,
  //   onWatchList: ,
  //   isWatched: ,
  // };
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

const printWatchlist = (uid) => {
  watchlistData.getWatchlistByUid(uid)
    .then((movies) => {
      let domString = '';
      movies.forEach((movie) => {
        domString += '<div class="card movie-card bg-transparent border-0 p-0 col-3 m-2">';
        domString += '<div class="card-title d-flex p-0 m-0 justify-content-center shadow">';
        domString += `<img src="${movie.imageUrl}" class="card-img-top"/>`;
        domString += `<span id="watchlist.${movie.id}" class="fa-stack topright watchlist-button off-watchlist">`;
        domString += '<i class="fas fa-circle fa-stack-2x fa-inverse"></i>';
        domString += '<i class="far fa-circle fa-stack-2x"></i>';
        domString += '<i class="fas fa-plus fa-stack-1x"></i>';
        domString += '</span>';
        domString += '</div>';
        domString += '<div class="card-body d-flex p-1 justify-content-center align-items-end">';
        domString += '<fieldset class="rating">';
        domString += `<input type="radio" id="star5.${movie.id}" name="rating.${movie.id}" value="5" class="ratingButton" /><label class="full" for="star5.${movie.id}" title="5 stars"></label>`;
        domString += `<input type="radio" id="star4.${movie.id}" name="rating.${movie.id}" value="4" class="ratingButton" /><label class="full" for="star4.${movie.id}" title="4 stars"></label>`;
        domString += `<input type="radio" id="star3.${movie.id}" name="rating.${movie.id}" value="3" class="ratingButton" /><label class="full" for="star3.${movie.id}" title="3 stars"></label>`;
        domString += `<input type="radio" id="star2.${movie.id}" name="rating.${movie.id}" value="2" class="ratingButton" /><label class="full" for="star2.${movie.id}" title="2 stars"></label>`;
        domString += `<input type="radio" id="star1.${movie.id}" name="rating.${movie.id}" value="1" class="ratingButton" /><label class="full" for="star1.${movie.id}" title="1 star"></label>`;
        domString += '</fieldset>';
        domString += '</div>';
        domString += '</div>';
      });
      util.printToDom('watchlist-movies', domString);
      eventListeners();
    })
    .catch(err => console.error('could not print movies', err));
};

export default { printWatchlist };

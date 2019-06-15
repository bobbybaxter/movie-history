import firebase from 'firebase/app';
import 'firebase/auth';

import allMovies from '../allMovies/allMovies';
import watchlist from '../watchlist/watchlist';

const movieFormDiv = document.getElementById('add-movie-form');
const authDiv = document.getElementById('auth');
const moviesDiv = document.getElementById('movies');
const watchlistDiv = document.getElementById('myWatchlist');

const addMovieEvent = () => {
  authDiv.classList.add('hide');
  movieFormDiv.classList.remove('hide');
  moviesDiv.classList.add('hide');
  watchlistDiv.classList.add('hide');
};

const allMoviesEvent = () => {
  authDiv.classList.add('hide');
  movieFormDiv.classList.add('hide');
  moviesDiv.classList.remove('hide');
  watchlistDiv.classList.add('hide');
  allMovies.makeUniqueMovieList(firebase.auth().currentUser.uid);
};

const watchlistEvent = () => {
  authDiv.classList.add('hide');
  movieFormDiv.classList.add('hide');
  moviesDiv.classList.add('hide');
  watchlistDiv.classList.remove('hide');
  watchlist.makeUniqueMovieList(firebase.auth().currentUser.uid);
};

const navbarEvents = () => {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].addEventListener('click', (e) => {
      if (e.target.id === 'navbar-button-logout') {
        firebase.auth().signOut();
      } else if (e.target.id === 'navbar-button-add-movie') {
        addMovieEvent();
      } else if (e.target.id === 'navbar-button-movies') {
        allMoviesEvent();
      } else if (e.target.id === 'navbar-button-watchlist') {
        watchlistEvent();
      }
    });
  }
};

export default { navbarEvents };

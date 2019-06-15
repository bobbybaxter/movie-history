import firebase from 'firebase/app';

import allMovies from '../../components/allMovies/allMovies';

const addMoviesNavbar = document.getElementById('navbar-button-add-movie');
const authNavbar = document.getElementById('navbar-button-auth');
const moviesNavbar = document.getElementById('navbar-button-movies');
const watchlistNavbar = document.getElementById('navbar-button-watchlist');
const authDiv = document.getElementById('auth');
const movieFormDiv = document.getElementById('add-movie-form');
const moviesDiv = document.getElementById('movies');
const logoutNavbar = document.getElementById('navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authNavbar.classList.add('hide');
      addMoviesNavbar.classList.remove('hide');
      logoutNavbar.classList.remove('hide');
      moviesNavbar.classList.remove('hide');
      watchlistNavbar.classList.remove('hide');
      allMovies.makeUniqueMovieList(firebase.auth().currentUser.uid);
      authDiv.classList.add('hide');
      moviesDiv.classList.remove('hide');
    } else {
      addMoviesNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      moviesNavbar.classList.add('hide');
      authDiv.classList.remove('hide');
      movieFormDiv.classList.add('hide');
      moviesDiv.classList.add('hide');
      watchlistNavbar.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };

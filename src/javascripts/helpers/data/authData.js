import firebase from 'firebase/app';

import allMovies from '../../components/allMovies/allMovies';

const authDiv = document.getElementById('auth');
const moviesDiv = document.getElementById('movies');
const movieFormDiv = document.getElementById('add-movie-form');
const moviesNavbar = document.getElementById('navbar-button-movies');
const authNavbar = document.getElementById('navbar-button-auth');
const addMoviesNavbar = document.getElementById('navbar-button-add-movie');
const logoutNavbar = document.getElementById('navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      moviesNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      addMoviesNavbar.classList.remove('hide');
      logoutNavbar.classList.remove('hide');
      authDiv.classList.add('hide');
      moviesDiv.classList.remove('hide');
      allMovies.printAllMovies();
    } else {
      authDiv.classList.remove('hide');
      moviesDiv.classList.add('hide');
      movieFormDiv.classList.add('hide');
      moviesNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      addMoviesNavbar.classList.add('hide');
      logoutNavbar.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };

import firebase from 'firebase/app';

import allMovies from '../../components/allMovies/allMovies';

const authDiv = document.getElementById('auth');
const moviesDiv = document.getElementById('all-movies');
const moviesNavbar = document.getElementById('navbar-button-movies');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      moviesDiv.classList.remove('hide');
      moviesNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      allMovies.printAllMovies();
    } else {
      authDiv.classList.remove('hide');
      moviesDiv.classList.add('hide');
      moviesNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };

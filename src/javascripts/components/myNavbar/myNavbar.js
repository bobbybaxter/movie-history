import firebase from 'firebase/app';
import 'firebase/auth';

import allMovies from '../allMovies/allMovies';

const movieFormDiv = document.getElementById('add-movie-form');
const authDiv = document.getElementById('auth');
const moviesDiv = document.getElementById('movies');

const addMovieEvent = () => {
  movieFormDiv.classList.remove('hide');
  authDiv.classList.add('hide');
  moviesDiv.classList.add('hide');
};

const allMoviesEvent = () => {
  movieFormDiv.classList.add('hide');
  authDiv.classList.add('hide');
  moviesDiv.classList.remove('hide');
  allMovies.printAllMovies();
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
      }
    });
  }
};

export default { navbarEvents };

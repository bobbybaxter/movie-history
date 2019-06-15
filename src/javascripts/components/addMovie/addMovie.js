import firebase from 'firebase/app';
import 'firebase/auth';

import moviesData from '../../helpers/data/addMovieData';
import allMovies from '../allMovies/allMovies';

const titleInput = document.getElementById('title');
const mpaaRatingInput = document.getElementById('mpaaRating');
const imageUrlInput = document.getElementById('imageUrl');

const createNewMovie = (e) => {
  e.preventDefault();
  const newMovie = {
    title: titleInput.value,
    mpaaRating: mpaaRatingInput.value,
    imageUrl: imageUrlInput.value,
  };
  moviesData.addNewMovie(newMovie)
    .then(() => {
      document.getElementById('movies').classList.remove('hide');
      document.getElementById('add-movie-form').classList.add('hide');
      titleInput.value = '';
      mpaaRatingInput.value = '';
      imageUrlInput.value = '';
      allMovies.makeUniqueMovieList(firebase.auth().currentUser.uid);
    })
    .catch(err => console.error('new movie did not add', err));
};

const addMovieButtonEvent = () => {
  document.getElementById('saveNewMovie').addEventListener('click', createNewMovie);
};

export default { addMovieButtonEvent };

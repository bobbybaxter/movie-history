import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMovies = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/movie.json`)
    .then((results) => {
      console.error(results);
      const movieResults = results.data;
      const movies = [];
      Object.keys(movieResults).forEach((movieId) => {
        movieResults[movieId].id = movieId;
        movies.push(movieResults[movieId]);
      });
      resolve(movies);
    })
    .catch(err => reject(err));
});

export default { getAllMovies };

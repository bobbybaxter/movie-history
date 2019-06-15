import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getWatchlistByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/userMovie.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const watchlistResults = results.data;
      const watchlist = [];
      Object.keys(watchlistResults).forEach((watchlistId) => {
        watchlistResults[watchlistId].id = watchlistId;
        watchlist.push(watchlistResults[watchlistId]);
      });
      resolve(watchlist);
    })
    .catch(err => reject(err));
});

const addToWatchlist = movieObject => axios.post(`${firebaseUrl}/userMovie.json`, movieObject);

const editWatchlist = (userMovieId, movieObj) => axios.put(`${firebaseUrl}/userMovie/${userMovieId}.json`, movieObj);

const removeFromWatchlist = userMovieId => axios.delete(`${firebaseUrl}/userMovie/${userMovieId}.json`);

export default {
  getWatchlistByUid, addToWatchlist, removeFromWatchlist, editWatchlist,
};

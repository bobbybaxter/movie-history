/* eslint-disable max-len */
import allMoviesData from '../../helpers/data/allMoviesData';
import util from '../../helpers/util';

const printAllMovies = () => {
  allMoviesData.getAllMovies()
    .then((movies) => {
      let domString = '';
      movies.forEach((movie) => {
        domString += '<div class="card movie-card bg-transparent border-0 p-0 col-3 m-2">';
        domString += '<div class="card-title d-flex p-0 m-0 justify-content-center shadow">';
        domString += `<img src="${movie.imageUrl}" class="card-img-top"/>`;
        domString += '<span class="fa-stack topright">';
        domString += '<i class="fas fa-circle fa-stack-2x fa-inverse"></i>';
        domString += '<i class="far fa-circle fa-stack-2x"></i>';
        domString += '<i class="fas fa-plus fa-stack-1x"></i>';
        domString += '</span>';
        domString += '</div>';
        domString += '<div class="card-body d-flex p-1 justify-content-center align-items-end">';
        domString += '<fieldset class="rating">';
        domString += `<input type="radio" id="star5-${movie.id}" name="rating-${movie.id}" value="5" /><label class="full" for="star5-${movie.id}" title="5 stars"></label>`;
        domString += `<input type="radio" id="star4-${movie.id}" name="rating-${movie.id}" value="4" /><label class="full" for="star4-${movie.id}" title="4 stars"></label>`;
        domString += `<input type="radio" id="star3-${movie.id}" name="rating-${movie.id}" value="3" /><label class="full" for="star3-${movie.id}" title="3 stars"></label>`;
        domString += `<input type="radio" id="star2-${movie.id}" name="rating-${movie.id}" value="2" /><label class="full" for="star2-${movie.id}" title="2 stars"></label>`;
        domString += `<input type="radio" id="star1-${movie.id}" name="rating-${movie.id}" value="1" /><label class="full" for="star1-${movie.id}" title="1 star"></label>`;
        domString += '</fieldset>';
        domString += '</div>';
        domString += '</div>';
      });
      util.printToDom('all-movies', domString);
    })
    .catch(err => console.error('could not print movies', err));
};

export default { printAllMovies };

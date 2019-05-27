import firebase from 'firebase/app';

// import birthday from '../../components/birthday/birthday';

const authDiv = document.getElementById('auth');
const moviesDiv = document.getElementById('movies');
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
      // birthday.printBirthday(user.uid);
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

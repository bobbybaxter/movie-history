# Movie History

## Screenshots
![image of movie history site, all movies page](https://raw.githubusercontent.com/bobbybaxter/movie-history/master/src/images/screenshot1.png)
![image of movie history site, watchlist page](https://raw.githubusercontent.com/bobbybaxter/movie-history/master/src/images/screenshot2.png)

## Installation Instructions
- Clone down this repo
- At the root of the project, run `npm install`
- Create a project in Firebase
- Add a web app to the project and enable Google authentication
- Create a real-time database and seed it with the data from the database directory
- Create a file named `/herlpers/data/apiKeys.json` and add your Firebase keys using the `apiKeys.example.json` as a template

## How to Run
- In your terminal, type `npm start`

***Note**: if you want to make a production build of this project, type `npm run build`.  This will create a folder called build with all the minified code you need.*

## How to deploy
- In your terminal, type `npm run deploy`
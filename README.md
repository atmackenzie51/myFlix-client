# Client-side of myFlix

This project created the client-side of the "myFlix" application by utilizing the server side API created in another project. The client-side was created with React and is a single page application that allows users to sign up or login with a user account, view movies, add/remove favorites to their profile, as well as update user information.


## Table of Contents

- [Link to the App](#link-to-the-application)
- [How to Install & Run](#how-to-install--run)
- [How to Use](#how-to-use)
- [Technologies Used](#technologies-used)

## Link to the Application

Here is a live link to the myFlix application: [https://mymovieflixapp.netlify.app/](https://mymovieflixapp.netlify.app/)

## How to Install & Run

If you want to run locally on your machine, follow the steps below:

1. Download the repository to your local machine
2. In the terminal window, navigate to the location of the saved repository
3. Execute this command: parcel src/index.html
4. Open a browser window and type in "localhost:1234"
5. Utilize the application


## How to Use
1. If you do not have a user account, navigate to the Sign Up page
2. Once signed up, navigate to the login page and use the credentials created
3. A list of 10 movies will populate

From here, you can do the following actions:
- filter movies based on movie title
- update user profile information in the Profile tab
- delete user profile
- favorite or unfavorite movies

Once done with the app, you can logout via the log out button.

## Technologies Used

This application is built with the MERN stack:
- Express
- React
- MongoDB with Mongo Atlas
- node.js

Hosting services used:
- Heroku
- Netlify
- MongoDB Atlas
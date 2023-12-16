import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


export const MovieCard = ({ movie }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [favMovie, setFavMovie] = useState(user ? user.FavoriteMovies : "");

  useEffect(() => {
    console.log(user);
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setFavMovie(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    fetch(
      `https://movieflix-app-d827ee527a6d.herokuapp.com/users/${storedUser.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${storedToken}` }
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("failed to add fav movie");
        }
      })
      .then((response) => {
        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setFavMovie(true);
          console.log("sucessfully added to favs");
          console.log(user.FavoriteMovies);
        }
      })
      .catch((err) => {
        console.log(`error on favmovies: ${err}`);
      });
  };
  return (
    <Card className="h-100 movie-card">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button onClick={addFavoriteMovie}>Add to Fav</Button>
      </Card.Body>
    </Card>
  );
};

//where the props constraints are defined for the moviecard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director:
      PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string
      }).isRequired,
    Genre:
      PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};
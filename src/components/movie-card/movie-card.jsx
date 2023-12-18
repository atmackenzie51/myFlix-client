import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HeartFill } from "react-bootstrap-icons";


export const MovieCard = ({ movie, user, setUser, token }) => {
  const [favMovies, setfavMovies] = useState(user ? user.FavoriteMovies : "");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setfavMovies(user ? user.FavoriteMovies : "");
  }, [user]);

  useEffect(() => {
    if (favMovies && favMovies !== "" && favMovies.includes(movie._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favMovies, movie._id]);

  //adding a movie to favorites
  const addFavoriteMovie = () => {
    fetch(
      `https://movieflix-app-d827ee527a6d.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then(async (response) => {
        console.log(response)
        if (response.ok) {
          const updatedUser = await response.json();
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Added to Favorites");
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully added to Favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //removing a movie from favorites
  const removeFavoriteMovie = () => {
    fetch(
      `https://movieflix-app-d827ee527a6d.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then(async (response) => {
        console.log(response)
        if (response.ok) {
          const updatedUser = await response.json();
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Removed from Favorites");
        } else {
          console.log("Failed to remove fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully removed from Favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };


  return (
    <Card className="h-100 movie-card">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">View Details</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        {!isFavorite ? (
          <Button onClick={addFavoriteMovie}>
            <HeartFill />
          </Button>
        ) : (
          <Button onClick={removeFavoriteMovie}>-</Button>
        )}
      </Card.Footer>
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
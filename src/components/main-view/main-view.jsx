import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      image: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings%2C_TFOTR_%282001%29.jpg",
      genre: "Adventure",
      director: "Peter Jackson"
    },
    {
      id: 2,
      title: "The Lord of the Rings: The Two Towers",
      image:
        "https://upload.wikimedia.org/wikipedia/en/f/fc/The_Lord_of_the_Rings%2C_T2T_%282002%29.jpg",
      genre: "Adventure",
      director: "Peter Jackson"
    },
    {
      id: 3,
      title: "The Lord of the Rings: The Return of the King",
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/23/The_Lord_of_the_Rings%2C_TROTK_%282003%29.jpg",
      genre: "Adventure",
      director: "Peter Jackson"
    }

  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    )
  }

  if (movies.length === 0) {
    return <div> The movie list is empty!</div>
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
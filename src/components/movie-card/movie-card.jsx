import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

//where the props constraints are defined for the moviecard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.arrayOf(
      PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        Birth: PropTypes.instanceOf(Date).isRequired,
        Death: PropTypes.instanceOf(Date)
      })
    ).isRequired,
    Genre: PropTypes.arrayOf(
      PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
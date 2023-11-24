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
  onMovieClick: PropTypes.func.isRequired
};
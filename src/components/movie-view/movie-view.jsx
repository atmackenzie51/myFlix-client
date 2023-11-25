import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className="w-100 movie-card">
      <Card.Img
        variant="top"
        src={movie.ImagePath}
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <Button
          className="button-custom"
          onClick={() => onBackClick(movie)}
        >
          Back to Main Page
        </Button>
      </Card.Body>
    </Card>

    /*<div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span> {movie.Title}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span> {movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span> {movie.Director.Name}</span>
      </div>
      <button onClick={onBackClick}>Back to Main Page</button>
    </div>*/
  )
}
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId)

  return (
    <Col className="d-flex justify-content-center align-items-center">
      <Card className="w-50 movie-card">
        <Card.Img
          variant="top"
          src={movie.ImagePath}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>
          <Card.Text>{movie.Genre.Name}</Card.Text>
          <Link to={"/"}>
            <button className="back-button">Back</button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};
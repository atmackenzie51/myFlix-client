import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId)

  return (
    <div>
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
      <Link to={"/"}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
/*   <Card className="w-100 movie-card">
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
*/
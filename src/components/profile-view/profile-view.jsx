import { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form, CardGroup } from "react-bootstrap";


export const ProfileView = ({ onDeleteAccount }) => {
  //Getting the user and token from the local cache 
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");


  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [username, setUsername] = useState(user ? user.Username : "");
  const [birthday, setBirthday] = useState(user ? user.Birthday : "");
  const [password, setPassword] = useState(user ? user.Password : "");
  const [email, setEmail] = useState(user ? user.Email : "");
  const [favoriteMovieTitles, setFavoriteMovieTitles] = useState([]);

  //let favMovies = user.favoriteMovies ? movies.filter((movie) => user.favoriteMovies.includes(movie._id)) : [];

  //update user profile
  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedData = {
      Username: username,
      Birthday: birthday,
      Email: email,
    };

    fetch(`https://movieflix-app-d827ee527a6d.herokuapp.com/users/${storedUser.Username}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`
      }
    }).then(async (response) => {
      console.log(response)
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Update was successful");
      } else {
        alert("Update failed")
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };


  // delete user profile
  const handleDelete = (event) => {
    event.preventDefault();

    fetch(`https://movieflix-app-d827ee527a6d.herokuapp.com/users/${storedUser.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Your profile has been deleted");
        console.log("The profile has been deleted");
        onDeleteAccount();
      } else {
        alert("Something went wrong.");
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  //converting movieIDs to their title
  useEffect(() => {
    const fetchFavoriteMovieTitles = async () => {
      try {
        const titles = await Promise.all(
          user.FavoriteMovies.map(async (movieTitle) => {
            const response = await fetch(`https://movieflix-app-d827ee527a6d.herokuapp.com/movies/${movieTitle}`, {
              headers: { Authorization: `Bearer ${storedToken}` }
            });
            const movie = await response.json();
            return movie.Title;
          })
        );
        setFavoriteMovieTitles(titles);
      } catch (error) {
        console.error('Error fetching movie titles:', error);
      }
    };

    fetchFavoriteMovieTitles();
  }, [user.FavoriteMovies]);


  return (
    <Container className="justify-content-md-center">
      {/* This displays the current user's profile information */}
      <Row>
        <Col>
          <Card className="profile-page">
            <Card.Body>
              <Card.Title>Profile Information:</Card.Title>
              <Card.Text><span className="bold-text">Username:</span> {storedUser.Username}</Card.Text>
              <Card.Text><span className="bold-text">Email:</span> {storedUser.Email}</Card.Text>
              <Card.Text><span className="bold-text">Birthday:</span> {new Date(storedUser.Birthday).toUTCString().replace('T', ' ').substr(0, 16)}</Card.Text>
              <Card.Text><span className="bold-text">Favorite Movies:</span> {favoriteMovieTitles.join(', ')}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="profile-page">
            <Card.Title>Update Profile</Card.Title>
            <Form onSubmit={handleUpdate}>
              <Form.Group >
                <Form.Label>Update Username:</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  minLength="5"
                  placeholder="min length 5"
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Update Password:</Form.Label>
                <Form.Control
                  className="form-input"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Update Email:</Form.Label>
                <Form.Control
                  className="form-input"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Update Birthday:</Form.Label>
                <Form.Control
                  className="form-input"
                  type="date"
                  onChange={(e) => setBirthday(e.target.value)}
                  placeholder="mm/dd/yyyy"
                />
              </Form.Group>
              <Form.Group>
                <Button className="button-custom" type="submit">
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Card>
          <Card className="profile-page">
            <Card.Body>
              <Card.Title>Delete Profile Here:</Card.Title>
              <Button onClick={handleDelete} className="button-custom" type="submit">
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}

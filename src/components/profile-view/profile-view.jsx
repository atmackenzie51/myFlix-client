import { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form, CardGroup } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = () => {
  //Getting the user and token from the local cache 
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");


  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [username, setUsername] = useState(user.Username);
  const [birthday, setBirthday] = useState(user.Birthday);
  /* const [password, setPassword] = useState(user ? user.Password : "");
   const [email, setEmail] = useState(user ? user.Email : "");
   const [birthday, setBirthday] = useState(user ? user.Birthday : "");
   const [favMovies, setFavMovies] = useState(user ? user.FavoriteMovies : "");*/

  //changes the change to a more readable date format
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  //update user profile information
  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedData = {
      Username: username,
      Birthday: birthday

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

  return (
    <Container>
      {/* This displays the current user's profile information */}
      <Row>
        <Col>
          <Card className="w-50">
            <Card.Body>
              <Card.Title>Profile Information:</Card.Title>
              <Card.Text>Username : {storedUser.Username}</Card.Text>
              <Card.Text>Email : {storedUser.Email}</Card.Text>
              <Card.Text>Birthday: {formatDate(storedUser.Birthday)}</Card.Text>
              <Card.Text>Favorite Movies: {storedUser.favoriteMovies}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Form onSubmit={handleUpdate}>
        <Form.Group >
          <Form.Label>Update Birthday:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="mm/dd/yyyy"
          />
        </Form.Group>
        <Button className="button-custom" type="submit">
          Update
        </Button>
      </Form>

    </Container>
  );
}

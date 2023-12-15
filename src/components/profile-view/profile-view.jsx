import { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form, CardGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const ProfileView = () => {
  //Getting the user and token from the local cache 
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");


  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [username, setUsername] = useState(user ? user.Username : "");
  const [birthday, setBirthday] = useState(user ? user.Birthday : "");
  const [password, setPassword] = useState(user ? user.Password : "");
  const [email, setEmail] = useState(user ? user.Email : "");
  const [favMovies, setFavMovies] = useState(user ? user.FavoriteMovies : "");

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
        window.location.reload();
      } else {
        alert("Update failed")
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };


  // delete user profile
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`https://movieflix-app-d827ee527a6d.herokuapp.com/users/${storedUser.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("Your profile has been deleted");
        navigate("/"); // navigates to the login screen
      } else {
        alert("Something went wrong.");
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };


  return (
    <Container className="justify-content-md-center">
      {/* This displays the current user's profile information */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Profile Information:</Card.Title>
              <Card.Text>Username : {storedUser.Username}</Card.Text>
              <Card.Text>Email : {storedUser.Email}</Card.Text>
              <Card.Text>Birthday: {storedUser.Birthday}</Card.Text>
              <Card.Text>Favorite Movies: {storedUser.favoriteMovies}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
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
              <Button className="button-custom" type="submit">
                Update
              </Button>
            </Form>
            <Form onSubmit={handleDelete}>
              <Form.Label>Delete Profile Here</Form.Label>
              <Button className="button-custom" type="submit">
                Delete
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>


    </Container>
  );
}

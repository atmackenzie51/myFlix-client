import React from "react";
import { useState } from "react";
import { Button, Form, Container, Row, Col, Card, CardGroup } from "react-bootstrap";


export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://movieflix-app-d827ee527a6d.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className="signup-login-page">
              <Card.Title>New User Sign Up</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="signupFormUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                    placeholder="username must be at least 3 characters"
                  />
                </Form.Group>

                <Form.Group controlId="signupFormPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="signupFormEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="email is required"
                  />
                </Form.Group>

                <Form.Group controlId="signupFormBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    placeholder="birthdate is required"
                  />
                </Form.Group>
                <Button className="button-custom" type="submit">
                  Submit
                </Button>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>


  );
};
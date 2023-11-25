import React from "react";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";



export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); //prevents the default behavior of the form which reloads the entire page


    const data = {
      Username: username,
      Password: password
    };

    fetch("https://movieflix-app-d827ee527a6d.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user!");
        }
      })
      .catch((e) => {
        console.error("Error during login:", error);
        alert("Something went wrong!");
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className="signup-login-page">
              <Card.Title>Exisiting Users Login</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="loginFormUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                  />
                </Form.Group>

                <Form.Group controlId="loginFormPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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

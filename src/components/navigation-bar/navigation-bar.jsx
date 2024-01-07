import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const NavigationBar = ({ user, onLoggedOut, searchQuery, setSearchQuery }) => {

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to="/">
            myFlix App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!user && (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign Up
                  </Nav.Link>
                </>
              )}
              {user && (
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile"> Profile </Nav.Link>
                  <Nav.Link onClick={onLoggedOut} className="ms-auto">Logout</Nav.Link>
                  <Form inline >
                    <Col xs="auto">
                      <Form.Control
                        type="text"
                        placeholder="Search Movies Titles"
                        className="ms-md-3 me-3 w-100"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                    </Col>
                  </Form>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
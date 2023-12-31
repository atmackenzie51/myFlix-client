import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    if (!token) {
      return;
    }

    //GET the movies list
    fetch("https://movieflix-app-d827ee527a6d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {
        console.error("Error fetching movies", error);
      });
  }, [token]);

  const clearSession = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  //filter movies by title
  const filterMovies = movies.filter(movie => {
    if (searchQuery) {
      return movie.Title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={clearSession}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterMovies={filterMovies}
      />
      <Row className="justify-content-md-center mt-3">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {user ? (
                  <ProfileView onDeleteAccount={clearSession} />
                ) : (
                  <Navigate to="/signup" replace />
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Col md={6}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token)
                    }
                    } />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    {filterMovies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} user={user} token={token} setUser={setUser} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
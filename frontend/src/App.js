import React, { useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import "./App.css";

function getYouTubeVideoId(url) {
  const match = url.match(/[?&]v=([^?&]+)/);
  return match && match[1];
}

function App() {
  // Ability to get Pokemon & receiving messages //
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemonTeam, setPokemonTeam] = useState([]);
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [addToTeamClicked, setAddToTeamClicked] = useState(false);

  // Connecting the video & its props //
  const videoUrl = "https://www.youtube.com/watch?v=Xbln_WoeMHQ";
  const videoId = getYouTubeVideoId(videoUrl);
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  // Fethcing the Pokemon & reset //
  const fetchPokemon = async () => {
    try {
      console.log("Before axios request");
      setLoading(true);
      setError("");
      setAddToTeamClicked(false);

      const response = await axios.get(
        `http://localhost:8000/pokemon/${pokemonName}`
      );
      console.log("After axios request", response);

      setPokemonData(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setError("Error fetching Pokemon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Ability to add pokemon to a team //
  const addToTeam = () => {
    if (pokemonData) {
      setPokemonTeam([...pokemonTeam, pokemonData]);
      setAddToTeamClicked(true);
    }
  };

  // Logging a user login //
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted:", loginFormData);

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        loginFormData
      );
      console.log("Login response:", response.data);
      // Login message on success //
    } catch (error) {
      console.error("Login error:", error.response.data);
      // Login message on failure //
    }
  };

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
  // Message when a register has been submitted //
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register form submitted:", registerFormData);

    setShowRegistrationMessage(true);
  };

  const handleRegisterChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };
  // Data expected when logging in and registering //
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <div>
      <div className="banner">
        <h1 className="mt-4">Squad Up</h1>
      </div>

      {/* Toggle Video Button */}
      <Container className="mt-4">
        <Row className="pokemon-search justify-content-md-center">
          <Col md={6}>
            <Button variant="primary" onClick={toggleVideo}>
              {showVideo ? "Hide Video" : "Show Video"}
            </Button>
          </Col>
        </Row>
      </Container>

      {/* YouTube Video Embed */}
      {showVideo && videoId && (
        <div id="video-container">
          <YouTube videoId={videoId} opts={{ width: "560", height: "315" }} />
        </div>
      )}

      <Container className="mt-4">
        <Row className="pokemon-search justify-content-md-center">
          <Col md={6}>
            <Form>
              <Form.Group controlId="pokemonName">
                <Form.Control
                  type="text"
                  value={pokemonName}
                  onChange={(e) => setPokemonName(e.target.value)}
                  placeholder="Type Pokemon Name Here"
                />
              </Form.Group>
              {/* Button to Activate Fetch */}
              <Button
                variant="primary"
                onClick={fetchPokemon}
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Fetch Pokemon"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container className="mt-4">
        {loading && (
          <Row className="mt-4">
            <Col>
              <Spinner
                animation="border"
                role="status"
                style={{ color: "black" }}
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        )}

        {error && (
          <Row className="mt-4">
            <Col>
              <Alert variant="danger">{error}</Alert>
            </Col>
          </Row>
        )}

        {/* Pictures for Each Pokemon */}
        {pokemonData && !addToTeamClicked && (
          <Row className="mt-4">
            <Col>
              <div className="white-box">
                <img
                  src={pokemonData.sprites.front_default}
                  alt={pokemonData.name}
                />
                <Button variant="primary" onClick={addToTeam} className="mt-3">
                  Add to Team
                </Button>
              </div>
            </Col>
          </Row>
        )}

        {pokemonTeam.length > 0 && (
          <Row className="mt-4">
            <Col>
              <h3>Your Pokémon Team</h3>
              <ul>
                {pokemonTeam.map((pokemon) => (
                  <li key={pokemon.id}>
                    {pokemon.name} -{" "}
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                    />
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        )}

        {/* New black banner for login and register forms */}
        <div className="login-register-banner">
          {/* Login Form */}
          <Row className="mt-4">
            <Col md={6}>
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group controlId="loginUsername">
                  <Form.Control
                    type="text"
                    name="username"
                    value={loginFormData.username}
                    onChange={handleLoginChange}
                    placeholder="Enter your username"
                  />
                </Form.Group>
                <Form.Group controlId="loginPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Col>

            {/* Register Form */}
            <Col md={6}>
              <Form onSubmit={handleRegisterSubmit}>
                <Form.Group controlId="registerUsername">
                  <Form.Control
                    type="text"
                    name="username"
                    value={registerFormData.username}
                    onChange={handleRegisterChange}
                    placeholder="Enter your username"
                  />
                </Form.Group>
                <Form.Group controlId="registerEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    value={registerFormData.email}
                    onChange={handleRegisterChange}
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group controlId="registerPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    value={registerFormData.password}
                    onChange={handleRegisterChange}
                    placeholder="Enter your password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </div>

        {/* Registration Success Message */}
        <Modal
          show={showRegistrationMessage}
          onHide={() => setShowRegistrationMessage(false)}
          style={{ color: "black" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Registration Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>Thank you for registering! </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => setShowRegistrationMessage(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default App;

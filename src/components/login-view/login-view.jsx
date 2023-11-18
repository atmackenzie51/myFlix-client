import React from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault(); //prevents the default behavior of the form which reloads the entire page


    const data = {
      access: username,
      secret: password
    };

    fetch("https://movieflix-app-d827ee527a6d.herokuapp.com/movies/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user!");
        }
      })
      .catch((e) => {
        alert("Something went wrong!");
      });

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.estItem("token", data.token);
      onLoggedIn(data.user, data.token);
    } else {
      alert("No such user");
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <button type="submit"> Submit </button>
      </form>
    );
  }
};
import React, { useState } from "react";

import "./Login.css";

import axios from "axios";

import { useNavigate }
from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            username,
            password,
          }
        );

      alert(response.data.message);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response.data.message
      );

    }
  };

  return (

    <div className="login-page">

      <div className="login-container">

        <div className="login-left">

          <h1>Smart Home</h1>

          <p>
            Securely access your smart home dashboard.
          </p>

        </div>

        <div className="login-right">

          <div className="login-card">

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

              <div className="input-group">

                <label>Username</label>

                <input
                  type="text"
                  placeholder="Enter username"

                  value={username}

                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                />

              </div>

              <div className="input-group">

                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter password"

                  value={password}

                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

              <button
                type="submit"
                className="login-button"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Login;
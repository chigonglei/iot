import React from "react";
import "./Home.css";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SmartHome</div>
 
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/">Features</a>
          <a href="/">About</a>
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-left">
          <h1>
            Smart Home <span>Automation</span>
          </h1>

          <p>
            Control and monitor your home remotely using
            ESP32, AWS IoT, MQTT and MERN Stack.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Get Started
            </button>

            <button className="secondary-btn">
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-right">

          <div className="glass-card">
            <h3>Temperature</h3>
            <p>28°C</p>
          </div>

          <div className="glass-card">
            <h3>Humidity</h3>
            <p>65%</p>
          </div>

          <div className="glass-card">
            <h3>Motion</h3>
            <p>Detected</p>
          </div>

          <div className="glass-card">
            <h3>Smoke</h3>
            <p>Safe</p>
          </div>

        </div>

      </section>

      {/* Features Section */}
      <section className="features">

        <h2>Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>Remote Control</h3>
            <p>
              Control fan and lights remotely from anywhere.
            </p>
          </div>

          <div className="feature-card">
            <h3>Live Monitoring</h3>
            <p>
              Real-time temperature and humidity monitoring.
            </p>
          </div>

          <div className="feature-card">
            <h3>Smoke Detection</h3>
            <p>
              Instant smoke alerts for better safety.
            </p>
          </div>

          <div className="feature-card">
            <h3>Motion Security</h3>
            <p>
              Detect motion using PIR sensor.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;
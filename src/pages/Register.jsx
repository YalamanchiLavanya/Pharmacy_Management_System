import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const email = user.email
        .trim()
        .toLowerCase();

      const existingUsers = await api.get(
        "/users",
        {
          params: {
            email: email
          }
        }
      );

      if (existingUsers.data.length > 0) {
        alert(
          "This email is already registered. Please login."
        );

        navigate("/login");
        return;
      }

      await api.post("/users", {
        name: user.name,
        email: email,
        password: user.password
      });

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Register for MediCare Pharmacy
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="auth-btn"
          >
            Register
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;
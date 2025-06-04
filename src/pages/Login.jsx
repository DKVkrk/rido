// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import Axios from '../utils/Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post('/api/user/login', {
        email: formData.email,
        password: formData.password
      });

      if (response?.data?.success) {
          const accessToken = response.data.data.accesstoken;
      localStorage.setItem("token", accessToken);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate('/af'); // Change to your actual dashboard path
        }, 2000);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      if (message === "User not register") {
        toast.error("Email is not registered.");
      } else if (message === "Check your password") {
        toast.error("Incorrect password.");
      } else if (message === "Contact to Admin") {
        toast.error("Your account is not active. Please contact admin.");
      } else if (message === "provide email, password") {
        toast.error("Please enter both email and password.");
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-container">
        <h2 className="login-title">Welcome Back!</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-options">
            {/* Changed from <a href=""> to Link for react-router */}
            <Link to="/forgotpassword" className="forgot-password-link">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="signup-link-container">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone_num: '',
    password: '',
    repeatPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';

    if (!isLogin) {
      if (!formData.firstName) formErrors.firstName = 'First name is required';
      if (!formData.lastName) formErrors.lastName = 'Last name is required';
      if (!formData.phone_num) formErrors.phone_num = 'Phone number is required';
      if (formData.password !== formData.repeatPassword) {
        formErrors.repeatPassword = 'Passwords do not match';
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const url = isLogin
        ? 'http://localhost:8080/auth/login'
        : 'http://localhost:8080/auth/register';

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            email: formData.email,
            password: formData.password,
            phone_num: formData.phone_num,
            firstName: formData.firstName,
            lastName: formData.lastName,
          };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          // Display error returned by the server
          setErrors((prevErrors) => ({ ...prevErrors, serverError: data.error }));
        } else {
          // Success
          alert(data.message);

          if (isLogin) {
            // Save user data to localStorage on login
            // Ensure that data.user contains email and phone_num
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/'); // Redirect to home
          } else {
            setIsLogin(true); // Switch to login form after successful registration
          }
        }
      } catch (error) {
        console.error('Network error:', error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          serverError: 'Network error, please try again later.',
        }));
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone_num: '',
      password: '',
      repeatPassword: '',
    });
    setErrors({});
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone_num">Phone Number:</label>
              <input
                type="tel"
                id="phone_num"
                name="phone_num"
                value={formData.phone_num}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              {errors.phone_num && <span className="error">{errors.phone_num}</span>}
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="repeatPassword">Repeat Password:</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder="Repeat Password"
            />
            {errors.repeatPassword && <span className="error">{errors.repeatPassword}</span>}
          </div>
        )}
        <button type="submit" className="submit-button">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      {errors.serverError && <div className="error server-error">{errors.serverError}</div>}
      <button className="toggle-button" onClick={toggleForm}>
        {isLogin ? 'Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

export default Login;

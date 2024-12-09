import React, { useState } from 'react';


function Login() {
 
  const [isLogin, setIsLogin] = useState(true);


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone_num: '',
    password: '',
    repeatPassword: ''
  });
 
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
   
    if (!isLogin) {
      if (!formData.firstName) formErrors.firstName = 'First name is required';
      if (!formData.lastName) formErrors.lastName = 'Last name is required';
      if (!formData.phone_num) formErrors.phone_num = 'Phone number is required'
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
      // Determine the correct endpoint based on isLogin
      const url = isLogin ? '/auth/login' : '/auth/register';
 
      // Prepare the payload for the server
      // For registering, you need email, password, and phone_num (currently not included in your form)
      // You have firstName and lastName as well. You can decide if you want to send them to server or store them somehow.
      // The backend expects phone_num, so for testing, let's just use a dummy phone number.
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            email: formData.email,
            password: formData.password,
            phone_num: formData.phone_num
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
          setErrors(prevErrors => ({ ...prevErrors, serverError: data.error }));
        } else {
          // Success: data.message will have "User registered successfully." or "Logged in successfully."
          console.log(data.message);
          alert(data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
        setErrors(prevErrors => ({ ...prevErrors, serverError: 'Network error, please try again later.' }));
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
      repeatPassword: ''
     
    });
    setErrors({});
  };


  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
            <div>
              <label htmlFor="phone_num">Phone Number:</label>
              <input
                type="text"
                id="phone_num"
                name="phone_num"
                value={formData.phone_num}
                onChange={handleChange}
              />
              {errors.phone_num && <span className="error">{errors.phone_num}</span>}
            </div>
          </>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="repeatPassword">Repeat Password:</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
            />
            {errors.repeatPassword && <span className="error">{errors.repeatPassword}</span>}
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Submit'}</button>
      </form>
      {errors.serverError && <div className="error">{errors.serverError}</div>}
      <button className="toggle-button" onClick={toggleForm}>
        {isLogin ? 'Register' : 'Already have an account?'}
      </button>
    </div>
  );
}


export default Login;






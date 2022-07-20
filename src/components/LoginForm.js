import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login-form.css";

const LoginForm = ({ allUsers, setCurrentUser }) => {
  const initialFormValues = {
    email: "",
    password: ""
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const updatedValues = { ...formValues };
    updatedValues[e.target.id] = e.target.value
    
    setFormValues(updatedValues);
  };

  const handleSubmit = () => {
    // check user credentials in super secure manner
    const matchedCredentials = allUsers.filter(user => {
      return (user.email === formValues.email) && (user.password === formValues.password)
    });

    if (matchedCredentials.length === 1) {
      setCurrentUser(matchedCredentials[0])
      navigate("/", { replace: true });
      setFormValues(initialFormValues);
    } else {
      setError("Login failed");
    }
  }

  return (
    <div className="login-form">
      <h1>Login here:</h1>
      <div className="login-form__element">
        <label htmlFor="email">Email</label>
        <input
          className="login-form__input"
          type="email"
          id="email"
          onChange={handleInputChange} 
          value={formValues.email} 
        />
      </div>
      <div className="login-form__element">
        <label htmlFor="password">Password</label>
        <input
          className="login-form__input"
          type="password"
          id="password"
          onChange={handleInputChange} 
          value={formValues.password} 
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {error && <div className="login-form__error">{error}</div>}
    </div>
  )
}

export default LoginForm
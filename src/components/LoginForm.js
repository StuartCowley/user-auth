import React, {useState} from "react";

import "../styles/login-form.css";

const LoginForm = () => {
  const initialFormValues = {
    email: "",
    password: ""
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const updatedValues = { ...formValues };
    updatedValues[e.target.id] = e.target.value
    
    setFormValues(updatedValues);
  };

  const handleSubmit = () => {
    // TODO implement login
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
    </div>
  )
}

export default LoginForm
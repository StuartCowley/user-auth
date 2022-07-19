import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

import "../styles/signup-form.css";

const SignupForm = ({ allUsers, setAllUsers, setCurrentUser }) => {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const updatedValues = { ...formValues };
    updatedValues[e.target.id] = e.target.value
    setFormValues(updatedValues);
  };

  const handleSubmit = () => {
    setError("");
    if (
      !formValues.firstName ||
      !formValues.lastName ||
      !formValues.email ||
      !formValues.password
    ) {
      setError("All fields not filled out");
      return
    }

    // check user doesnt already exist
    const filtered = allUsers.filter(user => {
      return user.email === formValues.email
    });

    if (filtered.length === 0) {
      setCurrentUser(formValues);
      setAllUsers(prev => [...prev, formValues]);
      navigate("/", { replace: true });
    } else {
      setError("User already exists");
    }
  }

  return (
    <div className="signup-form">
      <h1>Signup here:</h1>
      <div className="signup-form__element">
        <label htmlFor="firstName">First Name</label>
        <input
          className="signup-form__input"
          type="text"
          id="firstName"
          onChange={handleInputChange}
          value={formValues.firstName}
        />
      </div>
      <div className="signup-form__element">
        <label htmlFor="lastName">Last Name</label>
        <input
          className="signup-form__input"
          type="text"
          id="lastName"
          onChange={handleInputChange}
          value={formValues.lastName}
        />
      </div>
      <div className="signup-form__element">
        <label htmlFor="email">Email</label>
        <input
          className="signup-form__input"
          type="email"
          id="email"
          onChange={handleInputChange}
          value={formValues.email}
        />
      </div>
      <div className="signup-form__element">
        <label htmlFor="password">Password</label>
        <input
          className="signup-form__input"
          type="password"
          id="password"
          onChange={handleInputChange}
          value={formValues.password}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {error && <div className="signup-form__error">{error}</div>}
    </div>
  )
}

export default SignupForm;
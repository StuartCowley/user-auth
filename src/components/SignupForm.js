import React, { useState } from 'react'

import '../styles/signup-form.css';

const SignupForm = ({setUser}) => {
  const initialFormValues = {
    firstName: "",
    lastName: "",
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
    setUser(formValues);
  }

  return (
    <div className='signup-form'>
      <h1>Signup here:</h1>
      <div className='signup-form__element'>
        <label htmlFor="firstName">First Name</label>
        <input
          className="signup-form__input"
          type="text"
          id="firstName"
          onChange={handleInputChange} 
          value={formValues.firstName} 
        />
      </div>
      <div className='signup-form__element'>
        <label htmlFor="lastName">Last Name</label>
        <input
          className="signup-form__input"
          type="text"
          id="lastName"
          onChange={handleInputChange} 
          value={formValues.lastName} 
        />
      </div>
      <div className='signup-form__element'>
        <label htmlFor="email">Email</label>
        <input
          className="signup-form__input"
          type="email"
          id="email"
          onChange={handleInputChange} 
          value={formValues.email} 
        />
      </div>
      <div className='signup-form__element'>
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
    </div>
  )
}

export default SignupForm;
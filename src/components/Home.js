import React from 'react';
import SignupForm from './SignupForm';

import "../styles/home.css"

const Home = ({ user, setUser }) => {
  return (
    <div className="home">
      {user.firstName ? (
        <div>Welcome to you, {user.firstName}</div>
      ) : <SignupForm setUser={setUser} />}
    </div>
  )
}

export default Home;
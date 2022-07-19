import React from "react";
import { Link } from "react-router-dom";

import "../styles/home.css"

const Home = ({ currentUser, setCurrentUser }) => {
  const handleClick = () => {
    setCurrentUser(null);
  }

  return (
    <div className="home">
      {null !== currentUser ? (
        <>
          <h2>Welcome to you, <span className="home__username">{currentUser.firstName}</span></h2>
          <button onClick={handleClick}>Sign out</button>
        </>
      ) : (
        <h2>
          You are not logged in, <Link to="login">log in</Link> or <Link to="signup">signup</Link>
        </h2>
      )}
    </div>
  )
}

export default Home;
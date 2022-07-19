import React from "react";
import { Link } from "react-router-dom";

import "../styles/home.css"

const Home = ({ user }) => {
  return (
    <div className="home">
      {user.firstName ? (
        <h2>Welcome to you, <span className="home__username">{user.firstName}</span></h2>
      ) : (
        <h2>
          You are not logged in, <Link to="login">log in</Link> or <Link to="signup">signup</Link>
        </h2>
      )}
    </div>
  )
}

export default Home;
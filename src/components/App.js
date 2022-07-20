import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import "../styles/app.css";
import SignupForm from "./SignupForm";

const App = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="app">
      <Router>
        <nav className="app__navbar">
          <NavLink className="app__nav-item" to="/">Home</NavLink>
          <NavLink className="app__nav-item" to="signup">Signup</NavLink>
          <NavLink className="app__nav-item" to="login">Login</NavLink>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm
                allUsers={allUsers}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupForm
                allUsers={allUsers}
                setAllUsers={setAllUsers}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          />
        </Routes>
      </Router>
    </div>

  );
}

export default App;

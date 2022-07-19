import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import "../styles/app.css";
import SignupForm from "./SignupForm";

const App = () => {
  const [user, setUser] = useState({});

  return (
    <div className="app">
      <Router>
        <nav className="app__navbar">
          <NavLink className="app__nav-item" to="/">Home</NavLink>
          <NavLink className="app__nav-item" to="signup">Signup</NavLink>
          <NavLink className="app__nav-item" to="login">Login</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;

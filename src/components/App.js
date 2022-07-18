import React, { useState } from 'react';
import Home from './Home';
import '../styles/app.css';

const App = () => {
  const [user, setUser] = useState({});

  return (
    <div className="app">
      <Home user={user} setUser={setUser} />
    </div>
  );
}

export default App;

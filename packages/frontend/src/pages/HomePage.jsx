import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <Link to="/login">Ir a Login</Link>
    </div>
  );
}

export default Homepage;

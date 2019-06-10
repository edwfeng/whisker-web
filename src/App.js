import React from 'react';
import logo from './logo.png';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Whisker</h1>
        <p>Whisker is not a revolutionary new social media site, and we are not hoping to change the industry.</p>
        <p>To get started, create an account, and make a post. Links are in the navbar.</p>
      </header>
    </div>
  );
}

export default App;
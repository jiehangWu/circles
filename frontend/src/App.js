import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from "./components/entrance/RegisterForm";
import LoginForm from "./components/entrance/LoginForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <RegisterForm register={(username, password) => {console.log(username + password)}}/>
      <LoginForm login={(username, password) => {console.log(username + password)}}/>
    </div>
  );
}

export default App;

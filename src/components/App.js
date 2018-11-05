import React, { Component } from 'react';
import '../style/App.css';
import Navbar from './navbar';
import Home from './home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;

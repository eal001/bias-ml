import Analysis from "./Analysis.js";
import Header from "./Header.js";
import React from 'react';
import './style.css';

function App() {
  return (
    <div id='app'>
      <Header />
      <div id='sidebar'>
        <h3 className='navbar-list-element'><a href='../public/index.html'>The Tool</a></h3>
        <h3 className='navbar-list-element'><a href='../public/howitworks.html'>How it Works</a></h3>
        <h3 className='navbar-list-element'><a href='../public/mission.html'>Mission Statement</a></h3>
      </div>
      <div id='content'>

        <Analysis />

      </div>
    </div>
  );
}

export default App;
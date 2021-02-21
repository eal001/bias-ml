import Analysis from "./Analysis.js";
import Header from "./Header.js";
import React from 'react';
import './index.css';
import HowItWorks from './HowItWorks';
import Mission from './Mission';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

function App() {
  const navStyle = {
    margin: 0
  };

  return (
    <Router >
      <div id='app'>
        <Header />
        <div id='sidebar'>
          <NavLink className='navbar-list-item' activeClassName='navbar-list-item-active' exact to='/'>BIAS ML</NavLink>
          <NavLink className='navbar-list-item' activeClassName='navbar-list-item-active' exact to='/about'>HOW</NavLink>
          <NavLink className='navbar-list-item' activeClassName='navbar-list-item-active' exact to='/mission'>WHY</NavLink>
        </div>
        <div id='main-container'>
          <Switch>
            <Route path='/mission' exact component={Mission} />
            <Route path='/about' exact component={HowItWorks} />
            <Route path='/' exact component={Analysis} />
          </Switch>
        </div>
        {/* <p id='motto'>EVERYONE DESERVES TO FORM THEIR OWN OPINIONS</p> */}
      </div>
    </Router>
  );
}

export default App;
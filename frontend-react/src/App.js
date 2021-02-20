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
          <NavLink activeClassName='navbar-list-element-active' exact to='/'>
            <h3 className='navbar-list-element' >The Tool</h3>
          </NavLink>
          <NavLink activeClassName='navbar-list-element-active' exact to='/about'>
            <h3 className='navbar-list-element' >How it Works</h3>
          </NavLink>
          <NavLink activeClassName='navbar-list-element-active' exact to='/mission'>
            <h3 className='navbar-list-element' >Mission Statement</h3>
          </NavLink>
        </div>
        <Switch>
          <Route path='/mission' exact component={Mission} />
          <Route path='/about' exact component={HowItWorks} />
          <Route path='/' exact component={Analysis} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
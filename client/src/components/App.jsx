import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom';
import axios from 'axios';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Home from './Home.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import checkForToken from '../utils/checkForToken';

export default (props) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(checkForToken());

  return (
    <Router>
      <div>
        <Switch>
          <Route path='/register' isAuthenticated={isAuthenticated}>
            <Register />
          </Route>
          <Route path='/login' isAuthenticated={isAuthenticated}>
            <Login />
          </Route>
          <PrivateRoute
            path='/'
            Component={Home}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated} >
              <Home />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom';
import axios from 'axios';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Home from './Home.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import checkForToken from '../utils/checkForToken';

export default (props) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(checkForToken());
  const [ currentPage, setCurrentPage ] = useState('');

  return (
    <Router>
      <div>
        <Switch>
          <Route path='/register'>
            <Register isAuthenticated={isAuthenticated} />
          </Route>
          <Route path='/login'>
            <Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route path='/logout'>
            <Logout setIsAuthenticated={setIsAuthenticated} />
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

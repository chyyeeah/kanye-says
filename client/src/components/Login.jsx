import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Banner from './Banner.jsx';
import checkForToken from '../utils/checkForToken';
import deleteCookie from '../utils/deleteCookie';

export default ({ isAuthenticated, setIsAuthenticated }) => {
  const loginHandler = () => {
    axios.post('/jwt', { username: 'wilson'})
      .then(res => {
        console.log(res.data);
        document.cookie = `token=${res.data}`;
        setIsAuthenticated(true);
      });
  };

  const authenticated = isAuthenticated
    ? <Redirect to='/' />
    : (
      <>
        <h1>I is loginz</h1>
        <button onClick={loginHandler}>Login</button>
      </>
    );

  return (
    <div>
      <Banner isAuthenticated={isAuthenticated} />
      {authenticated}
    </div>
  );
};
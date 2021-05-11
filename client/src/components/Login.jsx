import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import checkForToken from '../utils/checkForToken';
import deleteCookie from '../utils/deleteCookie';

export default ({ isAuthenticated }) => {
  const loginHandler = () => {
    axios.post('/jwt', { username: 'wilson'})
      .then(res => {
        document.cookie = `token=${res.data}`;
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
      {authenticated}
    </div>
  );
};
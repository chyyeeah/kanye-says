import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import checkForToken from '../utils/checkForToken';

export default ({ isAuthenticated }) => {
  const authenticated = isAuthenticated
    ? <Redirect to='/' />
    : <h1>I am register!</h1>
    ;

  return (
    <div>
      {authenticated}
    </div>
  );
};
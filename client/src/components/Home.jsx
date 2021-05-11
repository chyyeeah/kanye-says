import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Quote from './Quote.jsx';
import checkForToken from '../utils/checkForToken';

export default ({ isAuthenticated, setIsAuthenticated }) => {
  const authenticated = isAuthenticated
    ? <Quote setIsAuthenticated={setIsAuthenticated} />
    : <Redirect to='/login' />
    ;

  return (
    <div>
      {authenticated}
    </div>
  );
};
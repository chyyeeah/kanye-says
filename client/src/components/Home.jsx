import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Quote from './Quote.jsx';
import Banner from './Banner.jsx';
import checkForToken from '../utils/checkForToken';

export default ({ isAuthenticated, setIsAuthenticated }) => {
  const authenticated = isAuthenticated
    ? <Quote setIsAuthenticated={setIsAuthenticated} />
    : <Redirect to='/login' />
    ;

  return (
    <div>
      <Banner isAuthenticated={isAuthenticated} />
      {authenticated}
    </div>
  );
};
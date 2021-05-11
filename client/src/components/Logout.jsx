import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import deleteCookie from '../utils/deleteCookie';

export default ({ setIsAuthenticated }) => {
  const [ loggedOut, setLoggedOut ] = useState(false);

  useEffect(() => {
    deleteCookie('token');
    setLoggedOut(true);
    setIsAuthenticated(false);
  }, []);

  return (
    <div>
      {
        loggedOut
        ? <Redirect to='/login' />
        : 'Logging out..'
      }
    </div>
  )
};
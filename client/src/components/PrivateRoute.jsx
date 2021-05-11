import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ Component, isAuthenticated, ...rest }) => {
  if (!isAuthenticated) return <Redirect to='/login' />;

  return <Component isAuthenticated={isAuthenticated} {...rest} />;
};
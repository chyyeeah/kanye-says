import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Quote from './Quote.jsx';
import Banner from './Banner.jsx';
import checkForToken from '../utils/checkForToken';
import deleteCookie from '../utils/deleteCookie';

export default ({ isAuthenticated, setIsAuthenticated }) => {
  const [ quote, setQuote ] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('/quote')
      .then(res => {
        setQuote(res.data.quote);
      })
      .catch(err => {
        setIsAuthenticated(false);
        deleteCookie('token');
      });
    }
  }, []);

  const authenticated = isAuthenticated
    ? quote ? <Quote quote={quote} /> : 'loading..'
    : <Redirect to='/login' />
    ;

  return (
    <div>
      <Banner isAuthenticated={isAuthenticated} />
      {authenticated}
    </div>
  );
};
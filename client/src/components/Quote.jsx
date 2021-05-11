import React, { useState, useEffect } from 'react';
import axios from 'axios';
import deleteCookie from '../utils/deleteCookie';

export default ({ setIsAuthenticated }) => {
  const [ quote, setQuote ] = useState('');

  useEffect(() => {
    axios.get('/quote')
      .then(res => {
        setQuote(res.data);
      })
      .catch(err => {
        deleteCookie('token');
        setIsAuthenticated(false);
      });
  }, []);

  return <h1>Quote!</h1>
};
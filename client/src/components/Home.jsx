import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Grid, Paper, Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import confetti from 'canvas-confetti';
import Quote from './Quote.jsx';
import Banner from './Banner.jsx';
import checkForToken from '../utils/checkForToken';
import deleteCookie from '../utils/deleteCookie';

const useStyles = makeStyles({
  titleCenter: {
    textAlign: 'center'
  },
  breathingRoom: {
    marginTop: '10px'
  },
  alignItemsAndJustifyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingRight: '15px',
    paddingLeft: '15px'
  },
});

export default ({ isAuthenticated, setIsAuthenticated }) => {
  const [ quote, setQuote ] = useState('');

  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticated) getNewQuote();
  }, []);

  const getNewQuote = () => {
    axios.get('/quote')
      .then(res => {
        setQuote(res.data.quote);
        confetti({
          particleCount: 100,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2
          }
        });
      })
      .catch(err => {
        setIsAuthenticated(false);
        deleteCookie('token');
      });
  };

  const quoteDisplay = content => (
    <div>
      <div className={classes.titleCenter}>
        <h1>Kanye says..</h1>
      </div>
      <div className={classes.titleCenter}>
        <Button onClick={getNewQuote}><RefreshIcon/></Button>
      </div>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={6}>
          <Paper className={classes.breathingRoom}>
            <Grid container className={classes.alignItemsAndJustifyContent}>
              {content}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  );

  const authenticated = isAuthenticated
    ? quote ? quoteDisplay(<Quote quote={quote} />) : quoteDisplay('loading..')
    : <Redirect to='/login' />
    ;

  return (
    <div>
      <Banner isAuthenticated={isAuthenticated} />
      {authenticated}
    </div>
  );
};
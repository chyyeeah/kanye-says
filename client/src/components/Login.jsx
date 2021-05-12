import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Paper, TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Cookies from 'js-cookie';
import Banner from './Banner.jsx';
import checkForToken from '../utils/checkForToken';
import deleteCookie from '../utils/deleteCookie';

const useStyles = makeStyles({
  titleCenter: {
    textAlign: 'center'
  },
  breathingRoom: {
    marginTop: '20px'
  },
  alignItemsAndJustifyContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingTop: '50px',
    paddingBottom: '50px'
  },
  formElements: {
    display: 'block',
    marginBottom: '15px'
  },
});

export default ({ isAuthenticated, setIsAuthenticated }) => {
  const classes = useStyles();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ hasError, setHasError ] = useState(false);

  const updateInput = e => {
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  const loginHandler = e => {
    e.preventDefault();
    axios.post('/login', { username, password })
      .then(res => {
        document.cookie = `token=${res.data}`;
        setUsername('');
        setPassword('');
        setIsAuthenticated(true);
      })
      .catch(err => {
        setHasError(true);
      });
  };

  const authenticated = isAuthenticated
    ? <Redirect to='/' />
    : (
      <div>
        <div className={classes.titleCenter}><h1>Kanye says "Login now!"</h1></div>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={6}>
            <Paper className={classes.breathingRoom}>
              <Grid container className={classes.alignItemsAndJustifyContent}>
                <form className={classes.form}>
                  <TextField
                    id='standard-basic'
                    className={classes.formElements}
                    label='Username'
                    name='username'
                    value={username}
                    onChange={updateInput} />
                  <TextField
                    id='standard-password-input'
                    className={classes.formElements}
                    type='password'
                    label='Password'
                    name='password'
                    value={password}
                    onChange={updateInput} />
                  <Button
                    className={classes.formElements}
                    type='submit'
                    variant='contained'
                    color='primary'
                    onClick={loginHandler} >
                    Login
                  </Button>
                </form>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
    );

  return (
    <div>
      <Banner isAuthenticated={isAuthenticated} />
      <Snackbar open={hasError} autoHideDuration={6000} onClose={() => setHasError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" severity='error' onClose={() => setHasError(false)}>
          Login Failed!
        </MuiAlert>
      </Snackbar>
      {authenticated}
    </div>
  );
};
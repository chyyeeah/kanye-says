import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Paper, TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Cookies from 'js-cookie';
import Banner from './Banner.jsx';
import checkForToken from '../utils/checkForToken';

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

export default ({ isAuthenticated }) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ registered, setRegistered ] = useState(false);
  const [ hasError, setHasError ] = useState(false);

  const classes = useStyles();

  const updateInput = e => {
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  const registerHandler = e => {
    e.preventDefault();
    axios.post('/register', { username, password })
      .then(res => {
        setUsername('');
        setPassword('');
        if (hasError) setHasError(false);
        setRegistered(true);
      })
      .catch(err => {
        setHasError(true);
      });
  };

  const authenticated = isAuthenticated
    ? <Redirect to='/' />
    : (
      <div>
        <div className={classes.titleCenter}><h1>Kanye says "Register now!"</h1></div>
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
                    onClick={registerHandler} >
                    Register
                  </Button>
                </form>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
    );

  if (registered) return <Redirect to='/login' />;

  return (
    <div>
      <Banner isAuthenticated={isAuthenticated} />
      <Snackbar open={hasError} autoHideDuration={6000} onClose={() => setHasError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" severity='error' onClose={() => setHasError(false)}>
          Registration failed!!!
        </MuiAlert>
      </Snackbar>
      {authenticated}
    </div>
  );
};
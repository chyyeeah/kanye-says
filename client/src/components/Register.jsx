import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Paper, TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import * as yup from 'yup';
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

const schema = yup.object().shape({
  password: yup.string()
    .required('No password provided')
    .min(6, 'Password is too short - should be 6 characters minimum')
    .max(20, 'Password is too long - should be 20 characters maximum'),
  username: yup.string()
    .required('No username provided')
    .min(4, 'Username is too short - should be 4 characters minimum')
    .max(15, 'Username is too long - should be 15 characters maximum'),
});

export default ({ isAuthenticated }) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ registered, setRegistered ] = useState(false);
  const [ hasError, setHasError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  const classes = useStyles();

  const updateInput = e => {
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  const registerHandler = e => {
    e.preventDefault();
    schema.validate({ username, password })
      .then(() => {
        axios.post('/register', { username, password })
          .then(res => {
            setUsername('');
            setPassword('');
            if (hasError) {
              setHasError(false);
              setErrorMessage('');
            }
            setRegistered(true);
          })
          .catch(err => {
            console.error(err);
            setHasError(true);
            setErrorMessage('User already exists!');
          });
      })
      .catch(err => {
        console.error(err);
        setHasError(true);
        setErrorMessage(err.errors.join('\n'));
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
          {errorMessage}
        </MuiAlert>
      </Snackbar>
      {authenticated}
    </div>
  );
};
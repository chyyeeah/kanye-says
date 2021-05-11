import React, { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom'
import {
  AppBar, Toolbar, IconButton, MenuIcon, Typography,
  Button, Menu, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default ({ isAuthenticated }) => {
  const classes = useStyles();
  const location = useLocation();

  let loginOrRegister;

  if (!isAuthenticated && location.pathname === '/login') {
    loginOrRegister = <Button color="inherit" component={RouterLink} to='/register'>Register</Button>;
  } else if (!isAuthenticated && location.pathname === '/register') {
    loginOrRegister = <Button color="inherit" component={RouterLink} to='/login'>Login</Button>;
  } else {
    loginOrRegister = <Button color="inherit" component={RouterLink} to='/logout'>Logout</Button>;;
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <img src='/img/icon.png' />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              kanye says
            </Typography>
            {loginOrRegister}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};
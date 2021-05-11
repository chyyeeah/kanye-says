require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.resolve('client/dist')));

const generateAccessToken = data => jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '432000s' });
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token === null || token === undefined) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, username) => {
    if (err) {
      console.log('err', err);
      return res.sendStatus(403);
    };
    req.username = username;
    console.log(req.username);
    next();
  })
};

app.post('/jwt', (req, res) => {
  const token = generateAccessToken({ username: req.username });
  res.send(token);
});

app.get('/test', authenticateToken, (req, res) => {
  console.log(req.cookies);
  res.send('hello');
});

app.get('/quote', authenticateToken, async (req, res) => {
  try {
    const kayneResponse = await axios.get('https://api.kanye.rest/');
    const quote = kayneResponse.data;
    res.send(quote);
  } catch (err) {
    console.log('error', err);
    res.status(500).send(err);
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('client/dist/index.html'), (err) => {
    if (err) res.status(500).send(err);
  })
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const { checkIfUserExists, createUser, getUserData } = require('./model/index.js');
const { generateAccessToken, authenticateToken } = require('./utils/jwtHelpers.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('client/dist')));

app.post('/register', async (req, res) => {
  try {
    if (await checkIfUserExists(req.body.username)) {
      res.sendStatus(409);
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await createUser(req.body.username, hashedPassword);
      res.sendStatus(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post('/login', async (req, res) => {
  try {
    const queryResult = await getUserData(req.body.username);
    const userData = queryResult[0];
    if (!userData) return res.status(401).send('Username does not exist.');

    if (await bcrypt.compare(req.body.password, userData.password)) {
      const token = generateAccessToken({ username: req.body.username });
      res.send(token);
    } else {
      res.status(401).send('Invalid password');
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/quote', authenticateToken, async (req, res) => {
  try {
    const kayneResponse = await axios.get('https://api.kanye.rest/');
    const quote = kayneResponse.data;
    res.send(quote);
  } catch (err) {
    console.error('error', err);
    res.status(500).send(err);
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('client/dist/index.html'), (err) => {
    if (err) res.status(500).send(err);
  })
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
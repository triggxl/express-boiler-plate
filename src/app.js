require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config')

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());

// adding basic endpoint to our app.js
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// hiding error messages from users and other malicious parties
app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    esponse = { message: error.message, error }
  }
  res.status(500).json(response)
})
app.use(cors());

module.exports = app;

// exporting app for integration testing
// initialized the dotenv as well as added the basic middleware 
// Morgan is set to be less verbose when in production
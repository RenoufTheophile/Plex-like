require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sClick = require('./models/click');
const axios= require('axios');
const URL= require('./models/const');
const API_KEY=require('./models/const');

const fs= require('fs');
var files = fs.readdirSync('/home/renouf/Desktop/Plex-like/back-end/Media');

// export one function that gets called once as the server is being initialized
module.exports = function(app, server) {

  const mongoose = require('mongoose');
  mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log(files))
    .catch(() => console.log( files));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  });

app.use(express.json());

const io = require('socket.io')(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
})

require('./socket/socket')(io);

app.use(function(req, res, next) {req.io = io; next(); });

app.get('/stats/all', (req, res, next) => {
  sClick.find()
    .then(clicks => res.status(200).json(file))
    .catch(error => res.status(400).json({ error }));
  });
}

axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5cea41d5bcdd7e8c901b079bb98f5dea&language=fr&query='de'`, )
  .then(response => {
          console.log(response.data);
  })
  .catch(error => console.error('On get student error', error))
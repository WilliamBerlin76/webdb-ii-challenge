const express = require('express');

const carsRouter = require('./data/carsRoute');

const server = express();

server.get('/', (req, res) => {
    res.send(`<h2>Check out these Cars!!!!</h2>`)
})

server.use(express.json());

server.use('/api/cars', carsRouter);
module.exports = server
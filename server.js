const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const carsRouter = require('./data/carsRoute');

const server = express();

server.get('/', (req, res) => {
    res.send(`<h2>Check out these Cars!!!!</h2>`)
})

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/cars', carsRouter);
module.exports = server
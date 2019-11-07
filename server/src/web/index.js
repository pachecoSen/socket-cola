"use strict";

const app = require('express')(),
    { createServer } = require('http'),
    cors = require('cors'),
    helmet = require('helmet'),
    {resolve} = require('path'),
    morgan = require('morgan');

app.disable('x-powered-by');
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
});
app.use(helmet());
app.use(morgan('dev'));

require(resolve(__dirname, './load'))(app);

module.exports = createServer(app);
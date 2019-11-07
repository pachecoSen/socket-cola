"use strict";

const { createLogger, format, transports } = require('winston');

module.exports = (filename, maxsize = 5242880, maxFiles = 10) => createLogger({
    format: format.combine(format.simple()),
    transports:[ new transports.File({ maxsize, maxFiles, filename }) ]
});
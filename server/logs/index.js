"use strict";

const {resolve} = require('path'),
    fileLogs = require('file_logs');

module.exports = (ele, err) => {
    const {error} = fileLogs(resolve(__dirname, `./ERR.${ele}.log`));
    const date = new Date();
    error(`${date} ::::: ${err}`);
}
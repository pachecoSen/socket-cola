"use strict";

const {resolve} = require('path')

const fileLogs = require(resolve(__dirname, './fileLogs'));

module.exports = (ele, err) => {
    const {error} = fileLogs(resolve(__dirname, `./ERR.${ele}.log`));
    const date = new Date();
    error(`${date} ::::: ${err}`);
}
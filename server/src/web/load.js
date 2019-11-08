"use strict";

const express = require('express'),
    {resolve} = require('path'),
    {green:success, red:error, yellow} = require( 'terminal-kit' ).terminal;

const path = require(resolve(__dirname, './../../config/path'));

const logs = require(path('logs'));

module.exports = app => {
    app.use(express.static(path('public')));
    yellow('\n\n---------- Starting components ----------\n');
    ['middlewares', 'routes'].forEach(e => {
        try {
            require(`./${e}`)(app);
            success(`Component '${e}' loaded successfully\n`);
        } catch (err) {
            logs('path', err);
            error(`Component '${e}' not loaded\n`);
        }
    });
    yellow('---------- Finished work ----------\n\n');
}
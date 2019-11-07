"use strict";

const express = require('express'),
    { resolve } = require('path'),
    {green:success, red:error, yellow} = require( 'terminal-kit' ).terminal;

const publicPatch = resolve(__dirname, '../../../public');

module.exports = app => {
    app.use(express.static(publicPatch));

    yellow('\n\n---------- Starting components ----------\n');
    ['routes'].forEach(e => {
        try {
            require(`./${ e }`)(app);
            success(`Component '${ e }' loaded successfully\n`);
        } catch (err) {
            error(`Component '${ e }' not loaded\n`);
        }
    });
    yellow('---------- Finished work ----------\n\n');
}
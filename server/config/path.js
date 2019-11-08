"use strict";

const {resolve} = require('path');

const coleccionPath = {
    'config' : resolve(__dirname, './'),
    'server' : resolve(__dirname, './../src/web'),
    'socket' : resolve(__dirname, './../src/socket'),
    'public' : resolve(__dirname,'./../../public'),
    'logs' : resolve(__dirname, './../logs'),
    'clases' : resolve(__dirname,'./../src/classes'),
    'js' : resolve(__dirname, './../../public/javascript'),
    'css' : resolve(__dirname, './../../public/css'),
    'less' : resolve(__dirname, './../../public/less'),
}

module.exports = path => {
    return coleccionPath[path];
}
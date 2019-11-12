"use strict";

const {resolve} = require('path'),
    {existsSync} = require('fs');

const path = require(resolve(__dirname, './../../../config/path'));

const Less = require(resolve(path('clases'), './less'));

const less = new Less();

module.exports = app => {
    app.use('/get/css/:file', (req, res, next) => {
        const {file} = req.params;
        const pathCSS = resolve(path('css'), `./${file}.css`);
        if(true === pathCSS)
            return next();

        const pathLess = resolve(path('less'), `./${file}.less`);
        if(false === existsSync(pathLess))
            return  res.status(404).json({
                'err' : `File ${file} not exists`
            });

        less.setInput(pathLess).setCompress(true).setOutput(resolve(path('css'), `./${file}.min.css`)).make(ruta => true == existsSync(ruta) ? next() : res.status(500).send('Error de sistema'));
    });
}
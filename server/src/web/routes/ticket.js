"use strict";

const {resolve} = require('path');

const path = require(resolve(__dirname,'./../../../config/path'));

const ControlTicket = require(resolve(path('clases'), 'ticket'));
const controlTicket = new ControlTicket();

module.exports = app => {
    app.get('/ticket/latest', (req, res) => {
        const result = {
            'estatus' : true,
            'msg' : {
                'latest' : controlTicket.ultimoTicket()
            }
        }
        
        return res.status(200).json(result);
    });
}
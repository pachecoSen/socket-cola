"use strict";

const {resolve} = require('path');

const SqLite = require(resolve(__dirname, '../db/sqlite'));
const conn = new SqLite();

class Ticket{
    constructor() {
        try {
            conn.setPath(resolve(__dirname, '../db/ticket.db')).open().select('select * from oldTicket');   
        } catch (error) {
            this.ultimo = 0;
            this.hoy = new Date().getDate();   
        }
    }
}

module.exports = Ticket;
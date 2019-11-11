"use strict";

const {resolve} = require('path'),
    {writeFileSync} = require('fs'),
    {blue:info} = require( 'terminal-kit' ).terminal;

const path = require(resolve(__dirname, './../../config/path'));

const fileData = resolve(path('logs'), 'SAVE.ticket.json');

const date = new Date();

const data = require(fileData);

class Ticket{
    constructor(int_numero, int_escritorio) {
        this.numero = int_numero;
        this.escritorio = int_escritorio;
    }
}


class ControlTicket{
    constructor() {
        this.ultimo = 0;
        this.hoy = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
        this.tickets = [];
        
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;

            return false;
        }
        
        this.reset();
    }

    ultimoTicket(){
        return this.ultimo;
    }

    siguiente(){
        this.ultimo += 1;
        this.tickets.push(new Ticket(this.ultimo, null));
        this.save();

        return this.ultimo;
    }

    reset(){
        this.ultimo = 0;
        this.tickets = [];
        this.save();
        info('\nticket >>> Se reinicio sistema\n')
    }

    save(){
        writeFileSync(fileData, JSON.stringify({'hoy' : this.hoy, 'ultimo' : this.ultimo, 'cola' : this.tickets}));
        info('\nticket >>> Datos guardados\n')
    }
}

module.exports = ControlTicket;
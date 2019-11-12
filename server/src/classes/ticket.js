"use strict";

const {resolve} = require('path'),
    {writeFileSync} = require('fs'),
    {blue:info} = require( 'terminal-kit' ).terminal;

const path = require(resolve(__dirname, './../../config/path'));

const fileData = resolve(path('logs'), 'SAVE.ticket.json');

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
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.oldFour = [];
        
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.oldFour = data.oldFour;

            return false;
        }
        
        this.reset();
    }

    ultimoTicket(){
        return this.ultimo;
    }

    ultimosFour(){
        return this.oldFour;
    }

    siguiente(){
        this.ultimo += 1;
        this.tickets.push(new Ticket(this.ultimo, null));
        this.save();

        return this.ultimo;
    }

    atender(escritorio){
        if(this.tickets.length === 0)
            return false;

        const refTicket = this.tickets[0].numero;
        this.tickets.shift();
        const xAtender = new Ticket(refTicket, escritorio);
        this.oldFour.unshift(xAtender);
        if(4 < this.oldFour.length)
            this.oldFour.splice(-1, 1);

        this.save();

        return xAtender;
    }

    reset(){
        this.ultimo = 0;
        this.tickets = [];
        this.oldFour = [];
        this.save();
        info('\nticket >>> Se reinicio sistema\n')
    }

    save(){
        writeFileSync(fileData, JSON.stringify({'hoy' : this.hoy, 'ultimo' : this.ultimo, 'tickets' : this.tickets, 'oldFour' : this.oldFour}));
        info('\nticket >>> Datos guardados\n')
    }
}

module.exports = ControlTicket;
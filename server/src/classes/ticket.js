"use strict";

const {resolve} = require('path'),
    {writeFileSync} = require('fs'),
    {blue:info} = require( 'terminal-kit' ).terminal;

const path = require(resolve(__dirname, './../../config/path'));

const fileData = resolve(path('logs'), 'SAVE.ticket.json');

const date = new Date();

const data = require(fileData);


class Ticket{
    constructor() {
        this.ultimo = 0;
        this.hoy = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
        
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;

            return false;
        }
        
        this.reset();
    }

    siguiente(){
        this.ultimo += 1;
        this.save();

        return this.ultimo;
    }

    reset(){
        this.ultimo = 0;
        this.save();
        info('\nticket >>> Se reinicio sistema\n')
    }

    save(){
        writeFileSync(fileData, JSON.stringify({'hoy' : this.hoy, 'ultimo' : this.ultimo}));
        info('\nticket >>> Datos guardados\n')
    }
}

module.exports = Ticket;
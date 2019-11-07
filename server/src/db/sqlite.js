"use strict";

const sqlite3 = require('sqlite3').verbose(),
    {green:success, red:error} = require( 'terminal-kit' ).terminal,
    {resolve} = require('path'),
    isEmpty = require('is-empty');

const logs = require(resolve(__dirname, '../../logs'));

class SqLite{
    constructor() {
        this.db = false;
        this.path = '';
    }

    set Path(srt_path){
        this.path = srt_path;
    }

    setPath(srt_path){
        this.path = srt_path;

        return this;
    }

    open(){
        const env = isEmpty(this.path) ? ':memory:' : this.path;
        this.db = new sqlite3.Database(env, err => {
            if(err){
                logs('sqlite', err.message);
                error('Sqlite >>> Error al iniciar base de datos\n');
        
                return false;
            }
        
            success('Sqlite >>> Base de datos iniciada\n');
        });

        return this;
    }

    close(){
        this.db.close(err => {
            if(err){
                logs('sqlite', err.message);
                error('Sqlite >>> Error al cerrar base de datos\n');
        
                return false;
            }

            success('Sqlite >>> Base de datos cerrada\n');
        });

        return this;
    }

    select(srt_sql){
        this.db.serialize(() => {
            return new Promise((res, rej) => {
                this.db.each(srt_sql, (err, row) => {
                    this.close();
                    if(err){
                        rej(err.message);
                        logs('sqlite', err.message);
                        error('Sqlite >>> Error al consultar base de datos\n');
                
                        return false;
                    }
                    
                    res(row);
                    success('Sqlite >>> Base de datos consultada correctamente\n');
                });
            });
        });
    }

}

module.exports = SqLite;
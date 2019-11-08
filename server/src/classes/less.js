"use strict";

const {readFileSync, writeFileSync} = require('fs'),
    less = require('less'),
    isEmpty = require('is-empty'),
    {dirname, basename} = require('path');

class Less {
    constructor() {
        this.input = '';
        this.output = null;
        this.compress = false;
        this.error = this.errorLog;
    }

    set Input(path_in){
        this.input = path_in;
    }

    set Output(path_out){
        this.output = path_out;
    }

    set Compress(bool_est){
        this.compress = bool_est;
    }

    set Error(fun_err){
        this.error = fun_err;
    }

    setInput(path_in){
        this.input = path_in;

        return this;
    }

    setOutput(path_out){
        this.output = path_out;

        return this;
    }

    setCompress(bool_est){
        this.compress = bool_est;

        return this;
    }

    setError(fun_err){
        this.error = fun_err;

        return this;
    }

    errorLog(err){
        console.log(err);
    }

    clean(){
        this.input = '';
        this.output = null;
        this.compress = false;
        this.error = this.errorLog;
    }

    make(callbackOK, callbackFall = null){
        try {
            const {compress, output, input, error} = this;
            const path_out = isEmpty(output) ? `${dirname(input)}/${basename(input)}.css` : output;
            const str_input = readFileSync(input).toString();
            
            callbackFall = isEmpty(callbackFall) ? error : callbackFall;
            less.render(str_input, {compress})
            .then(result => result.css)
            .then(css => {
                writeFileSync(path_out, css);
                
                return path_out;
            })
            .then(callbackOK)
            .catch(callbackFall);   
        } catch (err) {
            this.errorLog(err);
        } finally{
            this.clean();
        }
    }
}

module.exports = Less;
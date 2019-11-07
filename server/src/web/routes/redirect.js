"use strict";

module.exports = app => {
    app.get('/get/socket', (req, res) => res.status(301).redirect('/socket.io/socket.io.js'));
    app.get('/get/js/:file', (req, res) => res.status(301).redirect(`/javascript/${ req.params.file}.js`));
}
"use strict";

module.exports = app => {
    app.use((req, res) => res.status(404).redirect('./404.html'));
}
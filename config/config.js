const express = require('express');
const session = require('express-session');
const rootRouter = require('../routes/rootroute');

const config = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', './mvc/views');
    app.use(session({
        secret: 'c23thC',
        resave: false,
        saveUnitialized: false
    }));
    app.use(express.static('./public'));
    app.use(express.urlencoded({extended:true}));
    app.use('/', rootRouter);
};

module.exports = config;
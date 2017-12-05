const URL= "http://localhost:3002/";
const PORT = 3000;

// *** main dependencies *** //
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');

// *** routes *** //
var routes = require('./routes/index.js');

// *** express instance *** //
var app = express();

// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

app.set("view engine", "ejs");

// Tells Express that the views are in the views folder;
app.set("views", path.resolve(__dirname, "./views"));

// *** main routes *** //
app.use('/', routes);

// Renders a 404 page because you’re requesting an unknown source
app.use(function(request, response) {
    response.status(404).render("404");
});

// *** server config *** //
var server   = http.createServer(app);
server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});

module.exports = app;

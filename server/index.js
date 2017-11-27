var express = require("express");


// Makes an Express app
var app = express();

var data= require('./sports-data.js');
app.locals.data = data;
app.get('/', (req, res) => res.json(app.locals.data));


app.listen(3002, () => console.log('Example app listening on port 3002!'));

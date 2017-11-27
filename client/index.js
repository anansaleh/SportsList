
const URL= "http://localhost:3002/";
const PORT = 3000;

//Requires all of the modules that needed
var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var request = require('request');



// Makes an Express app
var app = express();

// Tells Express that the views are in the views folder;
app.set("views", path.resolve(__dirname, "views"));

// The views will use the EJS engine.
app.set("view engine", "ejs");

// Populates a variable called req.body
// if the user is submitting a form. (The extended option is required.)
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')))

//Uses Morgan to log every request
app.use(logger("dev"));


////////////////////////////////////////////////
// Creates a global array to store all our entries
var entries = [];
var data = [];

// Makes this entries array available in all views
app.locals.entries = entries;
app.locals.data = data;

request({
    url: URL,
    method: "GET",
    headers: {
        "content-type": "application/json",
        },
    json: {
              "request": "get_sports"
          }
    //  body: JSON.stringify(requestData)
    }, function (error, resp, body) {
        if (!error && resp.statusCode === 200) {
            //console.log(body);
            app.locals.data= body.sports;
        }
        else {
            app.use(function(request, response) {
                response.send(
                    "<p>response.statusCode: " + resp.statusCode + "</p>"
                    + "<p> response.statusText: " + resp.statusText + "</p>"
                    + "<p>error: " + error  + "</p>");
            });
        }
    });


////////////////////////////////////////////////
// redirect to /sports
app.get("/", function(request, response) {
    response.redirect('/sports');
});


//Sport List
//Routes
//GET Routes
// Renders the GET “sports” page (at views/index.ejs) when GETting the URL

app.get("/sports", function(request, response) {
    app.locals.data= app.locals.data.sort(function(elem1, elem2){
        if(elem1.pos < elem2.pos) return -1;
        if(elem1.pos > elem2.pos) return 1;
        return 0;
    })
    response.render("sports_list");
});

/********************/
//Sport:id - Event List
// sports/:id
// Renders the GET “sports/:id” page (at views/index.ejs) when GETting the URL
//app.get("/sports/:id", function(request, response) {
app.get(/^\/sports\/(\d+)$/, function(request, response) {
    if (!request.params[0] || !parseInt(request.params[0], 10)) {
        response.status(400).send("Entries must have a title and a body.");
        return;
    }
    let game = app.locals.data.find((gameElem) => {
      return gameElem.id == request.params[0];
    });
    game.events = game.events.sort(function(elem1, elem2){
        if(elem1.pos < elem2.pos) return -1;
        if(elem1.pos > elem2.pos) return 1;
        return 0;
    });
    app.locals.entries.game= game;
    response.render("sport");
});

//Event
// Renders the GET “sports/:id” page (at views/index.ejs) when GETting the URL
app.get("/sports/:id/event/:event", function(request, response) {
    let game = app.locals.data.find((gameElem) => {
      return gameElem.id == request.params.id;
    });
    let event = game.events.find((eventElem) => {
      return eventElem.id == request.params.event;
    });
    app.locals.entries.game_id= request.params.id;
    app.locals.entries.event_id= request.params.event;
    app.locals.entries.event= event;
    response.render("event");
});
//=============================================
//JSON Routes response json
//=============================================
//Sport list
// Renders the POST “sports” page (at views/index.ejs) when GETting the URL
app.get("/json/sports", function(request, response) {
    app.locals.data= app.locals.data.sort(function(elem1, elem2){
        if(elem1.pos < elem2.pos) return -1;
        if(elem1.pos > elem2.pos) return 1;
        return 0;
    })
    response.json(app.locals.data);
});

app.get(/^\/json\/sports\/(\d+)$/, function(request, response) {
    if (!request.params[0] || !parseInt(request.params[0], 10)) {
        response.status(400).send("Entries must have a title and a body.");
        return;
    }
    let game = app.locals.data.find((gameElem) => {
      return gameElem.id == request.params[0];
    });
    game.events = game.events.sort(function(elem1, elem2){
        if(elem1.pos < elem2.pos) return -1;
        if(elem1.pos > elem2.pos) return 1;
        return 0;
    });
    //game.events =events;
    response.json(game);
});


//Event list
app.get("/json/sports/:id/event/:event", function(request, response) {
    let game = app.locals.data.find((gameElem) => {
      return gameElem.id == request.params.id;
    });
    let event = game.events.find((eventElem) => {
      return eventElem.id == request.params.event;
    });
    event.game_id=request.params.id
    response.json(event);
});

///////////////////////////////////////////////

// Renders a 404 page because you’re requesting an unknown source
app.use(function(request, response) {
    response.status(404).render("404");
});
// Starts the server on port 3000!
http.createServer(app).listen(PORT, function() {
    console.log("Sports app started on port 3000.");
});
module.exports = app;

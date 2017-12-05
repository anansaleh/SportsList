const URL= "http://localhost:3002/";
const PORT = 3000;

var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');


var entries = [];
var data = [];

router.get('/', function(req, res, next) {
  res.send('Hello, World!');
});

// *** api routes *** //
router.get('/sports', getAllSports);
router.get('/sports/:id', getSportById);
router.get('/sports/:id/event/:event', getEvent);

router.get('/json/sports', jsonGetAllSports);
router.get('/json/sports/:id', jsonGetSportById);
router.get('/json/sports/:id/event/:event', jsonGetEvent);

////////////////////////////////////////////////
// Creates a global array to store all our entries
var app = express();
// The views will use the EJS engine.
//app.set("view engine", "ejs");


var entries = [];
var data = [];
app.locals.entries = entries;
app.locals.data = data;

request({
    url: URL,
    method: "GET",
    headers: {
        "content-type": "application/json",
        },
    json: { }
    //  body: JSON.stringify(requestData)
    }, function (error, resp, body) {
        if (!error && resp.statusCode === 200) {
            //console.log(body);
            data= body.sports;
        }
        else {
            app.use(function(request, response) {

                response.send(
                    "<p>response.statusCode: " + resp.statusCode + "</p>"
                    + "<p> response.statusText: " + resp.statusText + "</p>"
                    + "<p>error: " + error  + "</p>");

                //response.status(404).render("404");
            });
        }
    });


// *** get ALL Sports *** //
function getAllSports(request, response) {
   //response.json( app.locals.data );
   app.locals.data= app.locals.data.sort(function(elem1, elem2){
       if(elem1.pos < elem2.pos) return -1;
       if(elem1.pos > elem2.pos) return 1;
       return 0;
   });
   response.setHeader('Content-Type', 'text/html');
   
   response.render("sports_list",{data:data});
}

// *** get Sport By ID *** //
function getSportById(request, response) {
    console.log(request.params.id);
   if (!request.params.id || !parseInt(request.params.id, 10)) {
       response.status(400).send("Entries must have a id.");
       return;
   }
   let game = data.find((gameElem) => {
     return gameElem.id == request.params.id;
   });

   game.events = game.events.sort(function(elem1, elem2){
       if(elem1.pos < elem2.pos) return -1;
       if(elem1.pos > elem2.pos) return 1;
       return 0;
   });

   //response.json( game );
   entries.game= game;

   response.setHeader('Content-Type', 'text/html');

   response.render("sport", {entries:entries});
}

// *** get Event By ID *** //
function getEvent(request, response) {
    let game = data.find((gameElem) => {
      return gameElem.id == request.params.id;
    });
    let event = game.events.find((eventElem) => {
      return eventElem.id == request.params.event;
    });
    entries.game_id= request.params.id;
    entries.event_id= request.params.event;
    entries.event= event;

    response.setHeader('Content-Type', 'text/html');
    response.render("event",  {entries:entries});
}

// *** json get ALL Sports *** //
function jsonGetAllSports(request, response) {
   //response.json( app.locals.data );
   data= data.sort(function(elem1, elem2){
       if(elem1.pos < elem2.pos) return -1;
       if(elem1.pos > elem2.pos) return 1;
       return 0;
   })
   response.setHeader('Content-Type', 'application/json');
   //response.writeHead(200, {"Content-Type": "application/json"});
   response.json( data );
}

// *** json get Sport By ID *** //
function jsonGetSportById(request, response) {
    if (!request.params.id || !parseInt(request.params.id, 10)) {
        response.status(400).send("Entries must have a id.");
        return;
    }
    let game = data.find((gameElem) => {
      return gameElem.id == request.params.id;
    });

    game.events = game.events.sort(function(elem1, elem2){
        if(elem1.pos < elem2.pos) return -1;
        if(elem1.pos > elem2.pos) return 1;
        return 0;
    });

    response.json( game );
}

// *** json get Event By ID *** //
function jsonGetEvent(request, response) {
   let game = data.find((gameElem) => {
     return gameElem.id == request.params.id;
   });
   let event = game.events.find((eventElem) => {
     return eventElem.id == request.params.event;
   });
   event.game_id=request.params.id
   response.json(event);
}

module.exports = router;

var express = require("express");

var app = express();

// // this get will run whenever our app gets any get request aside from others defined
// app.get("*", function(request, response) {
//     response.send("Error, page not found");
// });
// // order of routes matter so if this get * request is added before all others, nothing else matters


// "/" => "Homepage!"
// "/bye" => "Routed to bye!"

// first parameter is path/url, "/" is the root path or root
// second param is the call back function, the function to run after get is made
app.get("/", function(request, response) {
    // request contains info about the request that was made that triggered this route
    // response contains info about what we're going to respond with
    // both are objects
    response.send("Homepage!");
});

app.get("/bye", function(request, response) {
    console.log("someone made a request to /bye");
    response.send("Routed to bye!");
});

// this get will run whenever our app gets any get request aside from others defined
app.get("*", function(request, response) {
    response.send("Error, page not found");
});
// order of routes matter so if this get * request is added before all others, nothing else matters

// tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started");
});
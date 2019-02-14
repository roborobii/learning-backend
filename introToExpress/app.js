var express = require("express");
var app = express();

// "/" => hi there!
app.get("/", function(req, res) {
    res.send("hi there"); // a way to respond with some text
});
// "/bye" => good bye
app.get("/bye", function(req, res) {
    res.send("good bye");
});
// "/dog" => woof woof
app.get("/dog", function(req, res) {
    console.log("someone made a request to /dog");
    res.send("woof woof");
});

// ROUTE PARAMETERS
//"/r/[any word here]" follows this pattern!
app.get("/r/:subredditName", function(req, res) {
    // console.log(req);
    console.log(req.params);
    var subreddit = req.params.subredditName;
    res.send("welcome to the " + subreddit.toUpperCase() + " subreddit" );
});
app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
    // console.log(req.params);
    console.log(req.params.subredditName);
    res.send("welcome to a comments");
});

// order of routes matter! do not put this first, the first route is done first
// "*" is any other url route
app.get("*", function (req,res) {
    // page not found html can be sent back here
    res.send("you're a star!");
});

// tell express to listen for request (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});
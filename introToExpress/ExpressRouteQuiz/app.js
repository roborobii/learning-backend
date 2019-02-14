var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animal", function(req, res) {
    if (req.params.animal === "pig")
        res.send("The pig says 'Oink'");
    if (req.params.animal === "cow")
        res.send("The cow says 'Moo'");
    if (req.params.animal === "dog")
        res.send("The dog says 'Woof Woof!'");
});

app.get("/repeat/:word/:num_times", function(req, res) {
    var send_this = "";
    for (var i = 0; i < Number(req.params.num_times); i++) {
        send_this += req.params.word + " ";
    }
    res.send(send_this);
});

app.get("*", function(req,res) {
    res.send("Sorry, page not found");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});
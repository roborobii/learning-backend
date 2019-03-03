var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req,res) {
    res.render("search");
});

app.get("/results", function(req,res) {
    // res.send("hello, it works!");
    var search_query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + search_query + "&apikey=thewdb";
    console.log(url);
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            // res.send(data.Search[0].Title);
            res.render("results", {data: data});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie app started");
});
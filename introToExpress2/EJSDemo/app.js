var express = require("express");
var app = express();

// tell express to serve the contents of public dir
app.use(express.static("public"));
// tell express to automatically use ejs, so can use "home" intead of "home.ejs"
app.set("view engine", "ejs");

app.get("/", function(req,res){
    // res.send("Welcome to home page!");
    // res.send("<h1>Welcome to the home page!</h1>");
    res.render("home"); // ejs is embedded javascript
});

app.get("/fallinlovewith/:thing", function(req,res){
    var thing = req.params.thing;
    // res.send("You fell in love with " + thing);
    res.render("love.ejs", {thingVar: thing}); 
    // ejs: embedded js, lets us embed js code inside of html
});

app.get("/posts", function(req,res){
    var posts = [
        {title: "Post 1", author: "Sally"},
        {title: "Post 2", author: "Sam"},
        {title: "Post 3", author: "Suzy"}
    ];
    res.render("posts.ejs", {posts: posts});
});

// process.env.PORT and IP are environment variables that c9 set up
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server is listening");
});
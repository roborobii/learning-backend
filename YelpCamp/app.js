var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2018/03/11/20/42/mammals-3218028__340.jpg"},
    {name: "Hello World", image: "https://cdn.pixabay.com/photo/2018/03/11/20/42/mammals-3218028__340.jpg"},
    {name: "Mountain View", image: "https://cdn.pixabay.com/photo/2018/03/11/20/42/mammals-3218028__340.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2018/03/11/20/42/mammals-3218028__340.jpg"},
    {name: "Hello World", image: "https://cdn.pixabay.com/photo/2018/03/11/20/42/mammals-3218028__340.jpg"},
    {name: "Mountain View", image: "https://cdn.pixabay.com/photo/2018/03/11/20/42/mammals-3218028__340.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2018/03/11/20/42/mammals-3218028__340.jpg"},
    {name: "Hello World", image: "https://cdn.pixabay.com/photo/2018/03/11/20/42/mammals-3218028__340.jpg"},
    {name: "Mountain View", image: "https://cdn.pixabay.com/photo/2018/03/11/20/42/mammals-3218028__340.jpg"}
];

app.get("/", function(req,res) {
    res.render("landing.ejs");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds.ejs", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res) {
    // res.send("you hit the post route");
    // get data from form and add to campgrounds array
    campgrounds.push({name: req.body.name, image: req.body.image});
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started");
});
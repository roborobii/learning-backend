var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user.js"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo", {useNewUrlParser:true});
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req,res) {
    res.render("home");
});

app.get("/secret", function(req,res) {
    res.render("secret");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});
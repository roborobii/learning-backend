var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var passport = require("passport");

router.get("/", function(req,res) {
    res.render("landing.ejs");
});

// AUTH ROUTES
router.get("/register", function(req,res){
    res.render("register.ejs");
});
router.post("/register", function(req,res) {
    // handle user sign up
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

// Log In Routes
router.get("/login", function(req, res) {
    // show login form
   res.render("login"); 
});

// login logic
// passowrd.authenticate is middleware, the code that runs before the final route callback
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
});

// logout
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;
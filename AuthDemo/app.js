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
app.use(bodyParser.urlencoded({extended:true})); // need this everytime we use form and posting data for a request 
app.use(require("express-session")({
    secret: "Hello World",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes

app.get("/", function(req,res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req,res) {
    res.render("secret");
});

// Sign Up Routes
app.get("/register", function(req,res) {
    // show sign up form
    res.render("register");
});
app.post("/register", function(req,res) {
    // handle user sign up
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        });
    });
});

// Log In Routes
app.get("/login", function(req, res) {
    // show login form
   res.render("login"); 
});

// login logic
// passowrd.authenticate is middleware, the code that runs before the final route callback
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {
});

// Logout Routes
app.get("/logout", function(req,res){
    // res.send("OK, will log you not");
    req.logout();
    res.redirect("/");
});

// middleware
function isLoggedIn(req,res,next) {
    // standard to have req,res,next for middleware
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});
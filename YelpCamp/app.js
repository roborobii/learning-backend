var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js"),
    User = require("./models/user.js"),
    seedDB = require("./seeds");

var commentRoutes = require("./routes/comments.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    indexRoutes = require("./routes/index.js");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB(); // use the first time it is run with the db

// passport configuration
app.use(require("express-session")({
    secret: "hello world my name is robin",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started");
});

/*
REST (Representational State Transfer) Routes
    - pattern for defining routes.
    - mapping HTTP routes and CRUD (create read update destroy) together 
    
    - REST is just a convention of HTTP routes to CRUD functionality (create read update delete)
        - makes it more reliable, like a restful api that follows patterns
    - 7 RESTful routes: index, new, create, show, edit, update, destroy

name            url             verb            description
----------------------------------------------------------------------
INDEX           /dogs           GET             display list of all dogs
NEW             /dogs/new       GET             display form to create new dog
CREATE          /dogs           POST            post request to create new dog to DB; redirects to index to show that new dog has been added
SHOW            /dogs/:id       GET             shows info about one specific dog
EDIT            /dogs/:id/edit  GET             shows edit form for one dog
UPDATE          /dogs/:id       PUT             update a particular dog, redirects to /dogs/:id to show particular dog has been edited
DESTROY         /dogs/:id       DELETE          deletes a particular dog, redirects somewhere, usually index to show dog has been deleted

* dogs can be any other thing like blogs, or places, campgrounds, etc.
*/
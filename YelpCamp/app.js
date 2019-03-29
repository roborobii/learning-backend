var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js"),
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB(); // use the first time it is run

app.get("/", function(req,res) {
    res.render("landing.ejs");
});

// INDEX route which shows all campgrounds
app.get("/campgrounds", function(req, res) {
    // res.render("campgrounds.ejs", {campgrounds: campgrounds});
    
    Campground.find({}, function(err, campgrounds_db) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index.ejs", {campgrounds: campgrounds_db});
        }
    });
});

// CREATE route which creates new campground
app.post("/campgrounds", function(req,res) {
    // res.send("you hit the post route");
    // get data from form and add to campgrounds array
    // campgrounds.push({name: req.body.name, image: req.body.image});
    
    Campground.create({
        name: req.body.name, 
        image: req.body.image,
        description: req.body.description
    }, function (err, campground) {
        if (err) console.log(err);
        else console.log(campground);
    });
    
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

// NEW route which displays form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("./campgrounds/new.ejs");
});

// SHOW route
app.get("/campgrounds/:id", function(req,res) {
    // find campground with provided id
    // render show template with that campground
    // Campground.findById(req.params.id, function(err, foundCampground) {
    //     if (err) console.log(err);
    //     else res.render("show.ejs", {campground: foundCampground});
    // });
    
    // finding campground, populating comments on that campground, executing the query; should look like comments, not just ids
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) console.log(err);
        else {
            // console.log(foundCampground);
            res.render("./campgrounds/show.ejs", {campground: foundCampground});
        }
    });
});

// =====================================
// COMMENTS ROUTES

// NEW
app.get("/campgrounds/:id/comments/new", function(req,res) {
    // res.send("comments form");
    // res.render("./comments/new.ejs");
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if (err) console.log(err);
        else {
            res.render("./comments/new.ejs", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req,res) {
    // lookup campground using ID
    Campground.findById(req.params.id, function(err,campground){
        if (err) res.redirect("/campgrounds");
        else {
            // create new comment
            // connect new comment to campground
            // redirect campground showpage
            Comment.create(req.body.comment, function(err, comment) {
                if (err) console.log(err);
                else {
                    console.log("comment created");
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

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


INDEX   /campgrounds        GET
NEW     /campgrounds/new    GET
CREATE  /campgrounds        POST
SHOW    /campgrounds/:id    GET

NEW     /campgrounds/:id/comments/new       GET
CREATE  /campgrounds/:id/comments           POST

*/
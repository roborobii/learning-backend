var express = require("express");
var router = express.Router();
var Campground = require("../models/campground.js");

// INDEX route which shows all campgrounds
router.get("/", function(req, res) {
    // res.render("campgrounds.ejs", {campgrounds: campgrounds});
    // console.log(req.user); 
    Campground.find({}, function(err, campgrounds_db) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index.ejs", {campgrounds: campgrounds_db, currentUser: req.user});
        }
    });
});

// CREATE route which creates new campground
router.post("/", isLoggedIn, function(req,res) {
    // res.send("you hit the post route");
    // get data from form and add to campgrounds array
    // campgrounds.push({name: req.body.name, image: req.body.image});
    
    Campground.create({
        name: req.body.name, 
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, function (err, campground) {
        if (err) console.log(err);
        else {console.log(req.user); res.redirect("/campgrounds");}
    });
    

});

// NEW route which displays form to create new campground
router.get("/new", isLoggedIn, function(req, res) {
    res.render("./campgrounds/new.ejs");
});

// SHOW route
router.get("/:id", function(req,res) {
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

// EDIT Campground route
router.get("/:id/edit", checkCampgroundOwnership, function(req,res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) console.log(err);
        else {
            res.render("./campgrounds/edit.ejs", {campground: foundCampground}); 
            
        }
    }); 
});

// UPDATE Campground route
router.put("/:id", checkCampgroundOwnership, function(req,res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) res.redirect("/campgrounds");
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY campground route
router.delete("/:id", checkCampgroundOwnership, function(req,res) {
    // res.send("trying to delete somethin");
    Campground.findByIdAndRemove(req.params.id,function(err){
       if(err) res.redirect("/campgrounds");
       else res.redirect("/campgrounds");
    });
});

//middleware
function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) return next();
    else res.redirect("/login");
}

function checkCampgroundOwnership(req,res,next) {
    if (req.isAuthenticated()) {
        // does user own the campground?
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    // res.render("./campgrounds/edit.ejs", {campground: foundCampground}); 
                    next();
                } else {
                    // res.send("no permission to edit");
                    res.redirect("back");
                }
            }
        }); 
    } else {
        res.redirect("back");
    }
}

module.exports = router;
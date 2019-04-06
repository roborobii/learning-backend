var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");

// NEW
router.get("/new", isLoggedIn, function(req,res) {
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

router.post("/", isLoggedIn, function(req,res) {
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
                    // console.log("comment created");
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    // console.log(comment);
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", function(req,res) {
    res.send("Edit route for comment");
});

//middleware
function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) return next();
    else res.redirect("/login");
}

module.exports = router;

/*

INDEX   /campgrounds        GET
NEW     /campgrounds/new    GET
CREATE  /campgrounds        POST
SHOW    /campgrounds/:id    GET

NEW     /campgrounds/:id/comments/new       GET
CREATE  /campgrounds/:id/comments           POST

*/
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var middleware = require("../middleware"); // implicitly require to index.js when required directory


// NEW
router.get("/new", middleware.isLoggedIn, function(req,res) {
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

// CREATE
router.post("/", middleware.isLoggedIn, function(req,res) {
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
                    req.flash("success", "successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res) {
    // res.send("Edit route for comment");
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if (err) res.redirect("back");
        else {
            res.render("./comments/edit.ejs", {campground_id: req.params.id, comment: foundComment});
        }
    });
    
});

// comments update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    // res.send("you hit the update");
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) res.redirect("back");
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// comments destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res) {
    // findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err) res.redirect("back");
       else {
           res.redirect("/campgrounds/" +req.params.id);
       }
    });
});

module.exports = router;

/*

INDEX   /campgrounds        GET
NEW     /campgrounds/new    GET
CREATE  /campgrounds        POST
SHOW    /campgrounds/:id    GET

NEW     /campgrounds/:id/comments/new       GET
CREATE  /campgrounds/:id/comments           POST

*/
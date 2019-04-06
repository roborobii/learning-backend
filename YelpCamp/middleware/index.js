var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next) {
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
};

middlewareObj.checkCommentOwnership = function(req,res,next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
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
};

middlewareObj.isLoggedIn = function(req,res,next) {
    if (req.isAuthenticated()) return next();
    else res.redirect("/login");
};

module.exports = middlewareObj;
var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

// var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = mongoose.model("Comment", commentSchema);
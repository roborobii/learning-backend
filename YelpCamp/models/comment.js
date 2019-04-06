var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = mongoose.model("Comment", commentSchema);
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true});

var Post = require("./models/post.js");
var User = require("./models/user.js");

// one to many relationship
// one user to many posts

// // POST - title, content
// var postSchema = new mongoose.Schema({
//     title: String,
//     content: String
// });
// var Post = mongoose.model("Post", postSchema);

// // USER - email, name
// var userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     posts: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Post"
//     }]
// });
// var User = mongoose.model("User", userSchema);

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

// Post.create({
//     title: "How to cook the best burger pt4",
//     content: "blah dasdsadbdasdsalah"
// }, function(err,post) {
//     if (err) console.log(err);
//     else {    // else console.log(post);
//         User.findOne({email: "bob@gmail.com"}, function(err,foundUser){
//             if (err) console.log(err);
//             else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function(err, data) {
//                     if (err) console.log(err);
//                     else console.log(data);
//                 });
//             }
//         });
//     }
// });

// find all posts for a user
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
    if (err) console.log(err);
    else console.log(user);
});

// which one is better? Referencing or Embedding associations? it depends! on your app
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true});

// one to many relationship
// one user to many posts

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);


// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email: "hermoing@brown.edu",
//     name: "Hermoinie Granger"
// });

// newUser.posts.push({
//     title: "How to bre polyjuice potion",
//     content: "Jk, go to potions class to learn it!"
// });

// newUser.save(function(err,user) {
//     if (err) console.log(err);
//     else console.log(user);
// });

User.findOne({name: "Hermoinie Granger"}, function(err, user) {
    if (err) console.log(err);
    else console.log(user);
});

// var newPost = new Post({
//     title: "Charlie",
//     content: "is a boy with the last name Brown"
// });

// newPost.save(function(err,post) {
//     if (err) console.log(err);
//     else console.log(post);
// });
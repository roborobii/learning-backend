var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
    
// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); // must go after bodyParser use
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://images.unsplash.com/photo-1551524163-ba196aa2d881?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60",
//   body: "This is an awesome blog post"
// });


// RESTFUL ROUTES
app.get("/", function(req,res) {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req,res) {
    Blog.find({}, function(err,blogs) {
        if (err) console.log(err);
        else res.render("index.ejs", {blogs: blogs});
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req,res) {
    res.render("new.ejs");
});

// CREATE ROUTE
app.post("/blogs", function(req,res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if (err) console.log(err);
        else console.log(newBlog);
    });
    //then redirect
    res.redirect("/blogs");
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    // res.send("show page");
    Blog.findById(req.params.id, function(err, blogFound) {
        if (err) res.redirect("/blogs");
        else res.render("show.ejs", {blog: blogFound});
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) res.redirect("/blogs");
        else res.render("edit.ejs", {blog: foundBlog});
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // Blog.findByIdAndUpdate(id, newData, callback);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err) res.redirect("/blogs");
        else res.redirect("/blogs/" + req.params.id);
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req,res){
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) res.redirect("/blogs");
        else res.redirect("/blogs");
    });
    // redirect somewhere
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("BlogApp server started");
});
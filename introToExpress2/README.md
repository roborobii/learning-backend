# Rendering HTML and templates
* use res.render() to render HTML (from an EJS file)
* explain what EJS is and why we use it
* pass variables to EJS templates
* npm init to start an express app

# EJS control flow
* show examples of control flow in EJS templates
* write if statements in EJS file
* write loops in EJS file

# Styles and partials
* show how to properly include public assets (css)
*  - create public directory, add stylesheets (css) in it
*  - tell express to serve the public directory (by app.use
*  - tell express that all templates are going to be ejs, so we don't have to tell .ejs after every template name
* use partials to dry up code
*  - make partials directory, to have html header and footer, for drying up code so we dont have to explicitely input headers and footers to each template

# Post requests
* write post routes, test with postman
* use form to send post requests
* use body parser to get form data

# Databases
* What is it? Database is a collection of information or data that has an interface
    * Collection of data or information
    * Has interface (some sort of language/tool too interect with data)
    *   can insert/extract/edit things to/from/in the database
    *   db.dogs.find()
    *   db.dogs.delete({age:14})
* SQL vs NoSQL
    * SQL is relational (been around longer); 
    *   have to define tables and follow predefined rules
    *   multiple tables to relate data; join table
    * NoSQL is non-relational database, no tables, more flexible
* CRUD (create, read, update, destroy)
* MongoD starts the daemon that we need to use mongo
* mongo opens a shell for the mongodb.
*   help, show dbs (shows all current databases in the mongodb),
*   use demo (create new db named demo and change into that db),
*   .insert, .find, .update, .remove
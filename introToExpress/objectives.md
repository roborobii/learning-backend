# Intro to Express
* What is a framework? How is it different from a library?
* Libraries: jquery & bootstrap & other code that we can include in our app
* Express is a framework. Control flow is already in framework, few spots to change up
* Both libraries and frameworks are external code that can be added to your application but
* Library is something you are in control of, framework gives up a little bit of control
* Framework gives basic groundwork.
* Express is a lightweight framework meaning that you still have to fill in a lot, doesn't hide anything from you

# NPM Init and package.json
* Use the `--save` flag to install packages
* --save saves dependency to package.json under dependencies
Every NPM package we use has a package.json file
JSON: javascript object notation, data type to represent structure
* What package.json file does
Holds meta data relevant to a specific project
* `npm init` to create a new package.json


# More routing
* show the `*` route matcher
*   this is the catch all other undefined routes route
* write routes containing route parameters
* discuss route order
*   order of routes matter so if this get * request is added before all others, nothing else matters
*   the first request that matches will be the only route to run
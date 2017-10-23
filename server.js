const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//handle partials allow for reusablilty
hbs.registerPartials(__dirname + '/views/partials');
//app.set wires up hbs template (handlebars)
app.set('view engine', 'hbs');

//app.use register middleware - arg is the middleware function to use.
//create a middleware -- which does processing when a request is received.
//this example logs our response to console and file
//application will not move to the response, until we call next
app.use((req, res, next) => {
  //simulate a logger
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//this middleware takes over the website and renders the maintenance page
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//set up static directory for all files.  Now, You don't need to put in the full path in the browser URL
app.use(express.static(__dirname + '/public'));

//register functions to be reused by handlerbars
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

//example of a function we are register functions that take arguments
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//use res.render to render handlebar templates.  You pass in your substitutions
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  //render my templates
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

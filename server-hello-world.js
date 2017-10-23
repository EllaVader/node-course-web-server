const express = require('express');

//1.  this creates our app
var app = express();

//2.  set up http route handlers
app.get('/', (req, res) => {
  //for a get request, return this response
  //res.send('<h1>Hello Express</h1>');
  res.send({
    name: 'Janine',
    likes: ['guitar', 'gardening']
  });
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

//3.  have our app listen for requests so it can respond. binds the app to a port on our machine
app.listen(3000);

//4.  start the app via node server.js then navigate to localhost:3000

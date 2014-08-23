var express = require('express'),
    path = require('path'),
    app = express(), // Web framework to handle routing requests
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    routes = require('./routes'); // Routes for our application

  app.use(logger("dev",{immediate: true }));  /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.static(path.join(__dirname, 'public')));

  // Express middleware to populate 'req.body' so we can access POST variables
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({extended:true}));
  // Application routes
  routes(app);

  app.listen(7000);
  console.log('Express server listening on port 7000');
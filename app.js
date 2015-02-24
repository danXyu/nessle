// Create an express server to serve text queries.
var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var multer = require('multer');
var Promise = require('promise');
var server = require('./server/server');
var app = express();

// Establish middleware for express app.
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

// Establish the index page for mobile demonstration.
app.get('/', function (req, res) {
  res.sendfile(__dirname + "client/index.html");
});

// Create the backend twilio endpoint calls.
app.get('/query/sms', function (req, res) {

  // Call promised parse function on server, generate valid TwimlResponse.
  server.parse(req.query.Body).then(function (data) {
    var resp = new twilio.TwimlResponse();
    resp.message(data);

    // Set response headers and send to url endpoint.
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());
  });
});

// Start the express app.
app.listen(app.get('port'), function () {
  console.log('Express server now listening on port %d in %s mode.', app.get('port'), app.get('env'));
});



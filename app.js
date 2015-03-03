/**
 * Module dependencies.
 */
var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var multer = require('multer');
var Promise = require('promise');
var app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

/**
 * Primary app routes.
 */
app.get('/', homeController.getIndex);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);


/**
 * API routes.
 */
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

/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
  console.log('Express server now listening on port %d in %s mode.', app.get('port'), app.get('env'));
});



/**
 * Module dependencies.
 */
var Promise = require('promise');
var wolframAPI = require('../../server/apis/wolfram');
var twilio = require('twilio');


/**
 * GET /api/twilio
 */
exports.getTwilioResponse = function (req, res) {

  // Call promised parse function on server, generate valid TwimlResponse.
  wolframAPI.getWolfram(req.query.Body).then(function (data) {
    var resp = new twilio.TwimlResponse();

    if (data != undefined) {
      resp.message(data);
    } else {
      resp.message("Sorry, I don't know how to respond to that.");
    }

    // Set response headers and send to url endpoint.
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());
  });
}


/**
 * GET /api/frontend
 */
exports.getFrontendResponse = function (req, res) {

  // Get the wolfram response from server using the query from frontend messaging.
  wolframAPI.getWolfram(req.query.query).then(function (data) {

    // Set response headers and send to url endpoint.
    if (data != undefined) {
      res.end(data.toString());
    } else {
      res.end("Sorry, I don't know how to respond to that.");
    }
  });
}
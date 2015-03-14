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
    resp.message(data);

    // Set response headers and send to url endpoint.
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());
  });
}
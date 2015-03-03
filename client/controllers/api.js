/**
 * Module dependencies.
 */


/**
 * GET /api/twilio
 */
exports.getTwilio = function(req, res, next) {
  return wolfram.getWolfram(query).then(function (res) {
    return res;
  });
  // Call promised parse function on server, generate valid TwimlResponse.
  server.parse(req.query.Body).then(function (data) {
    var resp = new twilio.TwimlResponse();
    resp.message(data);

    // Set response headers and send to url endpoint.
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());
  });
}
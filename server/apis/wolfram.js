// Require the necessary api keys and auth tokens.
var secrets = require('./secrets');
var wolfram = require('wolfram-alpha').createClient('66H2AQ-A59XR4VERP');

/* Function: Calls the Wolfram API with the passed in query and returns the resultant
 * string (selected using smart algorithms) and passing it to twilio.
 */
exports.getWolfram = function (query, callback) {

  // Query the wolfram alpha API.
  wolfram.query(query, function (error, data) {

    // Report an errors that occur (very possible).
    if (error)
      throw error;

    // Loop through the data and search for the 'Result' parameter.
    for (var i = 0; i < data.length; i++) {
      if (data[i].title === 'Result') {
        var queryResult = data[i].subpods[0].text;
      }
    }

    console.log(queryResult);
    // Call the callback function with the query results.
    callback(queryResult);
  });
}
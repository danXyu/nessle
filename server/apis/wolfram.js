// Require the necessary api keys and auth tokens.
var secrets = require('./secrets');
var Promise = require('promise');
var wolfram = require('wolfram-alpha').createClient(secrets.WOLFRAM_API_KEY);

/* Function: Calls the Wolfram API with the passed in query and returns the resultant
 * string (selected using smart algorithms) and passing it to twilio.
 */
exports.getWolfram = function (query) {

  // Create a promise that should pass result back down to the server.
  return new Promise(function (resolve, reject) {
    wolfram.query(query, function (error, data) {

      // Report an errors that occur (very possible).
      if (error) {
        throw error;
        reject(error);
      } else {

        // Loop through the data and search for the 'Result' parameter.
        for (var i = 0; i < data.length; i++) {
          if (data[i].title === 'Result') {
            var queryResult = data[i].subpods[0].text;
          }
        }

        // Call the resolve function with the query results.
        resolve(queryResult);
      }
    });
  });
}
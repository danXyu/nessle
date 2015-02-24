// Require all of the apis necessary for parsing calls.
var wolfram = require('./apis/wolfram');

/* Function: Determines the right api to call in order to grab the correct string. Due
 * to the extensivity of Wolfram Alpha's API, most calls will end up being directed
 * to the Wolfram Alpha API.
 */
exports.parse = function (query) {
  return wolfram.getWolfram(query);
}
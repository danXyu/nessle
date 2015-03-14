/**
 * GET /
 */
exports.getIndex = function(req, res) {
  res.render('home/index', {
    title: 'Home'
  });
};
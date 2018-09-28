var express = require('express'),
    middleware = require('../middleware/index.js'),
    router  = express.Router();
    
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Get specific user dboard.
router.get("/:id", middleware.isLoggedIn, function(req, res) {
    res.render("dashboard.ejs");
});


module.exports = router;

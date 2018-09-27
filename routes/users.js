var express = require('express'),
    router  = express.Router();
    
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Get specific user dboard.
router.get("/:id", function(req, res) {
    res.render("dashboard.ejs");
});


module.exports = router;

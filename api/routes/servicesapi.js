const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth.js');

const serviceCon = require('../controllers/services.js');

//create a service (user must be logged in)
router.post('/create', checkAuth, serviceCon.service_create);
//get all current services
router.get('/services', checkAuth, serviceCon.service_get);
//delete a service
// router.delete(':serviceID', checkAuth, serviceCon.service_delete);
//search for a service
router.post('/search', serviceCon.service_search);

//should add an edit service (possibly)


module.exports = router;

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth.js');

const serviceCon = require('../controllers/services.js');

//create a service (user must be logged in)
// router.post('/create', checkAuth, serviceCon.service_create);
router.post('/create', serviceCon.service_create);

//get all current services
router.get('/', serviceCon.service_index);

//delete a service
// router.delete(':serviceID', checkAuth, serviceCon.service_delete);

//search for a service
router.post('/search', serviceCon.service_search);

//edit service
router.post('/edit', serviceCon.service_edit);

// delete service
router.post('/delete', serviceCon.service_delete);

// get specific service.
router.get('/:id', serviceCon.service_get);


module.exports = router;

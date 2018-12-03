const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth.js');

const serviceCon = require('../controllers/services.js');

const multer = require('multer');
const fs = require('fs');

const imgur = require('imgur');
imgur.setClientId('2ce55c3b8fb0ca4');
imgur.setAPIUrl('https://api.imgur.com/3/');

// make uploads folder in root of project.
var imgdir = './uploads';
if(!fs.existsSync(imgdir)){
  fs.mkdirSync(imgdir);
}

// multer setup
var storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, imgdir)
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({storage: storage});


//create a service (user must be logged in)
router.post('/create', checkAuth, upload.single('image'), serviceCon.service_create);

//get all current services
router.get('/', serviceCon.service_index);

//delete a service
// router.delete(':serviceID', checkAuth, serviceCon.service_delete);

//search for a service
router.post('/search', serviceCon.service_search);

//search using tags
router.post('/searchtags', serviceCon.service_search_tags);

//edit service
router.post('/edit', checkAuth, upload.single('image'), serviceCon.service_edit);

// delete service
router.post('/delete',checkAuth, serviceCon.service_delete);

// get specific service.
router.get('/:id', serviceCon.service_get);

//get all of a users services
router.get('/user/:usersId', serviceCon.service_get_user_service);

//create a comment for a service
router.post('/createComment', checkAuth, serviceCon.service_create_comment);

//report a service
router.post('/report', checkAuth, serviceCon.service_report);

module.exports = router;

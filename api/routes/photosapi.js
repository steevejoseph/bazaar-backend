const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const checkAuth = require('../middleware/check-auth.js');
const photoCon = require('../controllers/photos.js');

// make uploads folder in root of project.
var imgdir = "./api/uploads";
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

// routes ======================================================================
// POSTS to ${ROOT_URL}/photos/service/:serviceId/create
router.post('/service/:serviceId/create', checkAuth, upload.single('image'), photoCon.photo_create_service);

// POSTS to ${ROOT_URL}/photos/user/:userId/create
router.post('/user/:userId/create', checkAuth, upload.single('image'), photoCon.photo_create_user);



module.exports = router;

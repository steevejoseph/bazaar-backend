const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');

const imgur = require('imgur');
imgur.setClientId('2ce55c3b8fb0ca4');
imgur.setAPIUrl('https://api.imgur.com/3/');


const Service = require('../../models/service.js');
const Comment = require('../../models/comment.js');
const checkAuth = require('../middleware/check-auth.js');

mongoose.connect('mongodb://team7:ABC123@ds263832.mlab.com:63832/largo-dev', {useNewUrlParser: true});


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


// routes ======================================================================
router.post('/service/:serviceId/create', upload.single('image'), (req, res, next) => {
    console.log(JSON.stringify(req.file));
    const file = (req.file.path);

    imgur
      .uploadFile(file)
      .then(function (json) {
          console.log(json.data.link);
          Service.findByIdAndUpdate(req.params.serviceId, {$push: {photos: json.data.link}}, function(err, service){
            if(err){
                console.error(err);
                res.status(500).json({
                  message: 'Could not upload image.',
                  err: err
                });
            }
    
            else {
                res.status(200).json({
                    message: 'Image uploaded successfully.',
                    url: json.data.link
                });
            }    
        });
    
      })
      .catch(function (err) {
          console.error(err);
          res.status(500).json({
            message: 'Could not upload image.',
            err: err
          });
      });
});


module.exports = router;

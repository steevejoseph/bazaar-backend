// const multer = require('multer');
// const fs = require('fs');

// const imgur = require('imgur');
// imgur.setClientId('2ce55c3b8fb0ca4');
// imgur.setAPIUrl('https://api.imgur.com/3/');

// // make uploads folder in root of project.
// var imgdir = './uploads';
// if(!fs.existsSync(imgdir)){
//   fs.mkdirSync(imgdir);
// }

// // multer setup
// var storage = multer.diskStorage({

//   destination: (req, file, cb) => {
//     cb(null, imgdir)
//   },

//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });

// var upload = multer({storage: storage});



exports.uploadToImgur = (file) => {
    // sanity check to make sure we can find the file
    console.log(file);
    // imgur
    // .uploadFile(file)
    // .then(function (json) {
    //     console.log(json.data.link);
    //     return [json.data.link];
    // })  
    // .catch(function (err) {
    //     console.error(err);
    //     return [];
    // });
}
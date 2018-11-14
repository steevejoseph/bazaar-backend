//this file is for the user routes of the api
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth.js'); 

const userCon = require('../controllers/users.js'); //require the users controller

router.get('/', userCon.user_index);

router.post('/signup', userCon.user_signup, userCon.user_login); //signup route

router.post('/login', userCon.user_login); //login route (gives user a token that will be required for routes needing authentication)

// get specific user
router.get('/:userId', userCon.user_get);

//needs to be fixed
router.delete('/delete/:userID', checkAuth, userCon.user_delete); //delete user and check that they are authenticated before doing so

//should possibly addd  an edit to user
router.patch('/edit/:userID', checkAuth, userCon.user_edit);

module.exports = router;
//this file is for the user routes of the api
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth.js'); 

const userCon = require('../controllers/users.js'); //require the users controller

router.post('/signup', userCon.user_signup); //signup route

router.post('/login', userCon.user_login); //login route (gives user a token that will be required for routes needing authentication)

router.delete('/:userID', checkAuth, userCon.user_delete); //delete user and check that they are authenticated before doing so

module.exports = router;
const express = require('express');
const router = express.Router();    
const User = require("../models/user");
const {handleUserSignup,handleUserLogin} = require("../controllers/user");

// on /user -> handleUserSignup executed And on /user/login -> handleUserLogin executed
router.post('/',handleUserSignup);
router.post('/login',handleUserLogin);

module.exports = router;
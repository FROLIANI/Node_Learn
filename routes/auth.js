
const express = require('express')
const {check} = require('express-validator');
const router = express.Router();
const {register} = require("../controllers/auth")

//End point
router.post('/register',[
    check('username', 'email is not valid').isEmail(),
    check(' ', 'password must be at least 5 characters').isLength({min:5, max:10}),
],register ) 

module.exports = router;
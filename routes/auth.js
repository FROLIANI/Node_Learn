
const express = require('express')
const {check} = require('express-validator');
const router = express.Router();
const {register,login} = require("../controllers/auth")

//End point For Register
router.post('/register',[
    check('username', 'email is not valid').isEmail(),
    check('password ', 'password must be at least 5 characters').isLength({min:5, max:10}),
],register ) 


//End point for Login
router.post(
    '/login', [
        check('username', 'Email is not valid').isEmail(),
        check('password', 'Password not satsfied').isLength({ min: 5, max: 10 }),
    ],
    login
);

module.exports = router;
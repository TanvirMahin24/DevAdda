const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require("express-validator");

//Custom Middleware
const auth = require('../../middleware/auth');

//Model require
const User = require('../../models/User');

//@route api/auth
//@desc Test route
//@access Public
router.get('/', auth, async (req , res) => {
    try {
        //find the user by the id
        const user = await User.findById(req.user.id).select('-password');

        //send the user to the frontend
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(5000).send('Server Error');
    }
});

//@route POST api/auth
//@desc Authenticate user and get jwt token
//@access Public
router.post('/', 
[
    check('email', 'Please insert a valid Email').isEmail(),
    check('password', 'Password is required').exists()
], async (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    //destructure the req.body
    const { email , password } = req.body;

    try {
        //check if the user already exist. return error if happens
        let user = await User.findOne({email : email});

        //If user already exist
        if(!user){
            return res.status(400).json({ errors: [{ msg: "Invalid credentials"}]});
        }

        //Check if the password matchs
        const isMatch = await bcrypt.compare( password , user.password);
        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: "Invalid credentials"}]});
        }

        //Return JSON web token
        //payload is the data that will make the JWT token.
        const payload = {
            user : {
                id : user.id 
            }
        };
        //create JWT token
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            //Token will expire in 3600s
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token })
            }
            );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error :(');
    }
});
module.exports = router;
const express = require('express');
const router = express.Router();
const gravater = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require("express-validator");

//User Model
const User = require('../../models/User');

//@route api/users
//@desc POST regester user
//@access Public
router.post('/', [
    check('name','Name is required').not().isEmpty(),
    check('email', 'Please insert a valid Email').isEmail(),
    check('password', 'Please enter a password with more than 5 charecters').isLength({
        min: 6
    })
], async (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    //destructure the req.body
    const {name,email,password} = req.body;

    try {
        //check if the user already exist. return error if happens
        let user = await User.findOne({email : email});

        //If user already exist
        if(user){
            return res.status(400).json({ errors: [{ msg: "User already exists"}]});
        }

        //Get user gravater
        const avatar = gravater.url(email, {
            s : "200",
            r : "pg",
            d : "mm"
        });
        
        //Create User Instance
        user = new User({
            name,
            email,
            avatar,
            password
        });

        //Encrypt the password with Bcrypt ..... salt is needed for hashing the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password , salt);
        
        //Save the newly created user to the database
        await user.save();

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
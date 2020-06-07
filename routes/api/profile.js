const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const request = require('request');
const config = require('config');

//Model
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

//Custom middleware
const auth = require("../../middleware/auth");

//@route GET api/profile/me
//@desc Get current user profile
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    //Find the Profile using the user id from the header and add the name and avater field to profile for further use
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avater"]);

    //Check if there is no profile
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    //If profile found
    res.send(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/profile
//@desc Create or Update User profile
//@access Private
router.post(
  "/",
  [
    auth,
    [
      //The status and the skills field are required
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skill is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //Validation error handeling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructure the fields of profile
    const {
      company,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      instagram,
      linkedin,
      twitter,
      website,
    } = req.body;

    //Creating profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    //Insert each field
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //Create social field object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;

    //Insert new profile to the database if exists then update it
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update existing profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create new profile if not found
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/profile
//@desc Get all profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    //Search all profiles from database and append the name and avatar field using the user model
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/profile/user/:userId
//@desc Get profile by user id
//@access Public
router.get("/user/:userId", async (req, res) => {
  try {
    //Search a profile from database and append the name and avatar field using the user model
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      //Handels the error for invalid userId
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/profile
//@desc Delete profile, user and posts of that user
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    //Remove user posts
    await Post.deleteMany({user: req.user.id});

    //Search and remove profile of the current user from database
    await Profile.findOneAndRemove({ user: req.user.id });

    //Remove the user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/profile/experience
//@desc Updates the experience field of profile
//@access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //Check if title Company and From are provided or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructure the data coming from req
    const { title, company, location, from, to, current, description } = req.body;

    //new variable
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      //Fetch the profile to insert exp
      const profile = await Profile.findOne({
        user: req.user.id,
      });

      //add newExp to the experience field
      profile.experience.unshift(newExp);

      //save profile
      profile.save();

      //response
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/profile/experience/:expId
//@desc Delete experience from profile
//@access Private
router.delete('/experience/:expId', auth, async (req, res) => {
  try {
    //Fetch the profile to insert exp
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    //id of the experience to remove
    const removeId = profile.experience.map( item => item.id).indexOf(req.params.expId);
    
    //delete the experience
    profile.experience.splice(removeId, 1);

    //save profile
    await profile.save();

    //response
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


//@route PUT api/profile/education
//@desc Updates the education field of profile
//@access Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //Check if school, degree, fieldofstudy and From are provided or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructure the data coming from req
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    //new variable
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      //Fetch the profile to insert exp
      const profile = await Profile.findOne({
        user: req.user.id,
      });

      //add newEdu to the education field
      profile.education.unshift(newEdu);

      //save profile
      profile.save();

      //response
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/profile/education/:eduId
//@desc Delete experience from profile
//@access Private
router.delete('/education/:eduId', auth, async (req, res) => {
  try {
    //Fetch the profile to insert exp
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    //id of the education to remove
    const removeId = profile.education.map( item => item.id).indexOf(req.params.eduId);
    
    //delete the education
    profile.education.splice(removeId, 1);

    //save profile
    await profile.save();
    
    //response
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/profile/github/:username
//@desc Get repos from GitHub
//@access Public
router.get('/github/:username', (req,res) => {
  try {
    //Options for the request
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc
      &client_id=${config.get('githubClientID')}&client_secret=${config.get('githubClientSecret')}`,
      method: "GET",
      headers: { 'user-agent': "node.js"}
    }

    //sending the request
    request(options, (error, response, body) => {
      //Handel the error
      if(error) {
        console.error(error);
      }

      //If response is not 200
      if(response.statusCode != 200){
        return res.status(404).json({ msg: "No GitHub profile found"});
      }
      
      //if repos found return the data of the body containing the repos
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

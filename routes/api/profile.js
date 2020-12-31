const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(400).send({
        errors: [
          {
            msg: 'There is no profile for this user.',
          },
        ],
      });
    }
    res.send(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('gender', 'Status is required.').not().isEmpty(),
      check('height', 'Skills is required').not().isEmpty(),
      check('weight', 'Skills is required').not().isEmpty(),
      check('age', 'Skills is required').not().isEmpty(),
      check('activityLevel', 'Skills is required').not().isEmpty(),
      check('heightUnit', 'Skills is required').not().isEmpty(),
      check('weightUnit', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    }

    // destructure the request
    const { gender, height, weight, age, activityLevel, heightUnit, weightUnit } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (gender) profileFields.gender = gender;
    if (height) profileFields.height = height;
    if (weight) profileFields.weight = weight;
    if (age) profileFields.age = age;
    if (activityLevel) profileFields.activityLevel = activityLevel;
    if (heightUnit) profileFields.heightUnit = heightUnit;
    if (weightUnit) profileFields.weightUnit = weightUnit;

    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          {
            user: req.user.id,
          },
          {
            $set: profileFields,
          },
          {
            new: true,
          }
        );

        return res.send(profile);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();
      return res.send(profile);
    } catch (error) {
      return res.status(400).send({
        errors: errors.array(),
      });
    }
  }
);

module.exports = router;

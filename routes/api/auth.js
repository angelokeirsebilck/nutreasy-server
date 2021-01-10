const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
var request = require('request');
clientID = '03f7fe9b4d0244da8a5bb18afc584650';
clientSecret = 'ebe7115fd9914297a41ebe70256ffc84';

// @route   GET api/auth
// @desc    Get authenticated user
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/auth/fat
// @desc    Get fatSecret access_token
// @access  Private
router.get('/fat', auth, async (req, res) => {
  try {
    var options = {
      method: 'POST',
      url: 'https://oauth.fatsecret.com/connect/token',
      method: 'POST',
      auth: {
        user: clientID,
        password: clientSecret,
      },
      headers: { 'content-type': 'application/json' },
      form: {
        grant_type: 'client_credentials',
        scope: 'basic',
      },
      json: true,
    };

    const fixieRequest = request.defaults({ proxy: process.env.FIXIE_URL });

    fixieRequest(options, function (error, response, body) {
      if (error) throw new Error(error);

      res.send(body.access_token);
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    }

    let { email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).send({
          errors: [{ msg: 'Invalid credentials.' }],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({
          errors: [{ msg: 'Invalid credentials.' }],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.send({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
);

module.exports = router;

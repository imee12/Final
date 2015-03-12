var qs = require('querystring');
var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
var config = require('../config');
var mongoose = require('mongoose');
var User = require('../entities/User');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createToken(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

router.route('/login')
  .post(function(req, res, next) {
    User.findOne({ email: req.body.email }, '+password', function(err, user, next) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ message: 'Wrong email and/or password' });
      }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({ message: 'Wrong email and/or password' });
        }
        res.send({ token: createToken(user), phone: user.phone });
      });
    });
  });

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
 router.route('/signup')
  .post(function(req, res) {
    console.log("Hi");
    User.findOne({ email: req.body.email }, function(err, existingUser) {
      if (existingUser) {
        return res.status(409).send({ message: 'Email is already taken' });
      }
      var user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
      });
      user.save(function() {
        res.send({ token: createToken(user), phone: user.phone });
      });
    });
  });

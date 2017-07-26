var router = require('express').Router();
var { User } = require('../models/models');

module.exports = function(passport) {
  router.post('/signup', function(req, res){
    if(req.body.username && req.body.password) {
      var u = new User({
        name: req.body.username,
        password: req.body.password
      });
      u.save()
      .then(function(u){
        res.json({success: true, user: u});
      })
      .catch(function(e) {
        res.json({success: false, error: e});
      });
    };
  });

  router.post('/login', passport.authenticate('local'), function(req, res){
    res.json({success: true});
  });

  return router;
};

var router = require('express').Router();
var { User } = require('../mongodb/models');

module.exports = function(passport) {
  router.post('/signup', function(req, res){
    if(req.body.username && req.body.password) {
      User.find({username: req.body.username}).exec()
      .then(function(mongoUser){
        if(mongoUser){
          res.json({success: false, error: "username already exists!"});
        } else {
          var u = new User({
            username: req.body.username,
            password: req.body.password
          });
          return u.save()
        };
      })
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

  router.get('/logout', function(req, res){
    req.logout();
    res.json({success: true});
  });

  return router;
};

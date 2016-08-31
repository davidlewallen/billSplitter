const express = require('express');
const passport = require('passport');

const router = express.Router();

module.exports = router;

router.get('/google/login',
  passport.authenticate('google', {
    scope: [
      'profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ]
  })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.post('/logout', function(req,res) {
  req.logout();
  req.session.destroy();
  res.send(false);
});
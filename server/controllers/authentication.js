const express  = require('express');
const passport = require('passport');

const router   = express.Router();

module.exports = router;

router.post('/logout', function(req,res) {
  req.logout();
  req.session.destroy();
  res.send(false);
})

router.get('/auth/google/login',
  passport.authenticate('google', {
    scope: [
      'profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ]
  })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);
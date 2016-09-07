const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '563922958905-pfkusvpu0g9ojdpo69k3l3u5rum58pea.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'eTZiyoCLwMRnUMqRw2x8FUt3';

const User = require('./models/user');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/oauth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate(profile)
      .then(value => {
        return cb(null, profile);
      });
    }
  ));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(id, cb) {
    cb(null, id);
  });
}

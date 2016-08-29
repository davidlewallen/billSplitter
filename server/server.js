var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var passport = require('passport');

var webpackConfig = require('../webpack.config.js');

var app = express();

require('./passport')(passport);

var assetFolder = path.join(__dirname, '..', 'client','public');

app.use(express.static(assetFolder));
app.use(webpackDevMiddleware(webpack(webpackConfig), { noInfo: true }));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat', resave: false, saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// TODO: REMOVE THIS BEFORE PUSHING
// THIS IS STRICTLY FOR TESTING ONLY
app.get('/auth/google/login',
  passport.authenticate('google', {
    scope: [
      'profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ]
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/api/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

// Wild card route for client side routing.
app.get('/*', (req, res) => {
  res.sendFile( assetFolder + '/index.html' );
})

app.listen(3000);
console.log("Server started on localhost:3000")

module.exports = app;

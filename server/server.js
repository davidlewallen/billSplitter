const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const passport = require('passport');

const webpackConfig = require('../webpack.config.js');

let app = express();

require('./passport')(passport);

const assetFolder = path.join(__dirname, '..', 'client','public');

const routes = require('./controllers/index');

app.use(express.static(assetFolder));
app.use(webpackDevMiddleware(webpack(webpackConfig), { noInfo: true }));
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat', resave: false, saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes)

// Wild card route for client side routing.
app.get('/*', (req, res) => {
  res.sendFile( assetFolder + '/index.html' );
})

app.listen(3000);
console.log("Server started on localhost:3000")

module.exports = app;

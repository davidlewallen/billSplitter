var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('../webpack.config.js');

var app = express();

var assetFolder = path.join(__dirname, '..', 'client','public');

app.use(express.static(assetFolder));
app.use(webpackDevMiddleware(webpack(webpackConfig), { noInfo: true }));


// Wild card route for client side routing.
app.get('/*', (req, res) => {
  res.sendFile( assetFolder + '/index.html' );
})

app.listen(3000);
console.log("Server started on localhost:3000")

module.exports = app;

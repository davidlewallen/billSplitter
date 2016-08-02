var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var bodyParser = require('body-parser')

var webpackConfig = require('../webpack.config.js')
//TODO: (Refactor) pSQL
var db = require('./db')

var app = express();

var assetFolder = path.join(__dirname, '..', 'client','public');

app.use(express.static(assetFolder));
app.use(webpackDevMiddleware(webpack(webpackConfig), { noInfo: true }));
app.use(bodyParser.json());

//TODO: (Refactor) Db needs to be moved to pSQL
app.get('/api/bills', (req, res) => {
	db.collection('billList').find({})
		.then((billArray) => res.send(billArray[0]))
})

//TODO: (Refactor) Db needs to be moved to pSQL
app.post('/api/bills', (req, res) => {
	db.collection('billList').insert({
		company: req.body.company,
		amount: req.body.amount,
		amountPerPerson: Math.ceil(amount / 4),
		dueDate: new Date(req.body.dueDate)
	})

	res.sendStatus(201);
})

// Wild card route for client side routing.
app.get('/*', (req, res) => {
  res.sendFile( assetFolder + '/index.html' );
})

app.listen(3000);
console.log("Server started on localhost:3000")

module.exports = app;

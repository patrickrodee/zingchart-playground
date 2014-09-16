var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');

var chartSchema = new mongoose.Schema({
  	zingId: Number,
	name: String,
	data: String,
	created: Date
 });

var Chart = mongoose.model('Chart', chartSchema);


mongoose.connect("mongodb://zingchart-playground:zingnimbus1@ds035740.mongolab.com:35740/zingchart-demo-db");
mongoose.connection.on('error', function() {
	console.error('MongoDB Connection Error');
});

var app = express();

app.set('port', process.env.PORT || 3333);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// API ROUTES ==============================

// All Chart ==============================================
app.get('/api/charts', function(req, res, next) {
	var query = Chart.find();
	query.exec(function(err, charts) {
		if (err) return next(err);
		res.send(charts);
	});
});

// GET Chart by ID =============================================
app.get('/api/charts/:id', function(req, res) {
	Chart.findById(req.params.id, function(err, chart) {
		if (err) return next(err);
		res.send(chart);
	  	});

});

// POST a Chart =============================================
app.post('/api/postchart', function(req, res, next) {
	var chart = new Chart({
		zingId: 	req.body.zingId,
		name: 		req.body.name,
		data: 		req.body.data,
		created: 	req.body.created
	});
	chart.save(function(err) {
		if (err) return next(err);
		res.send(200);
	});
});


// CATCH ALL ===============================
app.get('*', function(req, res) {
  res.redirect('/dashboard.html#/client/53627de45f3971e202ffe41f/charts');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500,{ message: err.message });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var methodOverride = require('method-override');

// Mongoose Schema =========================================
// 
var chartSchema = new mongoose.Schema({
	zingId: 	Number,
	name: 		String,
	data: 		String,
	created: 	Date,
	creator: 	Number
});

var userSchema = new mongoose.Schema({
	_id: 		{type: Number, unique: true},
	firstname: 	String,
	lastname: 	String,
	email: 		{type: String, unique: true},
	password: 	String
});

userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

var User = mongoose.model('User', userSchema);
var Chart = mongoose.model('Chart', chartSchema);

//mongoose.connect('localhost');
mongoose.connect("mongodb://zingchart-playground:zingnimbus1@ds035740.mongolab.com:35740/zingchart-demo-db");
mongoose.connection.on('error', function() {
	console.error('MongoDB Connection Error');
});

// Ensure User Authentication =============================
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) next();
	else res.send(401);
}

// Passport Methods =======================================
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

var app = express();
var methodOverride = require('method-override');
app.set('port', process.env.PORT || 3333);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'zingnimbus' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

app.use(function(req, res, next) {
	if (req.user) {
		res.cookie('user', JSON.stringify(req.user));
	}
	next();
});

// API ROUTES ============================================

// Signup ================================================
app.post('/api/signup', function(req, res, next) {
	var id = mongoose.Types.ObjectId();
	var user = new User({
		_id: 		id,
		firstname: 	req.body.firstname,
		lastname: 	req.body.lastname,
		email: 		req.body.email,
		password: 	req.body.password
	});
	user.save(function(err) {
		if (err) return next(err);
		res.send(200);
	});
});

// Login =================================================
app.post('/api/login', passport.authenticate('local'), function(req, res) {
	res.send(req.user);
});

// Logout ================================================
app.get('/api/logout', function(req, res, next) {
	req.logout();
	res.send(200);
})

// All Chart ==============================================
app.get('/api/charts', function(req, res, next) {
	var query = Chart.find();
	query.exec(function(err, charts) {
		if (err) return next(err);
		res.send(charts);
	});
});

// GET Chart by ID =============================================
app.get('/api/charts/:id', function(req, res, next) {
	Chart.findById( req.params.id, function(err, chart) {
		if (err)
		res.send(err);
	res.json(chart);
	});

});




// POST a Chart =============================================
app.post('/api/postchart', function(req, res, next) {

	Chart.findById(reg.body._id, function(err, res){
		if (res) {
			res.delete();
		}
	});
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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var cors = require('cors');
  
var indexRouter = require('./routes/index');
var tokenSaleRouter = require('./routes/tokenSale');
var kycRouter = require('./routes/kyc');
var profileRouter = require('./routes/profile')
var icoInfoRouter = require('./routes/icoInfo')
var userInfoRouter = require('./routes/userInfo')
var adminRouter = require('./routes/admin')
let config = require('./config/config.json');
var IcoInfo = require('./models/mongoose/icoInfo');

// app init
var app = express();

// mongodb setting
var db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.connect(config.data.mongodb.addr);
db.on('error', console.log.bind(console,'MongoDB connention error :'));
db.once('open', function() {
    console.log('connected to mongod server');
    IcoInfo.getIcoInfo(config.data.icoInfo.tokenString, function (err, icoInfo) {
        if (!err && icoInfo == null) {
            IcoInfo.createIcoInfo(config.data.icoInfo.tokenString, function (err) {
                if (err) {
                    console.log("fail to create IcoInfo");
                } else {
                    console.log("success to create IcoInfo");
                    IcoInfo.initIcoInfo(config.data.icoInfo.tokenString, function (err) {
                        if (err) {
                            console.log("fail to init IcoInfo");
                        } else {
                            console.log("success to init IcoInfo");
                        }
                    });
                }
            });
        }
  });
});

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// log level setting
app.use(logger('dev'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// multi access
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// file upload folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Express Session
app.use(session({
    secret: config.data.session.secret,
    saveUninitialized: true,
    resave: true,
    cookie: {maxAge : 3600000, httpOnly : true}
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// connect custom router
app.use('/', indexRouter);
app.use('/tokenSale', tokenSaleRouter);
app.use('/kyc', kycRouter);
app.use('/profile', profileRouter);
app.use('/icoInfo', icoInfoRouter);
app.use('/userInfo', userInfoRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set Port
//app.set('port', (process.env.PORT || 8888));

app.listen(app.get('port'), function(){
  console.log('Server started on port ' + app.get('port'));
});

module.exports = app;


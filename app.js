var express = require('express');
var compression = require('compression');
var minify = require('express-minify');
var partials = require('express-partials');
var request = require('request');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var controller = require('./routes/controller');
var showupload = require('./routes/showupload');
var Exchange = require('./models/exchange');
var config = require('config');
var fileManager = require('express-file-manager');

var index = require('./routes/index');

var app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/' + config.get('Customer.dbConfig').dbName, { useMongoClient: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression());
app.use(minify());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        autoRemove: 'disabled'
    }),
    secret: config.get('Customer.websiteConfig').secret,
    resave: true,
    unset: 'keep',
    saveUninitialized: true,
    cookie: {
        expires: new Date(253402300000000)
    }
}));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

app.use('/', index);
app.use('/controller', controller);
app.use('/show-upload', showupload);
app.use('/filemanager', fileManager(process.cwd() + '/public/files/', {}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('frontend/error');
});

updateExchange();

function updateExchange() {
    request({
        url: "https://v3.exchangerate-api.com/pair/41cdce23988f2b20d5322d97/EUR/CNY",
        json: true
    }, function (err, response, data) {
        if (err) return err;
        if (data) {
            if (data.result == "success") {
                Exchange.create(data, (err, doc) => {
                    setTimeout(() => {
                        updateExchange();
                    }, 1000 * 3600 * 3);
                });
            }
        }
    });
}

module.exports = app;

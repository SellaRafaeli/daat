

//TODO - add localization
//TODO - load environment config file
//TODO - add stub data(to be selected by the global config file).
//TODO - to fix the dependencies

/**
 * Module dependencies.
 */
var log = function(s){console.log(s);};

var env                = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

var express             = require('express'),
    routes              = require('./routes'),
    $                   = require('jquery'),
    user                = require('./routes/user_api'),
    question            = require('./routes/question_api'),
    answer              = require('./routes/answer_api'),
    http                = require('http'),
    path                = require('path');

//var cfg                 = require('./configuration/' + env + '.json');
//var cfg                 = require('./config/development.json');
//log(cfg);

var app                 = express();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/daat');

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//homepage
app.get("/", function (req, res) {

});

app.get('/users', user.list);

app.get('/questions', question.list);
app.get('/questions/:id', question.get);
app.get('/questions/category/:category_id', question.category);
app.get('/questions/new/:fake_param', question.new_questions);
app.get('/questions/edit/:id', question.edit);
app.get('/questions/update/:id', question.update);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server on port ' + app.get('port') + ' Ready to Rock!');
//  console.log('configurations are ' + cfg);
});

//TODO - add localization
//TODO - add stub data(to be selected by the global config file).

/**
 * Module dependencies.
 */
var log = function(s){console.log(s);};

GLOBAL.ROOT = __dirname;

require(GLOBAL.ROOT + '/init/constants.js');

var env                = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

console.log(GLOBAL.ROOT + 'in' + env);

var express             = require('express'),
    $                   = require('jquery'),
    routes              = require('./app/controllers'),
    user                = require('./app/controllers/user_api'),
    question            = require('./app/controllers/question_api'),
    answer              = require('./app/controllers/answer_api'),
    category            = require('./app/controllers/category_api'),
    i18n                = require('i18next'),
    namespace           = require('express-namespace'),
    http                = require('http'),
    path                = require('path');

var cfg                 = require('./configuration/' + env + '.json');
log(cfg);

var app                 = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://' + cfg.db.mongo.host + '/' + cfg.db.mongo.database );

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('cfg', cfg);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//
//i18n.init({ detectLngQS: 'lang',
//    cookieName: 'locale',
//    preload: ['en-US', 'he'],
//    fallbackLng: 'en-US',
//    saveMissing: true,
//    debug: true,
//    sendMissingTo: 'fallback',
//    useLocalStorage: true,
//    localStorageExpirationTime: 20}, function(t){
//    var x = t("categories_1");
//});
//to make i18n accessible in views
//i18n.registerAppHelper(app);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//homepage
app.get('/', function (req, res) {
});

app.get('/users', user.list);

app.namespace('/questions', function(){
    app.get('/', question.list);
    app.get('/:id', question.get);
    app.get('/category/:category_id', question.category);
    app.get('/tags/:fake_param', question.tags);
    app.post('/new/:fake_param', question.new_questions);
    app.post('/:id/update', question.update);
    app.post('/:id/new_answer', answer.new);
});


app.get('/categories', category.all);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server on port ' + app.get('port') + ' Ready to Rock!');
//  console.log('configurations are ' + cfg);
});

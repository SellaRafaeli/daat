
/**
 * Module dependencies.
 */
var log = function(s){console.log(s);};

var env                = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

var express             = require('express'),
    routes              = require('./routes'),
    user                = require('./routes/user_api'),
    question            = require('./routes/question_api'),
    answer              = require('./routes/answer_api'),
    http                = require('http'),
    path                = require('path');

//var cfg                 = require('./configuration/' + env + '.json');

var app                 = express();

var orm = require('orm');

app.use(orm.express("mysql://root@127.0.0.1/daat", {
    define: function (db, models, next) {
        var question_model =  db.define('questions', {
            id              : Number,
            title           : String,
            text            : String,
            category_id     : Number,
            sub_category_id : Number,
            rating          : Number
        }, {
            methods : {
                fullName: function () {
                    return this.title;
                }
            }
        });
        models.question = question_model;
        next();
    }
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//TODO - add localization
//TODO - load environment config file
//TODO - add stub data(to be selected by the global config file).

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//homepage
//app.get('/', routes.index);
app.get("/", function (req, res) {
//    result = req.models.question.find({id: 4}, function(err, question) {
//        res.json(question[0]);
//    });

    result = req.models.question.find({}, 20, ["rating", "Z"], function(err, questions) {
        res.json(questions);
    });
});

app.get('/users', user.list);

app.get('/questions', question.list);
app.get('/questions/:id', question.get);
app.get('/questions/category/:cat', question.get_cat);
app.get('/questions/new/:name', question.new_question);


app.get('/answers', answer.list);
app.get('/answers/:id', answer.get);
app.get('/answers/question/:question', answer.get_question);
app.get('/answers/new/:name', answer.new_answer);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server on port ' + app.get('port') + ' Ready to Rock!');
//  console.log('configurations are ' + cfg);
});

process.chdir(__dirname);

var resolve = require('path').resolve,
    express = require('express'),
    mongoose = require('mongoose'),
    conf = require(resolve('./init/conf')),
    info = require('debug')('app:info'),
    debug = require('debug')('app:debug'),
    routes = require(resolve('./routes')),
    user = require(resolve('./routes/user_api')),
    question = require(resolve('./routes/question_api')),
    answer = require(resolve('./routes/answer_api')),
    category = require(resolve('./routes/category_api'));

var app = express();

mongoose.connect(conf.mongo.url);

// all environments
app.set('port', conf.frontend.port);
app.set('views', resolve('./views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(conf.frontend.uiEndpoint, express.static(resolve(conf.frontend.static)));

// development only
if ('development' == conf.env) {
    app.use(express.errorHandler());
}

app.get('/users', user.list);

app.get('/questions', question.list);
app.get('/questions/:id', question.get);
app.get('/questions/category/:category_id', question.category);
app.post('/questions/new/', question.new_questions);
//app.get('/questions/edit/:id', question.edit);
app.post('/questions/:id/update', question.update);

app.post('/questions/:id/new_answer', answer.new);

app.get('/categories', category.all);

app.listen(conf.frontend.port, function() {
    debug('Configuration is %s', JSON.stringify(conf));
    info('Server is running at port %d', conf.frontend.port);
});

if (conf.neverDie) {
    process.on('uncaughtException', function(err) {
        info('Process is dead. %s', err);
    });
}

process.on('SIGINT', function() {
    info('Shutting down.');
    process.exit();
});
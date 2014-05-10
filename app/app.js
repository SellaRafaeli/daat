//globals. Settable with GLOBAL.foo from other files.
log   = function(s){console.log(s);};
db    = require("mongojs").connect('daat', ['questions','users']); //http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs
//db    = require("mongojs").connect('mongodb://heroku_app24786346:5u0fans99jq5v4fu3ct0stpre8@dbh23.mongolab.com:27237/heroku_app24786346', ['questions','users']);
env  = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

GLOBAL.ROOT = __dirname;

require(GLOBAL.ROOT + '/init/constants.js');

log('\n\n\n'+Date()+': restarting server.')
log(GLOBAL.ROOT + ' in ' + env);
log('\n');

//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/daat');

var express             = require('express'),
    $                   = require('jquery'),
    users               = require('./routes/user_api'),
    question            = require('./routes/question_api'),
    answer              = require('./routes/answer_api'),
    category            = require('./routes/category_api'),
    http                = require('http'),
    path                = require('path');
    _                   = require('lodash');

//var cfg                 = require('./configuration/' + env + '.json');
//var cfg                 = require('./config/development.json');
//log(cfg);

var app                 = express();

app.use(function(req, res, next) {
    var end = res.end;
    res.end = function(chunk, encoding){
        res.end = end;
        if (chunk) {
            x = 1 //'chunk' will be response.
            //console.log(chunk);
        }
        res.end(chunk, encoding);
    };

    res.on('data', function(){ console.log(100)})
    next();
});

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.all("*", function(req,res,next) { users.ensureUserMiddleware} );
//app.use(function(req, res, next) { log("request from user :"+(req.user || "unknown")); next(); }); //to be used with "ensureUserMiddleware" to log the user
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) { app.use(express.errorHandler()); }

/* routes */

//homepage
app.get("/", function (req, res) { res.redirect('/ui'); });
app.get("/ping", function (req, res) {
    res.send("pong");
});

//questions
app.get('/questions', question.list);
app.get('/questions/:id', question.get );
app.get('/questions/users/:userId', question.user_data );
app.get('/questions/category/:categoryId', question.getByCategory);

app.post('/questions/new/', users.ensureUserMiddleware, question.new_question);
app.post('/questions/:id/addCategory', users.ensureUserMiddleware, question.addCategory);
app.post('/questions/:id/removeCategory', users.ensureUserMiddleware, question.removeCategory);


//answers
app.post('/questions/:id/new_answer', users.ensureUserMiddleware, answer.addAnswerToQuestion);
app.post('/questions/:id/answer/:answerId/toggleUpvote', users.ensureUserMiddleware, answer.toggleUpvote);
app.post('/questions/:id/answer/:answerId/newComment', users.ensureUserMiddleware, answer.addCommentToAnswerToQuestion);

//categories
app.get('/categories', category.all);

//login
app.post('/signup',users.signup);
app.post('/login',users.login);

server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Daat server on port ' + app.get('port') + ' Ready to Rock!');
});

//sockets
if (useSockets = false){
    app.get('/socketSend/:id',function(req,res){
        io.clients[req.params.id].emit('msg','booga');
    });

    var io = require('socket.io').listen(server);
    io.clients = {};
    io.handleSocketMsg = function(data){
        log("got: "+data.toString());
    }
    io.sockets.on('connection', function (socket) {
        socket.emit('msg','got your connection');
        socket.on('register',function(data){
            var id = data.id; //obviously insecure. Should pass authentication.
            io.clients[id] = io.clients[id] || socket; //register him if not registered
            log('registered '+id);
        })
        socket.on('msg', function(data){
            io.handleSocketMsg(data);
            socket.emit('msg','ACK');
        });
    });
}
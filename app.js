//globals. Settable with GLOBAL.foo from other files.
log = function(s){console.log(s);};
db  = require("mongojs").connect('daat', ['questions','users']); //http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs
env = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();
GLOBAL.ROOT = __dirname;
db.questions.find({a:10}, function(res){
    console.log(res)}
);

require(GLOBAL.ROOT + '/init/constants.js');

console.log(GLOBAL.ROOT + ' in ' + env);


//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/daat');

var express             = require('express'),
    $                   = require('jquery'),
    user                = require('./routes/user_api'),
    question            = require('./routes/question_api'),
    answer              = require('./routes/answer_api'),
    category            = require('./routes/category_api'),
    http                = require('http'),
    path                = require('path');

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
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) { app.use(express.errorHandler()); }

/* routes */

//homepage
app.get("/", function (req, res) { res.redirect('/ui'); });

//users
app.get('/users', user.list);

//questions
app.get('/questions', question.list);
app.get('/questions/:id', question.get );
app.post('/questions/new/', question.new_question);
app.get('/questions/category/:category_id', question.category);

app.post('/questions/:id/update', question.update);
app.post('/questions/:id/new_answer', answer.addAnswerToQuestion);
app.post('/questions/:id/answer/:answerId/upvote', answer.upvoteAnswer);
app.post('/questions/:id/answer/:answerId/newComment', answer.addCommentToAnswerToQuestion);

//categories
app.get('/categories', category.all);


server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Daat server on port ' + app.get('port') + ' Ready to Rock!');
});


//sockets
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
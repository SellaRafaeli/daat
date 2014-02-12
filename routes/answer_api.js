var answers = require('../lib/answers/answers.js');

//TODO support comments
//NEW Answer
//Get Answers by Question ID

exports.list = function(req, res){
   res.json(answers.list_top_rated(req, res));
};

exports.get = function(req, res){
    res.send("I am a specific answer by ID");
};

exports.get_answers = function(req, res){
    res.send("I am a list of answers by question id");
};

exports.new_answer = function(req, res){
    res.send("I have just created a new answer (Yeah, right).");
};
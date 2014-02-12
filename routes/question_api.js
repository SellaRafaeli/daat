var questions = require('../lib/questions/questions.js');

//NEW Question
//Get Question by ID
//Get Question By Category


exports.list = function(req, res){
    questions.list_top_rated(req, function(final_result) {
        res.json(final_result);
    });
};

exports.get = function(req, res){
    res.json(questions.fetch_question(req.params.id));
};

exports.category = function(req, res){
    res.json(questions.fetch_question_by_category(req.params));
};

exports.new_question = function(req, res){
    res.json(questions.new_question(req.params));
};
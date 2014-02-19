//TODO - here should be stubbed/real by configuration
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
    questions.fetch_question(req, function(final_result) {
        res.json(final_result);
    });
};

exports.category = function(req, res){
    questions.fetch_question_by_category(req, function(final_result) {
        res.json(final_result);
    });
};

exports.new_questions = function(req, res){
    questions.new_question(req, function(result) {
        res.json(result);
    });
};

exports.edit = function(req, res){
    questions.edit(req, function(result) {
        res.json(result);
    });
};

exports.update = function(req, res){
    questions.update(req, function(result) {
        res.json(result);
    });
};
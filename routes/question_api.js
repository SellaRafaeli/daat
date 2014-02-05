var questions = require('../lib/questions/questions.js');

//NEW Question
//Get Question by ID
//Get Question By Category

exports.list = function(req, res){
    res.send(questions.list_top_rates(req, res));
//    res.json(questions.list_top_rates(req, res));
};

exports.get = function(req, res){
    res.json(questions.fetch_question(req.params.id));
};

exports.get_cat = function(req, res){
    var category = req.params.cat;
    res.json(questions.fetch_question_by_category(req.params, category));
};

exports.new_question = function(req, res){
    res.json(questions.new_question(req.params));
};
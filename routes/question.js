var questions = require('../lib/questions/questions.js');

//NEW Question
//Get Question by ID
//Get Question By Category

exports.list = function(req, res){
    res.json(questions.list_top_rates(req.params));
};

// exports.get = function(req, res){    
//     res.json(questions.fetch_question_by_title(req.params.title));
// };

exports.get_cat = function(req, res){
    var category = req.params.cat;
    res.json(questions.fetch_question_by_category(category));
};

exports.new_question = function(req, res){
    res.json(questions.new_question(req.params));
};
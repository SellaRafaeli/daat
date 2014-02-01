
//NEW Question
//Get Question by ID
//Get Question By Category

exports.list = function(req, res){
    res.send("I am a list of all top rated questions");
};

exports.get = function(req, res){
    res.send("I am a specific question by ID");
};

exports.get_cat = function(req, res){
    res.send("I am a list of questions be category");
};

exports.new_question = function(req, res){
    res.send("I have just created a new question (Yeah, right).");
};
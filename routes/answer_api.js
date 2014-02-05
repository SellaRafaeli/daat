
//NEW Answer
//Get Question by ID
//Get Question By Category

exports.list = function(req, res){
    res.send("I am a list of all top rated answers");
};

exports.get = function(req, res){
    res.send("I am a specific answer by ID");
};

exports.get_question = function(req, res){
    res.send("I am a list of answers be question id");
};

exports.new_answer = function(req, res){
    res.send("I have just created a new answer (Yeah, right).");
};
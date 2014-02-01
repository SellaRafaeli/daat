
//NEW Question
//Get Question by ID
//Get Question By Category

exports.list = function(req, res){
    res.json({
        1: "first question",
        2: "second question",
        3: "third question",
        4: "forth question"
    });
};

exports.get = function(req, res){

    res.json({
        1: "first question"
    });
};

exports.get_cat = function(req, res){
    var category = req.params.cat;
    res.json({
        1: "first question in category " + category,
        2: "second question in category " + category,
        3: "third question in category " + category,
        4: "forth question in category " + category
    });
};

exports.new_question = function(req, res){
    res.json({result: "I have just created a new question (Yeah, right).", error: undefined});
};
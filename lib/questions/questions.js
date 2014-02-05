
//id
//title             VARCHAR(250)
//text              TEXT
//category_id       INT(11)
//sub_category_id   INT(11)
//rating(1-1000)    INT(11) ? should be more ?


//TODO - create a fan in system for show_in_homepage +  push up (don't create in this model)
//TODO - create a picture + video upload model (don't create in this model)
//TODO - create an index on rating. maybe on sub_category
//TODO - create a cache warmer for top rating in each category / sub category

//includes
var START_RATING = 400;

exports.list_top_rates = function(req, res) {
    var limit  = req.limit || 20;
    var final_result = {"1": {}};

    //Z means descending
    req.models.question.find({}, limit, ["rating", "Z"], function(err, questions) {
        final_result = questions;
    });

    return final_result;
//    return {
//        1: "first question , limit is " + limit,
//        2: "second question",
//        3: "third question",
//        4: "forth question"
//    }
};


exports.fetch_question = function(id) {

    var final_result = {"1": {}};
    req.models.question.find({id: id}, 1, function(err, questions) {
        final_result = questions;
    });

    return final_result;
//    {
//        1: "first question"
//    }
};


exports.fetch_question_by_category = function(request_params) {
    var sub_category_id = request_params.sub_category_id || null;
    var category_id     = request_params.category_id || null;
    var limit       = request_params.limit || 20;

    req.models.question.find({category_id: category_id, sub_category_id: sub_category_id}, limit, function(err, questions) {
        final_result = questions;
    });

    return final_result;
//    {
//        1: "first question in category " + category + " limit is " + limit,
//        2: "second question in category " + category,
//        3: "third question in category " + category,
//        4: "forth question in category " + category
//    }
};

exports.new_question = function(request_params) {
    //TODO - validation before save
    var title               = request_params.title,
        text                = request_params.text,
        category_id         = request_params.category_id,
        sub_category_id     = request_params.sub_category_id;

    var final_result        = {};
    req.models.question.create(
        [{
            title                : title,
            text                 : text,
            category_id         : category_id,
            sub_category_id     : sub_category_id,
            rating               : START_RATING
        }] , function (err, items) {
            // err - description of the error or null
            // items - array of inserted items
            final_result = {error: err, items: items}
        });
    return final_result;
    //return {result: "I have just created a new question (Yeah, right).", error: undefined}
};

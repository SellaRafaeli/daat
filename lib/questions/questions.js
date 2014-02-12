
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

exports.list_top_rated = function(req, callback) {
    var limit  = req.limit || 20;

    //Z means descending
    req.models.question.find({}, limit, ["rating", "Z"], function(err, questions) {
        callback(questions);
    });

//    return {
//        1: "first question , limit is " + limit,
//        2: "second question",
//        3: "third question",
//        4: "forth question"
//    }
};


exports.fetch_question = function(req, callback) {
    //TODO - validate req

    req.models.question.get(req.params.id, function(err, questions) {
        callback(questions);
    });
//    {
//        1: "first question"
//    }
};


exports.fetch_question_by_category = function(req, callback) {
    var limit           = req.query['limit'] || 20;
    var query_hash = build_category_query(req);
    req.models.question.find(query_hash, limit, function(err, questions) {
        callback(questions);
    });

//    {
//        1: "first question in category " + category + " limit is " + limit,
//        2: "second question in category " + category,
//        3: "third question in category " + category,
//        4: "forth question in category " + category
//    }
};

exports.new_question = function(req, callback) {
    //TODO - validation before save - current user + ??.
    var title               = req.query['title'],
        text                = req.query['text'],
        category_id         = req.query['category_id'],
        sub_category_id     = req.query['sub_category_id'];
    //TODO data validations
//    validation =
//    if (validation['error'] ){
//        callback(validation['result'])
//    }

//    var result = create_new_question(req, title, text, category_id, sub_category_id);
//    callback(result);
    req.models.question.create(
        [{
            title                : title,
            text                 : text,
            category_id          : category_id,
            sub_category_id      : sub_category_id,
            rating               : START_RATING
        }] , function (err, items) {
            // err - description of the error or null
            // items - array of inserted items
            callback({error: err, items: items});
        });

};

exports.edit_question = function(request_params) {
    return {result: "I have just edited your question (Yeah, right).", error: undefined}
};

function build_category_query(req) {
    var category_id     = req.params.category_id;
    var sub_category_id = req.query['sub_category_id'] || null;

    var query           = {category_id: category_id};
    //TODO - append sub_category_id if needed
//    if (sub_category_id != null) {
//        $.extend(query, {sub_category_id: sub_category_id});
//    };
//    console.log(query);
    return query;
}


function create_new_question(req, title, text, category_id, sub_category_id, callback){
    req.models.question.create(
        [{
            title                : title,
            text                 : text,
            category_id          : category_id,
            sub_category_id      : sub_category_id,
            rating               : START_RATING
        }] , function (err, items) {
            // err - description of the error or null
            // items - array of inserted items
            console.log(err);
            console.log(items);
            callback({error: err, items: items});
        });
}



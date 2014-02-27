var Question            = require(GLOBAL.ROOT + '/app/models/question.js');
var question_helper     = require(GLOBAL.ROOT + '/app/helpers/questions_helper.js');

//TODO - create a fan in system for show_in_homepage +  push up (don't create in this model)
//TODO - create a picture + video upload model (don't create in this model)
//TODO - create an index on rating. maybe on sub_category
//TODO - create a cache warmer for top rating in each category / sub category


exports.list_top_rated = function(req, callback) {
    var limit  = req.limit || 20;

    Question.find({}).sort({'rating': -1}).limit(limit).exec(function(err, questions) {
        callback(questions);
    });
};


exports.fetch_question = function(req, callback) {
    //TODO - validate req

    Question.findOne({'_id': req.params.id}, function(err, questions) {
        callback(questions);
    });
};

exports.fetch_question_by_category = function(req, callback) {
    var limit           = req.query['limit'] || 20;
    var query_hash      = question_helper.build_category_query(req);
    Question.find(query_hash).limit(limit).exec(function(err, questions) {
        callback(questions);
    });
};

exports.new_question = function(req, callback) {
    //TODO - validation before save - current user + ??.
    var title               = req.body['title'],
        text                = req.body['text'],
        category_id         = req.body['category_id'],
        sub_category_id     = req.body['sub_category_id'],
        tags                = req.body['tags'];
    //TODO data validations
//    validation =
//    if (validation['error'] ){
//        callback(validation['result'])
//    }

    var result = create_new_question(req, title, text, category_id, sub_category_id, tags);
    callback(result);
};

exports.update = function(req, callback) {

    var title               = req.body['title'],
        text                = req.body['text'],
        category_id         = req.body['category_id'],
        sub_category_id     = req.body['sub_category_id'],
        tags                = req.body['tags'];

    callback(update_question(req, title, text, category_id, sub_category_id, tags, callback));
};

exports.tags = function(req, callback) {
    var cfg     = req.app.get('cfg');
    var result  = [];
    var tags    = req.query['tags'];

    if (cfg.globals.skip_elastic_search){
        result = direct_tags_search_in_db(tags);
    } else {
        result = elastic_search_tags(tags);
    }

    callback(result);

};


function create_new_question(req, title, text, category_id, sub_category_id, tags, callback){
    new Question({title:            title,
                    text:             text,
                    category_id:      category_id,
                    tags:             tags,
                    rating:           GLOBAL.START_QUESTION_RATING
                }).save();
            };

//http://dreamerslab.com/blog/en/write-a-todo-list-with-express-and-mongodb/
function update_question(req, title, text, category_id, sub_category_id, tags, callback){
    Question.findById(req.params.id, function ( err, question ){
        if(question_helper.is_full(title))              { question.title                = title; }
        if(question_helper.is_full(text))               { question.text                 = text; }
        if(question_helper.is_full(category_id))        { question.category_id          = category_id; }
        if(question_helper.is_full(sub_category_id))    { question.sub_category_id      = sub_category_id; }
        if(question_helper.is_full(tags))               { question.tags                 = tags; }

        if(question !== undefined){
            question.save( function ( err, question, count ){
                //TODO - wait for a response ?
            });
        }
    });
    return "saved!";
};


function direct_tags_search_in_db(tags){
    var final_results = [];
    for (var i=0; i<tags.length; ++i) {
        var tag = tags[i];
        Question.find({tags: tag}).exec(function(err, questions) {
            final_results.push(questions);
            if (i == tags.length -1 ){
              return final_results;
            }
        });
    }
};

function elastic_search_tags(tags){
    []
}



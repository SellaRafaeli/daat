var resolve = require('path').resolve,
    Question = require(resolve('./app/models/question.js'));

exports.list_top_rated = function(req, callback) {
    var limit = req.limit || 20;

    //Z means descending
    var queriedFields = req.query || {};

    Question.find(queriedFields).sort({
        'rating': -1
    }).limit(limit).exec(function(err, questions) {
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

    Question.findOne({
        '_id': req.params.id
    }, function(err, questions) {
        callback(questions);
    });
    //    {
    //        1: "first question"
    //    }
};

exports.fetch_question_by_category = function(req, callback) {
    var limit = req.query['limit'] || 20;
    var query_hash = build_category_query(req);
    Question.find(query_hash).limit(limit).exec(function(err, questions) {
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
    console.log(req.body);
    var title = req.body['title'],
        text = req.body['text'],
        category_id = req.body['category_id'],
        sub_category_id = req.body['sub_category_id'],
        tags = req.body['tags'];
    userId = req.body['userId'];
    //TODO data validations
    //    validation =
    //    if (validation['error'] ){
    //        callback(validation['result'])
    //    }

    var result = create_new_question(req, title, text, category_id, sub_category_id, tags, userId);
    callback(result);
};

exports.edit = function(req, callback) {
    callback({
        result: "Here is the params for the questions you want to edit (Yeah, right).",
        error: undefined
    });
};

exports.update = function(req, callback) {

    var title = req.body['title'],
        text = req.body['text'],
        category_id = req.body['category_id'],
        sub_category_id = req.body['sub_category_id'],
        tags = req.body['tags'];

    callback(update_question(req, title, text, category_id, sub_category_id, tags, callback));

    //    callback({result: "I have just updated your question (Yeah, right).", error: undefined});
};

exports.tags = function(req, callback) {
    //TODO should be from a search engine. elastic search.
};

function build_category_query(req) {
    var category_id = req.params.category_id;
    var sub_category_id = req.query['sub_category_id'] || null;

    var query = {
        category_id: category_id
    };
    //TODO - append sub_category_id if needed
    //    if (sub_category_id != null) {
    //        $.extend(query, {sub_category_id: sub_category_id});
    //    };
    //    console.log(query);
    return query;
};


function create_new_question(req, title, text, category_id, sub_category_id, tags, userId, callback) {
    new Question({
        title: title,
        text: text,
        category_id: category_id,
        tags: tags,
        rating: GLOBAL.START_QUESTION_RATING,
        userId: userId
    }).save();
};

//http://dreamerslab.com/blog/en/write-a-todo-list-with-express-and-mongodb/
function update_question(req, title, text, category_id, sub_category_id, tags, callback) {
    Question.findById(req.params.id, function(err, question) {
        if (is_full(title)) {
            question.title = title;
        }
        if (is_full(text)) {
            question.text = text;
        }
        if (is_full(category_id)) {
            question.category_id = category_id;
        }
        if (is_full(sub_category_id)) {
            question.sub_category_id = sub_category_id;
        }
        if (is_full(tags)) {
            question.tags = tags;
        }

        if (question !== undefined) {
            question.save(function(err, question, count) {
                //TODO - wait for a response ?
            });
        }
    });
    return "saved!";
};

function is_full(item) {
    if (typeof(item) == "undefined") {
        return false
    }
    return true;
};
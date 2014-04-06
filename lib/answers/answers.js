var resolve = require('path').resolve,
    Question = require(resolve('./app/models/question.js'));

exports.create_and_attach_new_answer = function(req, callback) {
    //find the question or get it from the client (send to worker)?
    questions.fetch_question(req, function(q) {
        if (typeof(q) == "undefined") {
            return {
                'response': 'question not found'
            }
        }

        new_question = new_question_object(req);
        q.answers.push(new_question);
        q.save();
        callback(q);
    });
};

function new_question_object(req) {
    console.log(req.body);
    //todo - start status should be according to user and other rules
    return {
        status: GLOBAL.ACTIVE,
        text: req.body['answer_text'],
        rating: GLOBAL.START_ANSWER_RATING,
        comments: []
    }
};
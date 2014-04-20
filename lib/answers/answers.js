var questions    = require(GLOBAL.ROOT + '/lib/questions/questions.js');

exports.create_and_attach_new_answer = function(req, callback) {
    questions.fetch_question(req, function(q) {
        newAnswer = makeNewAnswer(req);
        q.answers = q.answers || {};
        q.answers.push(newAnswer);
        q.save();
        callback(q);
    });
};

exports.create_and_attach_new_comment = function(req, callback) {
    questions.fetch_question(req, function(q) {
        q.answers[req.params['answerId']] = "new comment"
        q.save();
        callback(q);
    });
};

function makeNewAnswer(req){
    return {
            text            : req.body['answer_text'],
            comments        : {},
            id              : (new Date()).getTime().toString(36)
            }
};
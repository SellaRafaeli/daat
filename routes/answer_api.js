//NEW Answer
//Get Answers by Question ID

exports.addToQuestion = function(req, res){
    var qID = req.params['id'];
    var newAnswer = makeNewAnswer(req);

    var findCrit = {id: qID};
    var setCrit = {};
        setCrit["answers."+newAnswer.id] = newAnswer;

    db.questions.update(findCrit, {"$set": setCrit}, function(err,results) {
        res.json({msg: "ok"});
    });
};

exports.newComment = function(req, res){
    qID = req.params['id']
    aID = req.params['answerId']
    var findCrit = {id: qID};
    var setCrit = {};
    db.questions.update(findCrit,{"$set": setCrit}
    answers.create_and_attach_new_comment(req, function(resp){
        res.json(resp);
    });
};

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

/* helpers */

function makeNewAnswer(req){
    return {
        text            : req.body['answer_text'],
        comments        : {},
        id              : (new Date()).getTime().toString(36)
    }
};

function makeNewComment(req){
    return {
        text            : req.body['answer_text'],
        comments        : {},
        id              : (new Date()).getTime().toString(36)
    }
}
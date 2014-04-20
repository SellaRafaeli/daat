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
    var qID = req.params['id'];
    var aId = req.params['answerId'];
    var newComment = makeNewComment(req);
    var findCrit = {id: qID};
    var setCrit = {};
        setCrit["answers."+aId+".comments."+newComment.id] = newComment;

    db.questions.update(findCrit,{"$set": setCrit}, function(err,results) {
        res.json({"msg": "okComment"});
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
        text            : req.body['comment'],
        id              : (new Date()).getTime().toString(36)
    }
}
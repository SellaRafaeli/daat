exports.addAnswerToQuestion = function(req, res){
    var qID = parseInt(req.params['id']);
    var newAnswer = makeNewAnswer(req);
    addAnswerToQuestion(qID, newAnswer, res);
};

exports.upvote = function(req, res){
    var qid = parseInt(req.params.id);
    var aid = req.params.answerId;
    //var voterId = req.user._id;
    var voterUserObj = req.user;
    upvoteAnswer(qid, aid, voterUserObj, res);
};


exports.addCommentToAnswerToQuestion = function(req, res){
//    var qID = req.params['id'];
//    var aId = req.params['answerId'];
//    var newComment = makeNewComment(req);
//    //var findCrit = {id: qID};
//    findCrit = "this.id =="+qID;
//    var setCrit = {};
//        setCrit["answers."+aId+".comments."+newComment.id] = newComment;
//
//    db.questions.update(findCrit,{"$set": setCrit}, function(err,results) {
//        res.json({"msg": "okComment"});
//    });
};


//exports.upvoteComment = function(req, res) {
//    var qID = req.params['id'];
//    var aId = req.params['answerId'];
//    var findCrit = {id: qID};
//    var setCrit = {};
//        setCrit["answers."+aId+".comments."+newComment.id+".upvotes"] = 1;
//
//    db.questions.update({id: req.params['id']},{ "$inc": { upvotes: 1}})
//}
//exports.create_and_attach_new_answer = function(req, callback) {
//    questions.fetch_question(req, function(q) {
//        newAnswer = makeNewAnswer(req);
//        q.answers = q.answers || {};
//        q.answers.push(newAnswer);
//        q.save();
//        callback(q);
//    });
//};
//
//exports.create_and_attach_new_comment = function(req, callback) {
//    questions.fetch_question(req, function(q) {
//        q.answers[req.params['answerId']] = "new comment"
//        q.save();
//        callback(q);
//    });
//};

/* helpers */

function upvoteAnswer(qid,aid,voterUserObj,res){
    var findCrit = {id:qid};
    //var findCrit = "this.id == "+qid;
    //var userId = req.user._id;
    var voterId = voterUserObj._id;
    var setCrit = {};
    setCrit["answers."+aid +".upvoters."+voterId] = {name: voterUserObj.fullName};
    db.questions.update(findCrit,{"$set": setCrit}, function(err, result) {
        res.json({msg: "added upvote"});
    });
}

function addAnswerToQuestion(questionID,newAnswer, res) {
    var findCrit = {id: questionID};
    //var findCrit = "this.id == "+qID;
    var setCrit = {};
    setCrit["answers."+newAnswer.id] = newAnswer;

    db.questions.update(findCrit, {"$set": setCrit}, function(err, result) {
        res.json({msg: "added answer"});
    });
}

function makeNewAnswer(req){
    return {
        text            : req.body['answer_text'],
        username : req.user.fullName,
        comments        : {},
        id              : nextAnswerId(),
        upvoters        : {}
    }
};

function makeNewComment(req){
    return {
        text            : req.body['comment'],
        id              : (new Date()).getTime().toString(36)
    }
}

function setHighAnswerId(){
    highestQuestionId = db.questions.find().sort({id:-1}).limit(1);
    isNaN(highestQuestionId) ? highestQuestionId = 0 : "";
}

function nextAnswerId(){ var id = ++highestQuestionId; return id.toString(); }

setHighAnswerId();

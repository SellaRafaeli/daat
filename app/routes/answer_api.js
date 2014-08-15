exports.addAnswerToQuestion = function(req, res){
    var qID = parseInt(req.params['id']);
    var newAnswer = makeNewAnswer(req);

    addAnswerToQuestion(qID, newAnswer, res);
    //response has been returned
    addBioToUser(newAnswer.owner.id, newAnswer.owner.bio);
    updateQuestionModifyTime(qID);

};

exports.toggleUpvote = function(req, res){
    var qid = parseInt(req.params.id);
    var aid = parseInt(req.params.answerId);
    var alreadyUpvoted = req.body.alreadyUpvoted;
    //var voterId = req.user._id;
    var voterUserObj = req.user;

    toggleUpvoteAnswer(qid, aid, voterUserObj, alreadyUpvoted, res);
};

exports.updateText = function(req,res){
    log("in update text");
    var qid = parseInt(req.params.id);
    var aid = parseInt(req.params.answerId);
    var newText = req.body.newText;
    //the $ in answers.$.text means "the array element that answered the query". See http://docs.mongodb.org/manual/reference/operator/update/positional/
    db.questions.update({_id : qid, "answers.id":aid} , {$set: {"answers.$.text": newText}}, function(){res.json({msg: "updated text"})});
}

exports.addCommentToAnswerToQuestion = function(req, res){
    x =1
    var qid = parseInt(req.params.id);
    var aid = parseInt(req.params.answerId);
    var newComment = makeNewComment(req);
    db.questions.update({_id : qid, "answers.id":aid} , {$push: {"answers.$.comments": newComment}}, function(){ res.json({msg: "added comment"})});

    //email owner it. Note client may have been released. TODO: extract to worker and do not in Node...
    db.questions.findOne({_id: qid}, function(e, q){
        answer = _.find(q.answers, function(a){return (a.id == aid)});
        db.users.findOne({_id: answer.owner.id}, function(e, u){
            var email = u.fbData.email || u.fbData.username+"@facebook.com";
            var subj = req.user.fullName+" just commented on your answer on Daat to the question: "+ q.title;
            var body = subj+"...the comment was: "+newComment.text+". You can view it here: http://fathomless-crag-3321.herokuapp.com/ui/#/questions/"+qid;

            mailer.send_email_1(email,subj,body);
        });

    })
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


function toggleUpvoteAnswer(qid,aid,voterUserObj, alreadyUpvoted, res){
    var userID = voterUserObj._id;
    if (alreadyUpvoted) {
        db.questions.update({_id : qid, "answers.id":aid} , {$pull: {"answers.$.upvoters": {_id: userID}}}, function(){res.json({msg: "ok"})});
    } else {
        db.questions.update({_id : qid, "answers.id":aid} , {$addToSet: {"answers.$.upvoters": voterUserObj}}, function(){res.json({msg: "ok"})});
    }
}

//function addAnswerToQuestionOld(questionID,newAnswer, res) {
//    var findCrit = {id: questionID};
//    //var findCrit = "this.id == "+qID;
//    var setCrit = {};
//    setCrit["answers."+newAnswer.id] = newAnswer;
//
//    db.questions.update(findCrit, {"$set": setCrit}, function(err, result) {
//        res.json({msg: "added answer"});
//    });
//}

function addAnswerToQuestion(questionID,newAnswer, res) {
    db.questions.update({_id: questionID}, {"$push": {answers: newAnswer}}, function(err, result) {
        res.json({msg: "added answer"});
    });
}

function addBioToUser(userId, bio) {
    db.users.update({_id:userId},{"$push": {bios: bio}});
}

function updateQuestionModifyTime(qid){
    db.questions.update({_id:qid},{"$set": {"dateModified": new Date()}},function(){});
}

function makeNewAnswer(req){
    return {
        text            : req.body['answer_text'],
        owner :         {fullName: req.user.fullName,
                         id: req.user._id,
                         bio: req.body.bio,
                         imgLnk: req.user.imgLnk
        },
        comments        : [],
        id              : nextAnswerId(),
        upvoters        : [],
        dateAdded       : new Date()
}
    };

function makeNewComment(req){
    return {
        text            : req.body['comment'],
        id              : (new Date()).getTime().toString(36),
        owner           : {id: req.user._id, fullName: req.user.fullName, imgLnk: req.user.imgLnk},
        dateAdded       : new Date()
    }
}

(nextAnswerId = function (){
    if (typeof highestAnswerId != 'undefined') {
        ++highestAnswerId
        console.log("set answerId at "+highestAnswerId);
        return highestAnswerId;
    } else {
        db.questions.distinct('answers', function(err,res) {
            var ids = _.map(res,function(item){ return item.id});
            var max = Math.max.apply(Math, ids);
            highestAnswerId = parseInt(max);
            isNaN(highestAnswerId) ? highestAnswerId=1 : "";
            console.log("set highestAnswerId at "+highestAnswerId);
        });
    }
})()

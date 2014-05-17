exports.get = function(req, res){
    var criteria = {'id': parseInt(req.params.id)};
    db.questions.findOne(criteria, cbj(res) );
};

exports.user_data = function(req, res){
    var userId = parseInt(req.params.userId);
    getUserContent(userId, cbj(res))
}

exports.newest = function(req, res){
    //db.questions.find({}, cbj(res) );
    var NUM_QUESTIONS_RETURNED_EACH_TIME = 5;
    var query = {};
    var opts = { "sort": {"dateModified": -1}, "limit": NUM_QUESTIONS_RETURNED_EACH_TIME };

    req.query.sinceDate ? query['dateModified'] = {"$lt" : new Date(req.query.sinceDate)} : '';
    db.questions.find(query,{},opts,cbj(res));
};

//exports.newest = function (req, res) {
//    db.questions.findOne({},cbj(res));
//    return;
//    var dateSinceString = req.query.sinceDate || "2014-05-12T16:12:28.632Z";
//    var dateSinceObj = new Date(dateSinceString);
//    var options = {"sort": {"dateModified": 1}, "limit": 5}
//    db.questions.find({"dateModified": {"$gt": dateSinceObj }},options,cbj(res));
//}

exports.getByCategory = function(req, res){
    var catName = req.params.categoryId;
    db.questions.find({"categories": {"$in": [catName]}}, cbj(res));
};

exports.getRelatedQuestions = function(req,res){
    var categories = array(req.query.categories);
    db.questions.find({"categories": {"$in": categories}}, cbj(res));
}

exports.new_question = function(req, res){
    var newQuestion = {
        id                  : getQuestionId(),
        title               : req.body['title'],
        text                : req.body['text'],
        userId              : req.user._id,
        username            : req.user.fullName,
        answers             : [],
        upvoters            : [],
        categories          : req.body.categories || [],
        dateModified        : new Date()
    }

    db.questions.save(newQuestion, cbj(res) );
};

exports.setCategories = function(req,res){
    var id = parseInt(req.params.id);
    var cats = array(req.body.categories);
    db.questions.update({id: id}, {"$set": {categories: cats}}, function(err, result) {
        res.json({msg: "set categories!"});
    });
}

//exports.addCategory = function(req, res) {
//    var id = parseInt(req.params.id);
//    db.questions.update({id: id}, {"$push": {categories: req.body.categoryName}}, function(err, result) {
//        res.json({msg: "added category"});
//    });
//}
//
//exports.removeCategory = function(req, res) {
//    var id = parseInt(req.params.id);
//    db.questions.update({id: id}, {"$pull": {categories: req.body.categoryName}}, function(err, result) {
//        res.json({msg: "removed category"});
//    });
//}

/* helpers */
function getUserContent(userId, cb) {
    db.questions.find({"answers.owner.id": userId}, cb);
}



//call-back json
var cbj = function(responseObj){
    return function(err, result) {
        responseObj.json(result);
    }
}

function setHighQuestionId(){
    db.questions.find({},{"sort": "id"}, function(err, results){
        highestQuestionId = (results && results.length) ? results.pop().id : 1;
        isNaN(highestQuestionId) ? highestQuestionId = 0 : "";
        console.log("set high question id at "+highestQuestionId);
    })

}

function getQuestionId() {
    var id = ++highestQuestionId;
    console.log("next question id is "+id);
    return id;
}

setHighQuestionId();
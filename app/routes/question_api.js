exports.get = function(req, res){
    var criteria = {'id': parseInt(req.params.id)};
    db.questions.findOne(criteria, cbj(res) );
};

exports.user_data = function(req, res){
    var userId = parseInt(req.params.userId);
    getUserContent(userId, cbj(res))
}
//find all
exports.list = function(req, res){
    db.questions.find({}, cbj(res) );
};

exports.getByCategory = function(req, res){
    var catName = req.params.categoryId;
    db.questions.find({"categories": {"$in": [catName]}}, cbj(res));
};


exports.new_question = function(req, res){
    var newQuestion = {
        id                  : getQuestionId(),
        title               : req.body['title'],
        text                : req.body['text'],
        category_id         : req.body['category_id'],
        sub_category_id     : req.body['sub_category_id'],
        tags                : req.body['tags'],
        userId              : req.user._id,
        username            : req.user.fullName,
        answers             : [],
        upvoters            : [],
        categories          : []
    }

    db.questions.save(newQuestion, cbj(res) );
};

exports.addCategory = function(req, res) {
    var id = parseInt(req.params.id);
    db.questions.update({id: id}, {"$push": {categories: req.body.categoryName}}, function(err, result) {
        res.json({msg: "added category"});
    });
}

exports.removeCategory = function(req, res) {
    var id = parseInt(req.params.id);
    db.questions.update({id: id}, {"$pull": {categories: req.body.categoryName}}, function(err, result) {
        res.json({msg: "removed category"});
    });
}

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
    })

}

function getQuestionId() {
    var id = ++highestQuestionId;
    console.log("next question id is "+id);
    return id;
}

setHighQuestionId();
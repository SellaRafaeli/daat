exports.get = function(req, res){
    var criteria = {'id': parseInt(req.params.id)};
    db.questions.findOne(criteria, cbj(res) );
};


exports.list = function(req, res){
    db.questions.find({}, cbj(res) );
};

exports.category = function(req, res){
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
        answers             : {},
        upvoters            : {}
    }

    db.questions.save(newQuestion, cbj(res) );
};


/* helpers */

//call-back json
var cbj = function(responseObj){
    return function(err, result) {
        responseObj.json(result);
    }
}

function setHighQuestionId(){
    highestQuestionId = db.questions.find().sort({id:-1}).limit(1);
    isNaN(highestQuestionId) ? highestQuestionId = 0 : "";
}

function getQuestionId(){ var id = ++highestQuestionId; return id; }

setHighQuestionId();

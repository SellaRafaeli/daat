exports.list = function(req, res){
    db.questions.find({}, cbj(res) );
};

exports.get = function(req, res){
    var criteria = {'id': req.params.id}
    db.questions.findOne(criteria, cbj(res) );
};

exports.category = function(req, res){
};

exports.new_question = function(req, res){
    var newQuestion = {
        id                  : (new Date()).getTime().toString(36),
        title               : req.body['title'],
        text                : req.body['text'],
        category_id         : req.body['category_id'],
        sub_category_id     : req.body['sub_category_id'],
        tags                : req.body['tags'],
        userId              : req.body['userId'],
        answers             : {}

    }

    db.questions.save(newQuestion, cbj(res) );
};

exports.update = function(req, res){
};

/* helpers */

//call-back json
var cbj = function(responseObj){
    return function(err, result) {
        responseObj.json(result);
    }
}

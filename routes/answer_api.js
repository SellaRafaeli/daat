var answers      = require(GLOBAL.ROOT + '/lib/answers/answers.js');

//TODO support comments
//NEW Answer
//Get Answers by Question ID

exports.new = function(req, res){
    answers.create_and_attach_new_answer(req, function(resp){
        res.json(resp);
    });

//    callback({'result': 'I have just created a new answer (Yeah, right).'});
};

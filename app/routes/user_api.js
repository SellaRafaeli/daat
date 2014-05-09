/* USERS */

exports.list = function(req, res){
  res.send("respond with a resource111");
};

exports.signup = function(req,res) { // signup requires no password - just email. 
    var email = req.body.email;
    var password = req.body.password; 
    var fullName = req.body.fullName;
    var authToken = makeAuthToken();

    db.users.findOne({email: email}, function(err, user){
        if (user) { 
            //res.statusCode = 401;  //return this when client handles 400 msgs
            res.json({msg: "User already exists."}); 
        }        
        else {
            db.users.save({_id: nextUserId(),
                            email: email,
                            password: password,
                            fullName: fullName,
                            authToken: authToken,
                            bios: []
                            }, function(err, user) {
                var ans = err || user;
                res.json(ans);
            });
        }//end else
    }); //end findOne
};

exports.login = function(req, res) {

    var email = req.body.email;
    var password = req.body.password || res.json({msg: "No password supplied."}); //no login without password

    db.users.findOne({email: email, password: password}, function(err, user){
        user ? res.json(user) : res.json({msg: "Wrong credentials."});
    }); //end findOne    
}
  
exports.ensureUserMiddleware = function(req, res, next) {
    
    var authToken = req.query.authToken || req.body.authToken;    
    db.users.findOne({authToken: authToken}, function(err, user){
        if (user){
            req.user = user;            
            next();
        } else {
            res.json({msg: "Missing valid authToken for user."});                    
        }        
    }); 
}

/* Helpers */ 

function makeAuthToken(){
    return Math.random().toString(36).substring(7); 
}

//function setHighUserId(){
//    highestQuestionId = db.questions.find().sort({id:-1}).limit(1);
//    isNaN(highestQuestionId) ? highestQuestionId = 0 : "";
//}

//function nextUserId(){ var id = ++highestQuestionId; return id.toString(); }

(nextUserId = function (){
    if (typeof highestUserId != 'undefined') {
        ++highestUserId;
        console.log("set UserId at "+highestUserId);
        return highestUserId;
    } else {
        db.users.find({},{"sort": "_id"}, function(err, results){
            highestUserId = parseInt(results.pop()._id)+1;
            isNaN(highestUserId) ? highestUserId = 0 : "";
            log("found highest UserId at"+highestUserId);
        })
    }
})()


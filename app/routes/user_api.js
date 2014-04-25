/* USERS */

exports.list = function(req, res){
  res.send("respond with a resource111");
};

exports.signup = function(req,res) { // signup requires no password - just email. 
    var email = req.body.email;
    var password = req.body.password; 
    var authToken = makeAuthToken();

    db.users.findOne({email: email}, function(err, user){
        if (user) { 
            //res.statusCode = 401;  //return this when client handles 400 msgs
            res.json({msg: "User already exists."}); 
        }        
        else {
            db.users.save({email: email, password: password, authToken: authToken}, function(err, user) {
                res.json(user);
            });
        }//end else
    }); //end findOne
};

exports.login = function(req, res) {

    var email = req.body.email;
    var password = req.body.password || res.json({msg: "No password supplied."}); //no login without password

    db.users.findOne({email: email, password: password}, function(err, user){
        user ? res.json({email: user.email, authToken: user.authToken}) : res.json({msg: "Wrong credentials."});        
    }); //end findOne    
}
  
function makeAuthToken(){
    return Math.random().toString(36).substring(7); 
}
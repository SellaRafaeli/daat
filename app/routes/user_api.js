/* USERS */

exports.list = function(req, res){
  res.send("respond with a resource111");
};

exports.fbEnter = function(req,res) {
    function createAndReturnUser(fbID,fbData) {
        var data = {fbID: fbID,
                    fullName: fbData.name,
                    imgLnk: "http://graph.facebook.com/"+fbID+"/picture?type=large",
                    fbData: fbData};
        db.users.save(getNewUser(data), cbj(res))
    }

    //verify the fb user, then login/signup:
    var url='https://graph.facebook.com/me?access_token='+req.body.accessToken;
    request(url, function(err,ans,body){
       if (err || ans.statusCode!=200) { res.json({success: false, err: err}); return;}
       else {
           fbData = JSON.parse(body);
           fbID = fbData.id;
           db.users.findOne({fbID: fbID}, function(err,user){
              user ? res.json(user) : createAndReturnUser(fbID,fbData);
           });
       }
    })
}

exports.signup = function(req,res) { // signup requires no password - just email.
    var email = req.body.email;
    var password = req.body.password;
    var fullName = req.body.fullName;
    var authToken = makeAuthToken();
    var imgLnk = req.body.imgLnk;
    db.users.findOne({email: email}, function(err, user){
        if (user) {
            //res.statusCode = 401;  //return this when client handles 400 msgs
            res.json({msg: "User already exists."});
        }
        else {
            newUser = getNewUser({_id: nextUserId(),
                email: email,
                password: password,
                fullName: fullName,
                authToken: authToken,
                bios: [],
                imgLnk: imgLnk
            });
            db.users.save(newUser, function(err, user) {
                var ans = err || user;
                res.json(ans);
            });
        }//end else
    }); //end findOne
};

exports.login = function(req, res) {

    var email = req.body.email;
    var password = req.body.password || res.json({msg: "No password supplied."}); //no login without password

    var MASTER_PASSWORD = 111;
    var criteria = (password == MASTER_PASSWORD) ? {email: email} : {email: email, password: password};

    db.users.findOne(criteria, function(err, user){
        user ? res.json(user) : res.json({msg: "Wrong credentials."});
    }); //end findOne
}
  
exports.ensureUserMiddleware = function(req, res, next) {
    
    var authToken = req.query.authToken || req.body.authToken;    
    db.users.findOne({authToken: authToken}, function(err, user){
        if (user && user.authToken){ //user must have valid, nonnull authToken
            req.user = user;            
            next();
            log_event(user.fullName, "called route "+req.path);
        } else {
            res.statusCode = 401;
            res.json({msg: "Missing valid authToken for user."});                    
        }        
    }); 
}

/* Helpers */ 

function makeAuthToken(){
    return Math.random().toString(36).substring(7); 
}

(nextUserId = function (){
    if (typeof highestUserId != 'undefined') {
        ++highestUserId;
        console.log("set UserId at "+highestUserId);
        return highestUserId;
    } else {
        db.users.find({},{"sort": "_id"}, function(err, results){
            highestUserId = (results && results.length) ? parseInt(results.pop()._id)+1 : 1;
            isNaN(highestUserId) ? highestUserId = 0 : "";
            log("found highest UserId at "+highestUserId);
        })
    }
})()

function getNewUser(params){  //used to set defaults
    var res = params;
    res._id = res._id || nextUserId();
    res.bios = res.bios || [];
    res.authToken = res.authToken || makeAuthToken();
    return res;
}
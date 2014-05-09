//from http://stackoverflow.com/questions/14206492/how-do-i-store-a-current-user-context-in-angular/14206567#14206567
 myApp.factory( 'AuthService', function() {
    var that = this;

    authService = that;
    that.currentUser = {};
    
    that.setCurrentUser = function(data) {             
            that.currentUser.authToken = data.authToken;
            that.currentUser.email = data.email; 
            that.currentUser.fullName = data.fullName;
            that.currentUser.id = data._id;
            that.currentUser.bio = data.bios && data.bios.pop();
            that.save();
        };    

    that.load = function(){
        //that.currentUser.token       = localStorage.authToken;
        //that.currentUser.fullName = localStorage.fullName;
        that.currentUser = JSON.parse(localStorage.currentUser || "{}");
    };

    that.save = function(){
        //localStorage.authToken = that.currentUser.token;
        //localStorage.fullName = that.currentUser.fullName;        
        localStorage.currentUser = JSON.stringify(that.currentUser);
    };

    that.set = function(key,val) {
        that.currentUser[key] = val;
        that.save();
    }
    that.load();
    return that;
});

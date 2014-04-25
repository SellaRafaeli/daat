//from http://stackoverflow.com/questions/14206492/how-do-i-store-a-current-user-context-in-angular/14206567#14206567
 myApp.factory( 'AuthService', function() {
    var that = this;

    authService = that;
    that.currentUser = {};

    that.getAuthToken = function() { return localStorage.authToken};
    
    that.setAuthToken = function(token){ localStorage.authToken = token;};        
    
    that.setCurrentUser = function(data) { 
            this.setAuthToken(data.authToken); 
            that.currentUser.email = data.email; 
            that.currentUser.fullName = data.fullName; 
        };    
    return that;
});

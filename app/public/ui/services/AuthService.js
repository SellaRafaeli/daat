//from http://stackoverflow.com/questions/14206492/how-do-i-store-a-current-user-context-in-angular/14206567#14206567
 myApp.factory( 'AuthService', function() {
    var name = 'John Doe';
    //name = prompt('What is your name?') || 'Jane Smith';
    var currentUser = {name: 'Sella Rafaeli', id: 5566}

    //global on purpose
    authService = {
        login: function() {  alert('login core') },
        logout: function() { alert('logout core') },
        isLoggedIn: function() { alert('isLoggedIn') },
        getAuthToken: function() { return localStorage.authToken},
        setAuthToken: function(token){ localStorage.authToken = token;},
        currentUser: function() { return currentUser },
        currentUserID: function() { return currentUser.id; },
        currentUsername: function() { return currentUser.name; }
    };
    return authService;
});

//this file is meant to handle all the sockets IO. //TODO: make this play nice with Angular controllers?

var socket = io.connect();

socket.on('msg', function(data){
    console.log(data);
});
//yeah, it's global, because that's how I roll
socket.send = function (data){
    socket.emit('msg', data);
}

authService = angular.injector(['ng', 'myApp']).get("AuthService"); //there's gotta be a cleaner way
socket.register = function(){
    var userID = authService.currentUserID();
    socket.emit('register',{id: userID});
}

socket.register();
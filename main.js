var myApp = angular.module('myApp', []);

id = 0;
getQ = function(title,body,answers) {
    id = id+1;
    return {id: id, title: title, body: body, answers:answers}
}

getA = function(user,body){
    return {user: user, body: body};
}

myApp.factory('Data', function() {
    return {
        message: 'new data from a service',
        qList: [
            getQ('What time is it?','Is it 16:20?',[getA("Bob",'it\'s 16:15'), getA("Yossi",' it is 10:30')]),
            getQ('Which university is the best?', 'Technion? Hebrew U?', 
                [getA("Yossi",'I don\'t know where to go to school'),
                 getA("Moshe",'Hebrew University'),
                 getA("Haim",'Technion')]),
            getQ('Who do you think should be president?', 'Dalya Itzik? Shechtman?', 
                [getA("Moshe",'I think it should be Fuad'),
                getA("Haim",'Yair Lapid!')])            
        ]
        
    };
});

function FirstCtrl($scope, Data) {      
    $scope.data = Data;
}


function qListCtrl($scope, Data){
    $scope.data = Data; 
    $scope.foo = 'bar'; 
    $scope.submitAnswer = function(qid, myAnswer){
        alert("submitting my answer to qID"+qid+": "+myAnswer);
    }
}
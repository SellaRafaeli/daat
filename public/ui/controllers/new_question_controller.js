function newQuestionCtrl($scope, Data, $routeParams){        
    $scope.foo = 'newQuestionCtrl - bar';
    $scope.submitNewQuestion = function(){
        var title = this.newQuestionTitle;
        var details = this.newQuestionDetails;
        alert("submitting question with "+title+" and "+details);
        var cb = function(){
            alert("submitted question to backend");
        }
        Data.submitQuestion(title,details,cb);
    }
}
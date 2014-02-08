function newQuestionCtrl($scope, Data, $routeParams){        
    $scope.foo = 'newQuestionCtrl - bar';
    $scope.submitNewQuestion = function(){
        var title = this.newQuestionTitle;
        var details = this.newQuestionDetails;
        alert("submitting question with "+title+" and "+details);
    }
}
function newQuestionCtrl($scope, Data, $route, $routeParams, AuthService){
    $scope.foo = 'newQuestionCtrl - bar';
    $scope.submitNewQuestion = function(){
        var title = this.newQuestionTitle;
        var details = this.newQuestionDetails;
        //alert("submitting question with "+title+" and "+details);
        var cb = function(res){ location.hash = '#/questions/'+res.data.id };
        params = {title: title, details: details}
        Data.submitQuestion(params,cb);
    }
}
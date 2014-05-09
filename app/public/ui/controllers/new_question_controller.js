function newQuestionCtrl($scope, Data, $route, $routeParams, AuthService, $location){
    nqc = $scope;

    !AuthService.currentUser.fullName ? $location.path('/login') : '';

    $scope.foo = 'newQuestionCtrl - bar';
    $scope.categoriesLabelHead = 'קטגוריות - ';
    $scope.categoriesLabelTail = 'לפחות 3, מופרדות בפסיקים';

    $scope.submitNewQuestion = function(){
        var title = this.newQuestionTitle;
        var details = this.newQuestionDetails;
        var categories = _.without(_.map(this.newQuestionCategories.split(/,/),function(i){return i.trim();}),""); //split by commas, remove surrounding whitespace, remove empty strings.
        //alert("submitting question with "+title+" and "+details);
        var cb = function(res){ location.hash = '#/questions/'+res.data.id };
        params = {title: title, details: details, categories: categories}
        Data.submitQuestion(params,cb);
    }
}
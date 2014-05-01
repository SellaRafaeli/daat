function appController($scope, Data, $routeParams,AuthService){
    appCtrl = appController; //global scope for debugging

    //text
    $scope.brand = "דעת"
    $scope.about = "אודות";
    $scope.addQuestion = "הוסף שאלה";
    $scope.main = "ראשי";
    $scope.signup = "כניסה";

    $scope.$watch(function () { return AuthService.currentUser; },                       
        function(newVal, oldVal) {
        $scope.currentUser = newVal.fullName;
    }, true);
};
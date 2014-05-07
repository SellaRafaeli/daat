function appController($scope, Data, $routeParams,AuthService){
    appCtrl = $scope; //global scope for debugging

    //text
    $scope.brand = "דעת"
    $scope.about = "אודות";
    $scope.addQuestion = "הוסף שאלה";
    $scope.main = "ראשי";
    $scope.login = "להיכנס";
    $scope.logout = "לצאת";

    $scope.$watch(function () { return AuthService.currentUser; },                       
        function(newVal, oldVal) {
        $scope.currentUser = newVal.fullName;
        newVal.fullName ? $scope.login="להחליף יוזר" : $scope.login="להיכנס";
        }, true);
};
function appController($scope, Data, $routeParams, AuthService){
    appCtrl = $scope; //global scope for debugging

    //text
    $scope.brand = "דעת"
    $scope.about = "אודות";
    $scope.addQuestion = "הוסף שאלה";
    $scope.main = "ראשי";
    $scope.login = "להיכנס";
    $scope.logout = "לצאת";

    //the following is practice for one day switching between languages. Should be via some module?
    $scope.texts = {foo: 'some-foo'};
    $scope.heb = {foo: 'heb-foo'}
    $scope.setHeb = function(lang) { $scope.texts = $scope.heb; $scope.$apply(); };

    $scope.$watch(function () { return AuthService.currentUser; },                       
        function(newVal, oldVal) {
        $scope.currentUser = newVal.fullName;
        newVal.fullName ? $scope.login="להחליף משתמש" : $scope.login="להיכנס";
        }, true);
};
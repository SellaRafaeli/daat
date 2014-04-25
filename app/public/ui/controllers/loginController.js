//main controller
function LoginController($scope, Data, AuthService){

    $scope.email = "default@cob.com";
    $scope.fullName = "Default McName";
    
    $scope.login = function(){
        if (!this.email) { alert("Bad input - no email."); return; }

        Data.tryLogin({email: this.email, fullName: this.fullName},this.handleLogin);
    }

    $scope.handleLogin = function(loginRes) {
        if (token = loginRes.data.authToken) {
            AuthService.setAuthToken(token);
            alert ("good to go!");
        }
        else {
            alert ("can't login!");
        }
    }
}

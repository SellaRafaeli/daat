//main controller
function LoginController($scope, Data, AuthService, $route){
    loginCtrl = this; //global for debugging
    $scope.email = Math.random().toString(36).substring(3)+'@domain.com'; 
    $scope.fullName = "Default McName";
    

    $scope.signup = function(){
        if (!this.email) { alert("Bad input - no email."); return; }

        Data.signup({email: this.email, fullName: this.fullName},this.handleSignup);
    }

    $scope.handleSignup = function(signupRes) {
        (data = signupRes.data) ? AuthService.setCurrentUser(data) : alert ("can't login! : "+signupRes);            
    }

    $scope.logout = function(){
        AuthService.setCurrentUser({});
    }

    $route.current.originalPath.indexOf('logout')>0 ? $scope.logout() : "";
}

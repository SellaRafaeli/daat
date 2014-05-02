//main controller
function LoginController($scope, Data, AuthService, $route){
    loginCtrl = this; //global for debugging
    $scope.email = Math.random().toString(36).substring(3)+'@domain.com'; 
    $scope.fullName = getRandomName();
    

    $scope.signup = function(){
        if (!this.email) { alert("Bad input - no email."); return; }

        Data.signup({email: this.email, fullName: this.fullName},this.handleSignup);
    }

    $scope.handleSignup = function(signupRes) {
        if (data = signupRes.data) {
            AuthService.setCurrentUser(data);
            location.hash = '#/questions/';
        } else {
            alert ("can't login! : "+signupRes)
        }

    }

    $scope.logout = function(){
        AuthService.setCurrentUser({});
    }

    $route.current.originalPath.indexOf('logout')>0 ? $scope.logout() : "";
}
/* Helpers */

function getRandomName(){
    var firstNames = ["יוסי", "משה", "דנה", "רחל", "לאה", "בן", "חיים", "אבי", "ראובן", "אלי" ];
    var lastNames = ["כהן", "לוי", "אהרונסון", "שמיר", "רבין", "פולישוק", "רובינסון", "אסייג", "נחמני"];
    return randFrom(firstNames)+" "+randFrom(lastNames);
}
//main controller
function LoginController($scope, Data, AuthService, $route){
    loginCtrl = this; //global for debugging
    $scope.email = Math.random().toString(36).substring(3)+'@domain.com'; 
    $scope.fullName = getRandomName();
    $scope.password = "123";

    $scope.textEmail = "אימייל";
    $scope.textFullName = "שם מלא";
    $scope.textPassword = "סיסמא (לא חובה)";


    $scope.signup = function(){
        if (!this.email) { alert("Bad input - no email."); return; }

        Data.signup({email: this.email, fullName: this.fullName, password: this.password},this.handleSignup);
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
    firstNames = firstNames.concat(["בן", "שירלי", "יורם", "איליה", "דימה", "שלום", "אריק", "ג'ודי"]);
    var lastNames = ["כהן", "לוי", "אהרונסון", "שמיר", "רבין", "פולישוק", "רובינסון", "אסייג", "נחמני"];
    lastNames = lastNames.concat(["נחמני", "יוכבד", "זמיר", "מאיר", "ישראלי", "ברק", "לייפציג", "רוזנבאום", "אסייג"]);
    return randFrom(firstNames)+" "+randFrom(lastNames);
}
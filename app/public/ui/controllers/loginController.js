//main controller
function LoginController($scope, Data, AuthService, $route){
    loginCtrl = $scope; //global for debugging

    $scope.email = Math.random().toString(36).substring(3)+'@domain.com'; 
    $scope.fullName = getRandomName();
    $scope.password = "123";
    $scope.userImgLnk = "http://lorempixel.com/400/200/people/"+randRange(1,10);

    $scope.signup = function(){
        if (!this.email) { alert("Bad input - no email."); return; }

        Data.signup({email: this.email,
                     fullName: this.fullName,
                     password: this.password,
                     imgLnk: this.userImgLnk,
                    },this.handleSignup);
    }

    $scope.login = function(){
        if (!this.email) { alert("Bad input - no email."); return; }

        Data.login({email: this.email, password: this.password},this.handleSignup);
    }

    $scope.handleSignup = function(signupRes) {
        if (signupRes.data) {
            AuthService.setCurrentUser(signupRes.data);
            location.hash = '#/questions/';
        } else {
            alert ("can't login! : "+signupRes)
        }

    }

    $scope.logout = function(){
        AuthService.setCurrentUser({});
    }

    $scope.loginFB = function(){
        log("trying loginFB");

        function handleResponse(response) {
            console.log("response: ",response);
            var tern = (response.status === 'connected') ? handleConnected(response) : log('Not connected');
        }

        function handleConnected(response){
            log("Connected! with response: ",response);
            var tern = (response.status === "connected") ?
                        Data.fbEnter({accessToken: response.authResponse.accessToken},$scope.handleSignup) :
                        alert("Can't handle facebook connection!");
        }

        FB.getLoginStatus(function(response) {
            response.status === 'connected' ? handleConnected(response) : FB.login(handleResponse); });
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
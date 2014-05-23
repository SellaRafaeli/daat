//main controller
function LoginController($scope, Data, AuthService, $route){
    loginCtrl = $scope; //global for debugging

    $scope.email = Math.random().toString(36).substring(3)+'@domain.com'; 
    $scope.fullName = getRandomName();
    $scope.password = "123";
    $scope.userImgLnk = "http://lorempixel.com/400/200/people/"+randRange(1,10);

    var bgImgUrls = ["http://24.media.tumblr.com/f66ac1d6483c48205723e996bb2d9b80/tumblr_n5wasssGkO1st5lhmo1_1280.jpg",
        "http://24.media.tumblr.com/fa6c7320f352533bb56bea01c5d562f1/tumblr_n5waqc75RA1st5lhmo1_1280.jpg",
        "http://31.media.tumblr.com/67151918dbf1e1ca27ed5a0921970c81/tumblr_n5waphpp4M1st5lhmo1_1280.jpg",
        "http://37.media.tumblr.com/896656ef638e8bc5db3f6c148d70d9d5/tumblr_n5e5qd8BB81st5lhmo1_1280.jpg",
        "http://24.media.tumblr.com/a75978ee3a0901eb3f04731a99721818/tumblr_n5e0flmR0u1st5lhmo1_1280.jpg",
        "http://24.media.tumblr.com/a4eb7b32205d366bbea47042a04e10a9/tumblr_n5e0d0qDIW1st5lhmo1_1280.jpg",
        "http://24.media.tumblr.com/c4866a2c1a33bdeaa8a3ec6b5d6bef1e/tumblr_n5e0701WqC1st5lhmo1_1280.jpg",
        "http://31.media.tumblr.com/d83b99e22981d5e58e2bd74ed2494087/tumblr_n4ef3ynCZP1st5lhmo1_1280.jpg",
        "http://24.media.tumblr.com/4674f3b8059faeeb8128e74bfafd1011/tumblr_n4ef1niTku1st5lhmo1_1280.jpg"];

    bgImgUrl = randFrom(bgImgUrls);
    $("#loginPage").css('background','rgba(0, 0, 0, 0) url('+bgImgUrl+') no-repeat fixed 50% 50% / 100% padding-box border-box');

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

        FB.login(handleResponse);

        return;
        //not sure whether to use the one below.
        //FB.getLoginStatus(function(response) { response.status === 'connected' ? handleConnected(response) : FB.login(handleResponse); });
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
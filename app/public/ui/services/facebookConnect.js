//'105499322837270' is Mekomot
//137478849618989 is dev-Mekomot. See //see https://developers.facebook.com/apps

//for configuration on fb.com see
//  > http://stackoverflow.com/questions/14474122/given-url-is-not-permitted-by-the-application-configuration
//  > http://stackoverflow.com/questions/3289214/how-can-i-use-localhost-while-developing-facebook-graph-website
//  > https://devcenter.heroku.com/articles/facebook#1-creating-a-development-facebook-app
//    https://developers.facebook.com/apps

// 137478849618989 is Dev-Mekomot
// 105499322837270 is Mekomot
window.fbAsyncInit = function() {
    FB.init({
        appId      : '137478849618989',
        xfbml      : true,
        version    : 'v2.0'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
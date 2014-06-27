//global config obj. (should be part of angular definition?)

var isDevelopment = location.host.indexOf('localhost')>=0
clientConfig = {
    facebook_app_id: isDevelopment ? '137478849618989' : '105499322837270',
    isSmallScreen: window.innerWidth < 1000 //hackish? used for example to remove relatedQuestions on mobile
}
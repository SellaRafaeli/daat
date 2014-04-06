
//HTML elements
myApp.directive('answer', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/answer.html'
   };
});

myApp.directive('questionAndAnswers', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/question-and-answers.html'
    }                   
});

myApp.directive('topNavBar', function(){        
    return {
        restrict: 'E',
        templateUrl: 'views/top-nav-bar.html'
    }
});

myApp.directive('comments', function(){        
    return {
        restrict: 'E',
        templateUrl: 'views/comments.html'
    }
});

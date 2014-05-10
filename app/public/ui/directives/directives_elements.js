
//HTML elements
myApp.directive('answer', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/answer.html'
   };
});

myApp.directive('questionAndAnswers', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/question-and-answers.html'
    }                   
});

myApp.directive('topNavBar', function(){        
    return {
        restrict: 'E',
        templateUrl: 'partials/top-nav-bar.html'
    }
});

myApp.directive('comments', function(){        
    return {
        restrict: 'E',
        templateUrl: 'partials/comments.html'
    }
});

myApp.directive('categories', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/categories.html'
    }
});

myApp.directive('relatedQuestions', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/related-questions.html'
    }
});
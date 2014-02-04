
//HTML elements
myApp.directive('answer', function() {
    return {
        restrict: 'E',
        template: '<div><span class="answer-user"> {{a.user}} ◁ </span> <span> {{a.body}} </div>'        
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

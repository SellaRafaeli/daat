
myApp.directive('answer', function() {
    return {
        restrict: 'E',
        template: '<div class="answer-user"> {{a.user}} </div> <div heb> {{a.body}} </div>',
   };
});

//todo: should just be part of page CSS once we remove 'foundation'
myApp.directive('heb', function() {
    return function (scope, element, attr) {
        element.addClass('heb')
    }   
});

myApp.directive('questionAndAnswers', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/question-and-answers.html'
    }                   
});

myApp.directive('show', function(){
    return {
        restrict: 'A',
        link: function(scope, el, attrs){
            if (attrs.show) { el[0].style.display = 'none'}
        }
    }                   
});
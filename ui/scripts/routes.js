myApp.config(['$routeProvider',
  function($routeProvider) {
    var base = '/ui/views/';
    $routeProvider.
      when('/about', {
        templateUrl: base + 'about.html',
      }).
      when('/new_question', {
        templateUrl: base + 'new_question.html',
      }).
      when('/hello', {
        templateUrl: base + 'hello.html',
      }).
      when('/questions', {
        templateUrl: base + 'qList.html'
      }).
      when('/questions/:_id', {
        templateUrl: base + 'qList.html'
      }).
      when('questions/:type/:name', {
        templateUrl: base + 'qList.html'
      }).
      otherwise({
        templateUrl: base + '/qList.html'
      });
  }]);
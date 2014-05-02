myApp.config(['$routeProvider',
  function($routeProvider) {
    var base = '/ui/partials/';
    $routeProvider.
     when('/signup', {
        templateUrl: base + 'login.html',
      }).
      when('/login', {
        templateUrl: base + 'login.html',
      }).
      when('/logout', {
        templateUrl: base + 'login.html',
      }).
      when('/about', {
        templateUrl: base + 'about.html',
      }).
      when('/users/:userId', {
        templateUrl: base + 'qList.html'
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
      when('/questions/:id', {
        templateUrl: base + 'qList.html'
      }).
      when('questions/:type/:name', {
        templateUrl: base + 'qList.html'
      }).
      otherwise({
        templateUrl: base + '/qList.html'
      });
  }]);
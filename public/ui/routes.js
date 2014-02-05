myApp.config(['$routeProvider',
  function($routeProvider) {
    var base = '/ui/partials/';
    $routeProvider.
      when('/about', {
        templateUrl: base + 'about.html',        
      }).
      when('/hello', {
        templateUrl: base + 'hello.html',        
      }).
      when('/:type/:name', {
        templateUrl: base + 'qList.html',
        //controller: 'ShowOrdersController'
      }).
      otherwise({
        templateUrl: base + '/qList.html'
      });
  }]);
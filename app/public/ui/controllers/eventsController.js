function eventsController($scope, Data){
    $scope.events = "Czar";

    Data.getEvents({}, function(response){
        $scope.events = response['data'];
    });
}
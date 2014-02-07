//main controller
function qListCtrl($scope, Data, $routeParams){        
    $routeParams.orderId
    $scope.route_type = $routeParams.type
    $scope.route_name = $routeParams.name
    $scope.data = Data.get($scope.route_type, $scope.route_name);
    $scope.submitAnswer = function(qid, myAnswer){
        alert("submitting my answer to qID"+qid+": "+myAnswer);
    }
    $scope.upvote = function(a,b,c) {
        alert("Upvoting answer "+a.body)
        a.upvotes+=1
    }

    $scope.shortAnswer = function(answerBody){
        shortLengthChars = 100;
        shortAnswer = answerBody.length < shortLengthChars ? answerBody : answerBody.substring(0,shortLengthChars)+"... (עוד)"
        return shortAnswer;
    }
}
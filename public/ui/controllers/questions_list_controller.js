//main controller
function qListCtrl($scope, Data, $routeParams){        
    //$routeParams.orderId
    $scope.route_type = $routeParams.type
    $scope.route_name = $routeParams.name
    debugger
    Data.getQuestions($scope.route_type, $scope.route_name, function(response){ 
        debugger
        $scope.data = response;
    });
    $scope.submitAnswer = function(qid, myAnswer){
        var qid = this.data.qList[0].id;
        var answer = this.myAnswer;
        alert("submitting my answer to qID"+qid+": "+answer);
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

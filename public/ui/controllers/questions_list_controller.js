//main controller
function qListCtrl($scope, Data, $routeParams){        
    //$routeParams.orderId
    $scope.route_type = $routeParams.type
    $scope.route_name = $routeParams.name
    
    $scope.qList = Data.qList; //the client-side stub that works
    $scope.data = {qList: Data.qList};
    $scope.origData = $scope.data;
    Data.getQuestions($scope.route_type, $scope.route_name, function(response){         
        var temp = [{title: "foo", body: "moo"}];

        var data = response.data.map(function(server_answer ){
            return {title: server_answer.title,
                    body: server_answer.text
            }
        });
        $scope.data = {qList: data};
        //$scope.data = {qList: qList};        
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

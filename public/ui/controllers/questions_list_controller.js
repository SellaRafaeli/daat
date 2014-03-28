//main controller
function qListCtrl($scope, Data, $routeParams){        
    //$routeParams.orderId
    $scope.route_type = $routeParams.type
    $scope.route_name = $routeParams.name
    
    $scope.qList = Data.qList; //the client-side stub that works
    //$scope.data = {qList: Data.qList};
    $scope.origData = $scope.data;

    Data.getQuestions($scope.route_type, $scope.route_name, function(response){         
        var temp = [{title: "foo", body: "moo"}];

        questions = [].concat(response.data); //make sure it's an array

        var data = questions.map(function(server_answer ){
            return {title: server_answer.title,
                    body: server_answer.text,
                    answers: server_answer.answers
            }
        });
        $scope.data = {qList: data};
        //$scope.data = {qList: qList};        
    });

    $scope.submitAnswer = function(qid, myAnswer){
        var qid = this.data.qList[0].title;
        var answer = this.myAnswer;
        alert("submitting my answer to qID"+qid+": "+answer);
        Data.submitAnswer(qid, answer);
    }
    $scope.upvote = function(a,b,c) {
        alert("Upvoting answer "+a.body)
        a.upvotes = a.upvotes || 0;
        a.upvotes+=1
    }

    $scope.shortAnswer = function(answerBody){
        answerBody = answerBody || "";
        shortLengthChars = 100;
        shortAnswer = answerBody.length < shortLengthChars ? answerBody : answerBody.substring(0,shortLengthChars)+"... (עוד)"
        return shortAnswer;
    }
}

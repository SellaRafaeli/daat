//main controller
function qListCtrl($scope, Data, $routeParams,AuthService){
    g1 = $scope;
    //g1.data.qList;
    //$routeParams.orderId
    $scope.route_type = $routeParams.type
    $scope.route_name = $routeParams.name
    $scope.username = AuthService.currentUser().name;
    $scope.qList = Data.qList; //the client-side stub that works
    //$scope.data = {qList: Data.qList};
    $scope.origData = $scope.data;
    var getQuestionsParams = $routeParams
    Data.getQuestions(getQuestionsParams, function(response){
        questions = [].concat(response.data); //make sure it's an array

        var data = questions.map(function(server_answer ){
            return {
                    id:   server_answer._id,
                    title: server_answer.title,
                    link: server_answer._id,
                    body: server_answer.text,
                    answers: server_answer.answers
            }
        });
        $scope.data = {qList: data};
        console.log("qList is ");
        console.log(g1.data.qList);
        //$scope.data = {qList: qList};        
    });

    $scope.submitAnswer = function(qid, myAnswer){
        var qid = this.data.qList[0].id;
        qid = encodeURIComponent(qid);
        var answer = this.myAnswer;
        alert("submitting my answer to qID"+qid+": "+answer);
        Data.submitAnswer(qid, answer);
    }

    $scope.submitNewComment = function(params){
        params = {comment: this.newComment, answerId: params.aId, questionId: params.qId};
        Data.submitComment(params,function(){ alert("submitted comment to backend"); });
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

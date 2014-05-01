//main controller
function qListCtrl($scope, Data, $route, $routeParams,AuthService){
    g1 = $scope;
    //g1.data.qList;
    //$routeParams.orderId
    $scope.foo = [10,20,30];

    $scope.route_type = $routeParams.type
    $scope.route_name = $routeParams.name
    //$scope.username = AuthService.currentUser().name;
    $scope.qList = Data.qList; //the client-side stub that works
    //$scope.data = {qList: Data.qList};
    $scope.origData = $scope.data;
    var getQuestionsParams = $routeParams
    Data.getQuestions(getQuestionsParams, function(response){
        questions = [].concat(response.data); //make sure it's an array

        var data = questions.map(function(server_question ){
            var q = server_question;

            return {
                    id:   q.id,
                    title: q.title,
                    link: q.id,
                    body: q.text,
                    answers: _.map(q.answers,function(a){
                        a.getUpvotes = function(){ return (Object.keys(a.upvoters || {}).length);};
                        return a
                    })
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
        Data.submitAnswer(qid, answer, function(res){ $route.reload();});
    }

    $scope.submitNewComment = function(params){
        params = {comment: this.newComment, answerId: params.aId, questionId: params.qId};
        Data.submitComment(params,function(){ alert("submitted comment to backend"); });
    }

    $scope.upvoteAnswer = function(question, answer) {
        var cb = function(result) { (answer.upvoters = answer.upvoters || {})[AuthService.currentUser.fullName] = {}; };
        Data.upvoteAnswer(question, answer, cb);
    }

    $scope.shortAnswer = function(answerBody){
        answerBody = answerBody || "";
        shortLengthChars = 100;
        shortAnswer = answerBody.length < shortLengthChars ? answerBody : answerBody.substring(0,shortLengthChars)+"... (עוד)"
        return shortAnswer;
    }
}

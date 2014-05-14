//main controller
function qListCtrl($scope, Data, $route, $routeParams, AuthService, $location, $http, $filter){
    //cheaters
    g1 = $scope;

    http = $http;
    qs = function(){return $scope.data.qList};
    //g1.data.qList;
    //$routeParams.orderId
    $scope.foo = [10,20,30];

    !AuthService.currentUser.fullName ? $location.path('/login') : '';

    $scope.route_type = $routeParams.type
    $scope.route_name = $routeParams.name
    //$scope.username = AuthService.currentUser().name;
    $scope.qList = Data.qList; //the client-side stub that works
    //$scope.data = {qList: Data.qList};
    $scope.origData = $scope.data;

    var getQuestionsParams = $routeParams
    Data.getQuestions(getQuestionsParams, function(response){
        questions = [].concat(response.data); //make sure it's an array

        //filter stuff out from each question
        function filterOut(question){
            if ($routeParams['userId']) {
                question.answers = _.filter(question.answers, function(a) {
                    return (a.owner.id == $routeParams['userId']);
                });
            }

            return question;
        }

        var data = questions.map(function(server_question ){
            var q = server_question;

            var question = {
                    id:   q.id,
                    title: q.title,
                    link: q.id,
                    body: q.text,
                    dateModified: q.dateModified || moment('1970'),
                    answers: _.map(q.answers,function(a){
                        a.getUpvotes = function(){ return a.upvoters.length; };
                        a.upvotersNames = function() { return _.map(a.upvoters,function(v){ return v.fullName}).join(", "); };
                        a.buttonText = a.upvoters;
                        a.isUpvotedByCurrentUser = function() { return a.upvoters[AuthService.currentUser.fullName]};
                        return a
                    }),
                    categories: _.uniq(q.categories).sort()
            };
            sortArrayByKeyDesc(question.answers, 'dateAdded');
            question = filterOut(question);
            return question;
        });

        sortArrayByKeyDesc(data,'dateModified');
        $scope.data = {qList: data,
                       currentCategories: data[0].categories
        };

    });

    $scope.$watch("data.currentCategories", function(newValue, oldValue) {
        var categories = $filter('split')(newValue);
        if (!(categories && categories.length)) { return; }

        $http.get('/questions/relatedQuestions',{params: {categories: categories}}).then(function(response){
            var qs = response.data;
            if (!$.isArray(qs)) { return; }
            $scope.relatedQuestions = qs;

        });
    });

    $scope.newAnswerToolbars = [['h1','h2','h3','p'],['bold','italics','underline'],['ul','ol','quote'],['insertImage','insertLink']];

    $scope.submitAnswer = function(){
        var qid = this.data.qList[0].id;
        qid = encodeURIComponent(qid);
        var answer = this.myAnswer;
        var bio = this.user.bio;
        var params = {qid: qid, answer_text: this.myAnswer, bio: bio};
        Data.submitAnswer(params, function(res){ $route.reload();});
        AuthService.set("bio",bio);
    }

    $scope.submitNewComment = function(params){
        params = {comment: this.newComment, answerId: params.aId, questionId: params.qId};
        Data.submitComment(params,function(){ alert("submitted comment to backend"); });
    }

    $scope.toggleUpvoteAnswer = function(question, answer) {
        var key = AuthService.currentUser.fullName;
        var alreadyUpvoted = !!_.findWhere(answer.upvoters, {fullName: key});
        var cb = function(result) {
            answer.upvoters = answer.upvoters || [];
            //nicefy this, and make it into a general add/remove-from-array method.
            alreadyUpvoted ? answer.upvoters = _.without(answer.upvoters, _.findWhere(answer.upvoters, {fullName: key})) : answer.upvoters.push({fullName: key});
        }

        Data.toggleUpvoteAnswer(question, answer, alreadyUpvoted);
        cb(); //done without waiting for server -- assuming success.
    }

    $scope.shortAnswer = function(answerBody){
        answerBody = answerBody || "";
        shortLengthChars = 100;
        shortAnswer = answerBody.length < shortLengthChars ? answerBody : answerBody.substring(0,shortLengthChars)+"... (עוד)"
        return shortAnswer;
    }

    $scope.allowAnswer = function(){
        var singleQuestion = $scope.singleQuestion();
        if (!singleQuestion) { return false; }
        var loggedInId = AuthService.currentUser.id;
        var alreadyAnswered = _.find(singleQuestion.answers, function(a){return a.owner.id == loggedInId});
        return loggedInId && !alreadyAnswered;
    }

    //returns the single question on page.
    $scope.singleQuestion = function() {
        var list = $scope.qList();
        return list && list.length == 1 && list[0];
    }

    $scope.isSingleQuestion = function(){ var list = $scope.qList(); return list && list.length == 1; }
    $scope.isq = $scope.isSingleQuestion;

    //returns the list of questions on page.
    $scope.qList = function() {
        return $scope.data && this.data.qList;
    }

    $scope.answerUpvoted = function(answer){
        return _.findWhere(answer.upvoters, {fullName: AuthService.currentUser.fullName}) ? 'בטל לייק' : 'לייק!';
    }

    $scope.setCategories = function(q){
        Data.setQuestionCategories(q,$scope.data.currentCategories);
    }
//    $scope.addCategoryToQuestion = function(q){
//        var cat = prompt("איזו קטגוריה להוסיף?");
//        if (cat) { Data.addCategoryToQuestion(q,cat,function(res){ $route.reload();}) }
//    }
//
//    $scope.removeCategoryFromQuestion = function(q,c){
//        Data.removeCategoryFromQuestion(q,c,function(res){ $route.reload();});
//    }

    $scope.username = function(){ return AuthService.currentUser.fullName };

    $scope.user = AuthService.currentUser;

}

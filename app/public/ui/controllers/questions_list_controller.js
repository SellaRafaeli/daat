//main controller
g1 = {data:[]};
loaded_questions = [];
function qListCtrl($scope, Data, $route, $routeParams, AuthService, $location, $http, $filter){
    //cheaters
    previousQList = g1;
    g1 = $scope;

    http = $http;
    qs = function(){return $scope.data.qList};
    //g1.data.qList;
    //$routeParams.orderId

    !AuthService.currentUser.fullName ? $location.path('/login') : '';

    $scope.route_type = $routeParams.type
    $scope.route_name = $routeParams.name
    //$scope.username = AuthService.currentUser().name;
    $scope.qList = Data.qList; //the client-side stub that works
    //$scope.data = {qList: Data.qList};
    $scope.origData = $scope.data;

    $scope.data = {qList: []};
    $scope.getQuestionsParams = $routeParams


    $scope.getNumComments = function(commentsArr) { //count recursively how many comments+subcomments are for answer
        var counter = 0;
        function countComments(baseCommentsArr, targetID) {
            _.each(baseCommentsArr,function(c) {
                counter+=1;
                countComments( (c.subcomments || []))
            });
        };
        countComments(commentsArr);
        return counter;
    }

    $scope.serverQuestionMapper = function(server_question ){
        //filter stuff out from each question
        function filterOut(question){
            if ($routeParams['userId']) {
                question.answers = _.filter(question.answers, function(a) {
                    return (a.owner.id == $routeParams['userId']);
                });
            }

            return question;
        }

        var q = server_question;

        var question = {
            id:   q._id,
            title: q.title,
            link: q._id,
            body: q.text,
            dateModified: q.dateModified || moment('1970').format(),
            answers: _.map(q.answers,function(a){
                a.getUpvotes = function(){ return a.upvoters.length; };
                a.upvotersNames = function() { return _.map(a.upvoters,function(v){ return v.fullName}).join(", "); };
                a.buttonText = a.upvoters;
                a.comments.forEach(function(c){c.subcomments = c.subcomments || []}); //ensure subcomments exist. TODO: script-verify this in DB and remove this func.
                a.numComments = $scope.getNumComments(a.comments);
                a.isUpvotedByCurrentUser = function() { return a.upvoters[AuthService.currentUser.fullName]};
                return a
            }),
            categories: _.uniq(q.categories).sort()
        };
        sortArrayByKeyDesc(question.answers, 'dateAdded');
        question = filterOut(question);
        return question;
    }


    var questionAlreadyLoaded = _.find(loaded_questions, function(q){ return (q.id == $scope.getQuestionsParams.id) });
    if (questionAlreadyLoaded){
        $scope.data.qList = [questionAlreadyLoaded];
        $scope.data.currentCategories = questionAlreadyLoaded.categories;
    }
    else if ((loaded_questions.length > 10) && !$scope.getQuestionsParams.userId && !$scope.getQuestionsParams.categoryId && !$scope.getQuestionsParams.id){
        data = loaded_questions;
        $scope.data.qList = data;
        $scope.data.currentCategories = data[0].categories;
    }
    else {
        Data.getQuestions($scope.getQuestionsParams, function(response){
            questions = [].concat(response.data); //make sure it's an array

            var data = questions.map($scope.serverQuestionMapper);

            //sortArrayByKeyDesc(data,'dateModified'); //questions arrive from server sorted by dateModified
            loaded_questions = loaded_questions.concat(data);
            $scope.data.qList = data;
            $scope.data.currentCategories = data[0].categories;
        });
    }


    $scope.loadMoreQuestions = function(){
        var that = $scope;
        if (that.data.loadingQs || that.isq()) { return; } //return if in the middle of loading
        if ($routeParams['userId'] || $routeParams['id'] || $routeParams['categoryId']) { return; } //don't load more if in a non-feed route. Not good -- this shouldn't be here :\

        that.data.loadingQs = true;
        var params = that.getQuestionsParams;
        lastModifiedDate = (that.data.qList.last() || {}).dateModified;
        if (!lastModifiedDate) { that.data.loadingQs = false; return; } //happens if data.qList hasn't been initted yet, if first load was too fast.
        lastModifiedDate ? params.sinceDate = lastModifiedDate : '';

        Data.getQuestions(params,function(res){
                var newItems = res.data;
                newItems = newItems.map($scope.serverQuestionMapper);
                that.data.qList.addArray(newItems);
                setTimeout(function(){ that.data.loadingQs = false;},300);
            });
    }

    //setTimeout($scope.loadMoreQuestions,100); //immediately call more after page is loaded, to ensure second page of questions.

    $scope.$watch("data.currentCategories", function(newValue, oldValue) {
        if (clientConfig.isSmallScreen) { return } //don't loading related questions on mobile, it's both heavy and UI is broken.
        var categories = $filter('split')(newValue);
        if (!(categories && categories.length)) { return; }

        $http.get('/questions/relatedQuestions',{params: {categories: categories}}).then(function(response){
            var qs = response.data;
            if (!$.isArray(qs)) { return; }
            $scope.relatedQuestions = qs;

        });
    });

    //$scope.newAnswerToolbars = [['h1','h2','h3','p'],['bold','italics','underline'],['ul','ol','quote'],['insertImage','insertLink']];
    $scope.newAnswerToolbars = [['h1','h2','h3','p','bold','italics','underline','ul','ol','quote','insertImage','insertLink']];

    $scope.submitAnswer = function(){
        var currQuestion = this.data.qList[0];
        var qid = currQuestion.id;

        qid = encodeURIComponent(qid);
        var answer = this.myAnswer;
        var bio = this.user.bio;
        var params = {qid: qid, answer_text: this.myAnswer, bio: bio};
        Data.submitAnswer(params, function(res){
           currQuestion.answers.unshift(res.data.newAnswer);
        });
        AuthService.set("bio",bio);
    }

    $scope.saveDraft = function(){
        localStorage['q'+this.data.qList[0].id+'draft'] = appCompressor.compress(this.myAnswer);
        alert("Draft saved.");
    }

    $scope.loadDraft = function(){
        if (!this.isq()) { return; }
        $scope.myAnswer = appCompressor.decompress(localStorage['q'+this.data.qList[0].id+'draft'] || "");
    }

    $scope.commentsLink = function(a) {
        return ($scope.texts.commentsLink + (a.numComments ? ' ('+(a.numComments)+')' : ''));
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
    $scope.empty = function() {   var list = $scope.qList(); return !list || list.length == 0;  }

    //returns the list of questions on page.
    $scope.qList = function() {
        return $scope.data && this.data.qList;
    }

    $scope.answerUpvoted = function(answer){
        //return _.findWhere(answer.upvoters, {fullName: AuthService.currentUser.fullName}) ? 'בטל לייק' : 'לייק!';
        return _.findWhere(answer.upvoters, {fullName: AuthService.currentUser.fullName}) ? $scope.texts.unlike : $scope.texts.like
    }

    $scope.setCategories = function(q){
        var categoriesArr = $filter('split')($scope.data.currentCategories);
        Data.setQuestionCategories(q,categoriesArr,$scope.getAllCategories);
    }

    $scope.updateAnswerText = function(q,a) {
        if (a.text != a.updatedText) {
            a.text = a.updatedText;
            Data.updateAnswerText(q.id, a.id, a.updatedText);
        }
    }

    $scope.updateQuestionTitle = function(q,event) {
        var elem = $($(event)[0].srcElement);
        !elem.text() ? elem.text(q.title) : ''; //defend against accidental deletion

        var newTitle = elem.text();
        if (newTitle != q.title) {
            Data.updateQuestionTitle(q.id,newTitle);
        }
    }
//    $scope.addCategoryToQuestion = function(q){
//        var cat = prompt("איזו קטגוריה להוסיף?");
//        if (cat) { Data.addCategoryToQuestion(q,cat,function(res){ $route.reload();}) }
//    }
//
//    $scope.removeCategoryFromQuestion = function(q,c){
//        Data.removeCategoryFromQuestion(q,c,function(res){ $route.reload();});
//    }

    $scope.answerBelongsToCurrentUser = function(a){ return a.owner.id==$scope.user.id || $scope.isAdmin }

    $scope.numAnswersToShow = function() { var res = (this.isq() ? 100 : 1); return res;}
    $scope.orderAnswersBy = function() { var res = (this.isq() ? 'upvoters.length' : 'dateAdded'); return res }

    $scope.clickAnswer = function(e) {
        if (e.srcElement.tagName == 'IMG') {
            $scope.overlayPicSrc = $(e.srcElement).attr('src');
            $scope.showOverlaypic = true;
        }

    }

    $scope.initA2A = function(){
        var qid = this.data.qList[0].id;
        var target = prompt("Who do you want to ask?");
        var cb = function(){alert ("Asked to answer.");};
        target ? Data.initA2A(qid, target, cb) : '';
    }

    $scope.initAddingAnswerMode = function(){
        if ($scope.addingAnswerMode) { return; }
        $scope.addingAnswerMode = true;
        $('.ta-toolbar').show(); //jQuery-style hack (not ng-style) because it's an external component and it's easier this way.
        $('#taTextElement').height(100);
        $('#taTextElement').html("");
        console.log("in init adding answer mode");
    }

    document.title = $scope.isq() ? $scope.singleQuestion().title : $scope.texts.title;
}

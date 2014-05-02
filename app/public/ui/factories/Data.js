myApp.factory('Data', function($http, AuthService) {

    questionRoute = function(qId) { return '/questions/'+qId; };

    return {
        message: 'new data from a service',

        //routes
        getQuestions: function(params,cb){
            var route = params['id'] ? questionRoute(params['id']) : '/questions';
            params['userId'] ? route = '/questions/users/'+params['userId'] : "";
            $http.get(route,{params: params}).then(cb);
            return "ok";
        },
        submitQuestion: function(params,cb){
            params['authToken'] = AuthService.currentUser.authToken;
            $http.post('/questions/new/',params).then(cb);
            return "ok";
        },
        submitComment: function(params,cb){
            params['authToken'] = AuthService.currentUser.authToken;
            var route = '/questions/'+params.questionId+'/answer/'+params.answerId+'/newComment';
            $http.post(route,params).then(cb);
            //$http.post('/questions/new/',params).then(cb);
            return "ok";
        },
        submitAnswer: function(qid,answerText,cb){
            params = {answer_text :answerText}
            params['authToken'] = AuthService.currentUser.authToken;            
            $http.post('/questions/'+qid+'/new_answer',params).then(cb);
            return "ok";
        },
        toggleUpvoteAnswer: function(question,answer, alreadyUpvoted, cb){
            params = {alreadyUpvoted: alreadyUpvoted};
            params['authToken'] = AuthService.currentUser.authToken;
            $http.post('/questions/'+question.id+'/answer/'+answer.id+'/toggleUpvote',params).then(cb);
            return "ok";
        },
        signup: function(params, cb){ $http.post('/signup',params).then(cb); }
    };
});
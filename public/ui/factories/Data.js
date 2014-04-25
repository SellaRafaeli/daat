myApp.factory('Data', function($http, AuthService) {
    return {
        message: 'new data from a service',
        //qList: qList,
        getQuestions: function(params,cb){
            var route = params['id'] ? '/questions/'+params['id'] : '/questions';
            $http.get(route,{params: params}).then(cb);
            return "ok";
        },
        submitQuestion: function(params,cb){
            params['userId'] = AuthService.currentUser().id;
            $http.post('/questions/new/',params).then(cb);
            return "ok";
        },
        submitComment: function(params,cb){
            params['userId'] = AuthService.currentUser().id;
            var route = '/questions/'+params.questionId+'/answer/'+params.answerId+'/newComment';
            $http.post(route,params).then(cb);
            //$http.post('/questions/new/',params).then(cb);
            return "ok";
        },
        submitAnswer: function(qid,answerText,cb){
            userId = AuthService.currentUserID();
            username = AuthService.currentUsername();
            $http.post('/questions/'+qid+'/new_answer',{answer_text:answerText, userId: userId, username: username});
            return "ok";
        },
        tryLogin: function(params, cb){ $http.post('/login',params).then(cb); }
    };
});
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
        signup: function(params, cb){ $http.post('/signup',params).then(cb); }
    };
});
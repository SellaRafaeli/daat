myApp.factory('Data', function($http, AuthService) {
    return {
        message: 'new data from a service',
        qList: qList,
        getQuestions: function(params,cb){
            //var route = (type=='question') ? '/questions/'+name : '/questions';
            var route = '/questions';
            $http.get(route,{params: params}).then(cb);
            return {qList: qList}
        },
        submitQuestion: function(params,cb){
            params['userId'] = AuthService.currentUser().id;
            $http.post('/questions/new/',params).then(cb);
            return "ok";
        },
        submitAnswer: function(qid,answerText,cb){
            userId = AuthService.currentUserID();
            $http.post('/questions/'+qid+'/new_answer',{answer_text:answerText, userId: userId});
            return "ok";
        }
    };
});
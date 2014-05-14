myApp.factory('Data', function($http, AuthService) {

    var genericErrHandler = function(res) {
        if (Math.random() < 0.3) { alert("Action failed, see JS console for details."); }
        msg = res.status+" on "+res.config.method+" to "+res.config.url+". Data was: "+res.data+" and config.data was: "+res.config.data;
        console.log(msg);
    };

    questionRoute = function(qId) { return '/questions/'+qId; };

    return {
        message: 'new data from a service',

        //routes
        getQuestions: function(params,cb){
            var route = params['id'] ? questionRoute(params['id']) : '/questions';
            params['userId'] ? route = '/questions/users/'+params['userId'] : "";
            params['categoryId'] ? route = '/questions/category/'+params['categoryId'] : "";
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
        submitAnswer: function(params,cb){
            params['authToken'] = AuthService.currentUser.authToken;            
            $http.post('/questions/'+params['qid']+'/new_answer',params).then(cb);
            return "ok";
        },
        toggleUpvoteAnswer: function(question,answer, alreadyUpvoted, cb){
            params = {alreadyUpvoted: alreadyUpvoted};
            params['authToken'] = AuthService.currentUser.authToken;
            $http.post('/questions/'+question.id+'/answer/'+answer.id+'/toggleUpvote',params).catch(genericErrHandler);
            return "ok";
        },

        setQuestionCategories: function(q,cats){
            params = {};
            params['authToken'] = AuthService.currentUser.authToken;
            params['categories'] = cats;
            $http.post('/questions/'+q.id+'/setCategories', params).then(function(){log(arguments)});
        },
//        addCategoryToQuestion: function(question,categoryName,cb){
//            params = {categoryName: categoryName};
//            params['authToken'] = AuthService.currentUser.authToken;
//            $http.post('/questions/'+question.id+'/addCategory', params).then(cb);
//        },
//        removeCategoryFromQuestion: function(question,categoryName,cb){
//            params = {categoryName: categoryName};
//            params['authToken'] = AuthService.currentUser.authToken;
//            $http.post('/questions/'+question.id+'/removeCategory', params).then(cb);
//        },
        signup: function(params, cb){ $http.post('/signup',params).then(cb); },
        login: function(params, cb){ $http.post('/login',params).then(cb); }
    };
});
//main controller
function commentsController($scope, Data){
    $scope.foo = "bar";

    //top-level comments. TODO: merge with bottom one
    $scope.submitNewComment = function(params,event){
        var that = this;
        var answer = params.answer;
        var params = {comment: this.newComment, answerId: params.aId, questionId: params.qId};
        var newComment = {text: that.newComment, owner: that.user, dateAdded: new Date()};
        answer.comments.unshift(newComment);
        Data.submitComment(params,function(){});
        that.newComment = "";
    }

    $scope.addSubComment = function(params, elem) {
        params['comment'] = params['newComment'];
        var newComment = this.getComment(params['newComment']);
        //add in client
        params.fatherComment.subcomments.unshift(newComment);

        //empty and close the textbox
        this.newReply = "";
        this.showMe = false;

        //add on server
        debugger
        Data.submitComment(params);
    }

    $scope.getComment = function(text){
        return {text: text || "foo bar"+Math.round(Math.random()*100),
                subcomments: [],
                owner: this.user,
                }
    }
}
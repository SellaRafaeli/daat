//main controller
function commentsController($scope, Data){
    $scope.foo = "bar";

    $scope.submitNewComment = function(params,event){
        var that = this;
        var answer = params.answer;
        var params = {comment: this.newComment, answerId: params.aId, questionId: params.qId};
        var newComment = {text: that.newComment, owner: that.user, dateAdded: new Date()};
        answer.comments.push(newComment);
        Data.submitComment(params,function(){});
        that.newComment = "";
    }

    $scope.addSubComment = function(params, elem) {
        var newComment = this.getComment(params['newComment']);
        //add in client
        fatherComment.subcomments.push(newComment);

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
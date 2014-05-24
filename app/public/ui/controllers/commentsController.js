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
}
/* Helpers */

function getRandomName(){
    var firstNames = ["יוסי", "משה", "דנה", "רחל", "לאה", "בן", "חיים", "אבי", "ראובן", "אלי" ];
    firstNames = firstNames.concat(["בן", "שירלי", "יורם", "איליה", "דימה", "שלום", "אריק", "ג'ודי"]);
    var lastNames = ["כהן", "לוי", "אהרונסון", "שמיר", "רבין", "פולישוק", "רובינסון", "אסייג", "נחמני"];
    lastNames = lastNames.concat(["נחמני", "יוכבד", "זמיר", "מאיר", "ישראלי", "ברק", "לייפציג", "רוזנבאום", "אסייג"]);
    return randFrom(firstNames)+" "+randFrom(lastNames);
}
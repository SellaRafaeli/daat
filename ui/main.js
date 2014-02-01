//var myApp = angular.module('myApp', ['ngRoute']);
var myApp = angular.module('myApp', ['ngRoute']);


myApp.config(['$routeProvider',
  function($routeProvider) {
    var base = '/ui/partials/';
    $routeProvider.
      when('/about', {
        templateUrl: base + 'about.html',        
      }).
      when('/hello', {
        templateUrl: base + 'hello.html',        
      }).
      when('/:type/:name', {
        templateUrl: base + 'qList.html',
        //controller: 'ShowOrdersController'
      }).
      otherwise({
        templateUrl: base + '/qList.html'
      });
  }]);

//hello


id = 0;
getQ = function(title,body,answers) {
    id = id+1;
    return {id: id, title: title, body: body, answers:answers}
}

getA = function(user,body){
    return {user: user, body: body};
}

//lorem_ipsums
lps=[];
lps.push('לקראת הבחירות לכנסת השתים עשרה בשנת 1988 שב נתניהו לישראל והצטרף למפלגת "הליכוד". בבחירות הפנימיות במרכז הליכוד זכה במקום החמישי ברשימה. הוא נבחר לכנסת ה-12 מטעם הליכוד, והתמנה לסגנו של שר החוץ משה ארנס ולאחר מכן דוד לוי. גם בתפקיד זה התבלט בהופעותיו התקשורתיות. בין לוי לנתניהו לא התקיים שיתוף פעולה, ונוצרו ניצני יריבות שרק הלכו והתעצמו לאחר מכן. בוועידת השלום במדריד בשנת 1991 נמנה נתניהו עם חברי המשלחת בראשות ראש הממשלה יצחק שמיר. לאחר ועידת מדריד עבר מתפקידו כסגן שר החוץ, והחל לכהן כסגן שר במשרד ראש הממשלה. אחרי מפלת הליכוד בבחירות 1992 בראשות יצחק שמיר, התמודד נתניהו ב-1993 בבחירות הפנימיות לראשות המפלגה, להחלפת יצחק שמיר, שפרש מתפקידו. נתניהו זכה בהן ברוב קולות מול דוד לוי, בני בגין ומשה קצב. במהלך מסע הבחירות הפנימיות, התפרסמה "פרשת הקלטת הלוהטת". בהופעה טלוויזיונית, בשעת צפיית שיא במהדורת "מבט", טען נתניהו כי "בכיר בליכוד המוקף חבורת פושעים" ניסה לסחוט אותו באמצעות קלטת וידאו שזכתה בתקשורת לכינוי "הקלטת הלוהטת", ובה הוא נראה בוגד באשתו. הרמיזה כלפי דוד לוי ואנשיו כאחראים לפרשה העמיקה עוד יותר את הקרע בין השניים. הקלטת לא נמצאה, ולימים התנצל נתניהו על דבריו כלפי לוי.');

lps.push('De finibus bonorum et malorum (On the ends of good and evil) is a philosophical work by the Roman orator, politician and philosopher Marcus Tullius Cicero. It consists of five books, in which Cicero explains the philosophical views of Epicureanism, Stoicism, and the Platonism of Antiochus of Ascalon. The book was developed in the summer of the year 45 BC within about one and a half months. Together with the Tusculanae Quaestiones written shortly afterwards, De finibus is the most extensive philosophical work of Cicero. It is dedicated to Marcus Junius Brutus.');
lps.push('The terms foobar (/ˈfuːbɑr/), fubar, or foo, bar, baz and qux (alternatively, quux) are sometimes used as placeholder names (also referred to as metasyntactic variables) in computer programming or computer-related documentation.[1] They have been used to name entities such as variables, functions, and commands whose purpose is unimportant and serve only to demonstrate a concept. The words themselves have no meaning in this usage. Foobar is sometimes used alone; foo, bar, and baz are sometimes used, when multiple entities are needed. The usage in computer programming examples and pseudocode varies; in certain circles, it is used extensively, but many prefer descriptive names, while others prefer to use single letters. Eric S. Raymond has called it an "important hackerism" alongside kludge and cruft.[2]');


qList = [
getQ('מה הייתה הקלטת הלוהטת?','ואיך היא השפיעה על הליכוד?',[getA("משה כהן",lps[0]), getA("יוסי מזרחי",lps[1])]),
getQ('Which university is the best?', 'Technion? Hebrew U?', 
    [getA("Yossi",'I don\'t know where to go to school'),
    getA("Moshe",'Hebrew University'),
    getA("Haim",'Technion')]),
getQ('Who do you think should be president?', 'Dalya Itzik? Shechtman?', 
    [getA("Moshe",'I think it should be Fuad'),
    getA("Haim",'Yair Lapid!')])            
]

myApp.factory('Data', function() {
    return {
        message: 'new data from a service',
        qList: qList,
        get: function(type,name){
            console.log("getting "+type+" + "+name);
            return {qList: qList}
        }
    };
});

function FirstCtrl($scope, Data) {      
    $scope.data = Data;
}


function qListCtrl($scope, Data, $routeParams){
     
    $scope.foo = 'bar'; 
    $routeParams.orderId
    $scope.route_type = $routeParams.type
    $scope.route_name = $routeParams.name
    $scope.data = Data.get($scope.route_type, $scope.route_name);
    $scope.submitAnswer = function(qid, myAnswer){
        alert("submitting my answer to qID"+qid+": "+myAnswer);
    }
}
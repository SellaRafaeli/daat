function appController($scope, Data, $routeParams, AuthService){
    appCtrl = $scope; //global scope for debugging
    $scope.alert = function(s){ alert(s)};
    $scope.log = function(s) { console.log(s) };
    $scope.ping = function(){log('pinging'); Data.ping()};
    $scope.eng = {foo: 'some-foo',
                    addQuestion: 'Add Question',
                    about: 'About',
                    main: 'Main',
                    login: 'Login',
                    logout: 'Logout',
                    changeUser: 'Change User',
        enterNewQuestion: 'Enter new question',
        myQuestionPlaceholder: 'My question is...',
        categoriesLabelHead: 'Categories - ',
        categoriesLabelTail: 'At least 3, separated by commas',
        add: 'Add!',
        relatedQuestions: 'Related Questions',
        sendMyAnswer: 'Send!',
        yourExperiencePlaceholder: 'What is your experience in this topic?',
        addCategoryText: 'Add Category',
    doneEditCats: 'Done',
    editCats: 'Edit',
    textEmail: "Email",
    textFullName: "Full name",
    textPassword: "Password (optional)",
    separatedByCommas: "separated by commas",
    loginImage: "Link to your image (optional)",
    answerWrittenAt: "Written",
    editAnswer: "Edit",
    saveEditAnswer: "Save"
};

    $scope.heb = {foo: 'heb-foo',
                  addQuestion: 'הוסף שאלה',
                  about: 'אודות',
                  main: 'ראשי',
                  login: 'להיכנס',
                  logout: 'לצאת',
                  changeUser: 'להחליף משתמש',
        enterNewQuestion: 'הכניסו שאלה חדשה',
        myQuestionPlaceholder: 'השאלה שלי...',
        categoriesLabelHead: 'קטגוריות - ',
        categoriesLabelTail: 'לפחות 3, מופרדות בפסיקים',
        add: 'הוסף!',
        relatedQuestions: 'שאלות דומות',
        sendMyAnswer: 'שלח!',
        yourExperiencePlaceholder: 'מה הניסיון שלך בנושא הזה?',
        addCategoryText: "הוסף קטגוריה",
        doneEditCats: "סיימתי",
        editCats: "ערוך",
        textEmail: "אימייל",
        textFullName: "שם מלא",
        textPassword: "סיסמא (לא חובה)",
        separatedByCommas: "להפריד עם פסיקים",
        loginImage: "לינק תמונה (לא חובה)",
        answerWrittenAt: "נכתב",
        editAnswer: "לערוך",
        saveEditAnswer: "לשמור"
}

    $scope.texts = $scope.heb;
    //$scope.texts = $scope.eng;
    moment.lang('he');
    $scope.setHeb = function(lang) { $scope.texts = $scope.heb; $scope.$apply(); };
    $scope.setEng = function() { moment.lang('en'); $scope.texts = $scope.eng; $scope.$apply(); };


    $scope.$watch(function () { return AuthService.currentUser; },                       
        function(newVal, oldVal) {
        $scope.currentUser = newVal.fullName;
        newVal.fullName ? $scope.texts.login = $scope.texts.changeUser : $scope.texts.login=$scope.texts.login;
        }, true);
};
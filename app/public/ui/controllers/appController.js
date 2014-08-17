function appController($scope, Data, $routeParams, AuthService){
    appCtrl = $scope; //global scope for debugging
    makeAdmin = function() { appCtrl.isAdmin = true; appCtrl.$apply(); };
    $scope.alert = function(s){ alert(s)};
    $scope.log = function(s) { console.log(s) };
    $scope.disableElemTemp = function(elem,millisecs) { $(elem).attr('disabled','true'); setTimeout(function(){$(elem).removeAttr('disabled')},(millisecs || 2000)) } //1. extract to some module?

    $scope.ping = function(){log('pinging'); Data.ping()};

    $scope.eng = {foo: 'some-foo',
        brand: 'Daat',
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
    saveEditAnswer: "Save",
        fbLoginButtonText: "Login With Facebook",
        welcomeToSite: "Welcome to ",
        welcomeToSiteDesc: "the best Hebrew content site on the web.",
    commentsLink: 'Comments',
    sendCommentBtn: 'Send',
    like: "Like",
    unlike: "Unlike",
    about: "About",
    events: "Events"
};

    $scope.heb = {foo: 'heb-foo',
        brand: 'דעת',
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
        sendMyAnswer: 'הוסף!',
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
        editAnswer: "ערוך",
        saveEditAnswer: "שמור",
        fbLoginButtonText: "להיכנס עם פייסבוק",
        welcomeToSite: "ברוכים הבאים ל",
        welcomeToSiteDesc: 'אתר התוכן הטוב ביותר בעברית',
        commentsLink: 'תגובות',
        sendCommentBtn: 'שלח',
        like: "לייק",
        unlike: "בטל לייק",
        about: "אודות",
        events: "פיד"
}

    $scope.texts = $scope.heb;
    //$scope.texts = $scope.eng;
    moment.lang('he');
    $scope.setHeb = function() { moment.lang('he'); $scope.texts = $scope.heb; $scope.$apply(); };
    $scope.setEng = function() { moment.lang('en'); $scope.texts = $scope.eng; $scope.$apply(); };


    //todo: aaargh... clear up this user mess.
    $scope.$watch(function () { return AuthService.currentUser; },                       
        function(newVal, oldVal) {
        $scope.currentUser = newVal.fullName;
        newVal.fullName ? $scope.texts.login = $scope.texts.changeUser : $scope.texts.login=$scope.texts.login;
        }, true);

    $scope.username = function(){ return AuthService.currentUser.fullName };
    $scope.user = AuthService.currentUser;

    $scope.getConfig = function() { return clientConfig; }
    $scope.normalDate = normalDate;

};
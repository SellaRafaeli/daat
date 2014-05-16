var myStrings = angular.module('myStrings', []);

// or something like this if needed
myStrings.value('heb',
    {foo: 'פו',
        bar: 'בר'
    });


var myApp = angular.module('myApp', ['ngRoute','ui.bootstrap','textAngular', 'myStrings','infinite-scroll']);

id = 0;

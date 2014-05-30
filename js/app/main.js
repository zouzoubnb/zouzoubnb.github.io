var app = angular.module('myApp', []);

app.controller('MainCtrl', function ($rootScope) {
    $rootScope._ = function(key){
        console.log('key', key);
    };


});

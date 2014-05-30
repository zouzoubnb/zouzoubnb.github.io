var app = angular.module('myApp', []);

app.controller('MainCtrl', function ($rootScope) {
    var getCurrentLang, getQueryParam;

    getQueryParam = function(name) {
      var currentQueryParams;
      currentQueryParams = new URI().query(true);
      return currentQueryParams[name];
    };

    window.getQueryParam = getQueryParam;

    getCurrentLang = function() {
      var lang;
      lang = getQueryParam("lang");
      if (lang) {
        return lang.replace("-", "_");
      } else {
        return void 0;
      }
    };

    window.getCurrentLang = getCurrentLang;


    $rootScope._ = function(key){
        console.log('key', key);
        console.log('getCurrentLang', getCurrentLang());

    };


});

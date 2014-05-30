function MainCtrl($rootScope) {
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


    $rootScope.lang = getCurrentLang();

    $rootScope._ = function(key){
        var lang = getCurrentLang();

        if (LANGPACK && LANGPACK[lang] && LANGPACK[lang][key]){
            return LANGPACK[lang][key];
        }else{
            return key;
        }
    };
}

function MainCtrl($rootScope) {
    var FB_PAGE_FEEDS_API_URL = "https://zouzoube.herokuapp.com/feeds";
    //var FB_PAGE_FEEDS_API_URL = "http://localhost:8080/feeds";
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
        return 'zh_TW';
        // var lang_browser = getCurrentLangByBrowserSettings();
        // console.log('browser lang:', lang_browser);
        // switch(lang_browser){
        //     case 'zh':
        //     case 'zh_TW':
        //         return 'zh_TW';
        //         break;
        //     default:
        //         return 'en';
        //         break;
        // }
      }
    };

    getCurrentLangByBrowserSettings = function(){
        var lang = window.navigator.userLanguage || window.navigator.language;
        return lang;
    }

    window.getCurrentLang = getCurrentLang;


    window.openWindow = function(url){
        window.open(
          url,
          '_blank'
        );
    };


    $rootScope.lang = getCurrentLang();

    $rootScope._ = function(key){
        var lang = getCurrentLang();

        if (LANGPACK && LANGPACK[lang] && LANGPACK[lang][key]){
            return LANGPACK[lang][key];
        }else{
            return key;
        }
    };

    $rootScope.currentYear = function(){
        return new Date().getFullYear();
    }();

    $rootScope.blog_posts = [];

    getFBPageFeeds = function(){
        console.log('Getting Feeds...')
        $.ajax({
            url: FB_PAGE_FEEDS_API_URL,
            method: 'get',
            dataType: "json"
        })
        .done(function (data) {
            console.log(data.data);
            var feeds = data.data;
            for (var i=0; i<4; i++) {
                var item = {
                    title: feeds[i].message,
                    date: new Date(feeds[i].created_time),
                    img_url: feeds[i].picture || '' ,
                    post_url: feeds[i].attachments && feeds[i].attachments.data && feeds[i].attachments.data[0] && feeds[i].attachments.data[0].url,
                };
                $rootScope.blog_posts.push(item);
            }

            $rootScope.$apply();
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("complete");
        });
    }

    changeRoomBg = function(obj){
        console.log("mouseover", obj);
        obj = $(obj);
        if (obj && obj.attr('data-rel')){
            var url = obj.attr('data-rel');
        }else{
            return;
        }

        console.log('bg_img_url', url);
        $('#lbImage').css("background-image", "url("+url+")"); 
    }
    
    getFBPageFeeds();
}

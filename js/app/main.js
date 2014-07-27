function MainCtrl($rootScope) {
    var BLOG_API_URL = "http://api.tumblr.com/v2/blog/zouzoubnb.tumblr.com/posts";
    var BLOG_API_KEY = "YT6dJznWbZF0VtgHTNRZD5BRHUkM3VkC7GkXfIvpt1WtPuyra8";
    var BLOG_TAG = "ZOUZOU_HOME";
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

    $rootScope.blog_posts = [];

    getBlogRss = function(){
        $.ajax({
             url: BLOG_API_URL,
             method: 'get',
             data : ({
                 api_key: BLOG_API_KEY,
                 tag: BLOG_TAG,
                 jsonp: 'processBlogData'
             }),
             dataType: "jsonp"
         });
    }

    processTags = function(tags){
        var tags_str = "";
        for(var i=0; i<tags.length; i++){
            if(tags[i]!==BLOG_TAG){
                tags_str = tags_str + ", " + BLOG_TAG;
            }
        }

        if (tags_str.slice(0,2) === ", "){
            tags_str = tags_str.slice(2);
        }else if(tags_str==""){
            return null;
        }
        return tags_str;
    }

    getImgUrlFromBlogBody = function(blog_body){
        m = blog_body.match(/<img\b[^>]+?src\s*=\s*['"]?([^\s'"?#>]+)/);
        if(m && m.length > 1){
            return m[1];
        }else{
            return null;
        }
    }

    processBlogData = function(data) {
        console.log(data.response);
        if (data.response && data.response.posts){
            posts = data.response.posts;
            for(var i=0; i<posts.length; i++){
                var item = {title: posts[i].title, date: new Date(posts[i].timestamp*1000),  img_url: getImgUrlFromBlogBody(posts[i].body), post_url: posts[i].post_url, tags: processTags(posts[i].tags)};
                $rootScope.blog_posts.push(item);
            }
        }
        $rootScope.$apply(); 
    }

    getBlogRss();

}

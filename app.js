(function () {
    'use strict';
    var app = angular.module('campture', ['ui.bootstrap', 'ngRoute', 'ngCookies', 'uiGmapgoogle-maps', 'ngAutocomplete', 'dropzone', 'FacebookPatch']);
    app.run(['$cookies', '$rootScope', '$window', '$location',
        function ($cookies, $rootScope, $window, $location) {
            Parse.initialize("hqRCJWWJJhduQBOceJYMnKUh8rt5prJ2WyUfDkmp", "M7ZPrFMJoEopzBvOGCmynUbN5qwedkTeY32hFmpy");
            $rootScope.fbInit = false;
            $window.fbAsyncInit = function () {

                Parse.FacebookUtils.init({

                    // pro-tip: swap App ID out for PROD App ID automatically on deploy using grunt-replace
                    appId: 1672690479656185, // Facebook App ID //test1:933421053397857 test2: 1672690479656185 
                    channelUrl: 'js/facebook/channel.html', // Channel File
                    cookie: true, // enable cookies to allow Parse to access the session
                    xfbml: true, // parse XFBML
                    frictionlessRequests: true // recommended

                });
                $rootScope.fbInit = true;

                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected' && $cookies.get('userId') !== undefined) {

                    }
                });
            }

        } ]);



})();
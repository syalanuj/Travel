(function () {
    'use strict';

    var app = angular.module('campture');

    app.controller('HeaderCtrl', ['$scope', '$cookies', '$rootScope', 'TourService', '$location', 'AccountService', controller]);
    function controller($scope, $cookies, $rootScope, tourService, $location, accountService) {
        //====== Scope Variables==========
        //================================
        //$rootScope.travelStyles;
        //$rootScope.topStates;
        //$rootScope.activities;
        $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));

        $rootScope.loginWithFacebook = function () {
            Parse.FacebookUtils.logIn(null, {
                success: function (user) {
                    if (!user.existed()) {
                        $scope.userObj = Parse.User.current();
                        $scope.$apply();
                    } else {
                        $scope.userObj = Parse.User.current();
                        $scope.$apply();
                    }
                    accountService.getMyProfile().then(function (response) {
                        accountService.updateUserFacebookProfile(response, $scope.userObj.id, function (data) {
                            $scope.$apply(function () {
                                if (data) {
                                    var x = data;
                                }
                            });
                        });
                    });
                        
                    $location.path("/");
                },
                error: function (user, error) {
                    alert("Cancelled");
                }
            });
        };

        $rootScope.logout = function () {
            Parse.User.logOut();
            $scope.userObj = Parse.User.current();
            $location.path("/");
        };

        //Main app
        //tourService.getTravelStyles(function (data) {
        //    $scope.$apply(function () {
        //        $rootScope.travelStyles = data;
        //    });
        //});
        //tourService.getTopStates(function (data) {
        //    $scope.$apply(function () {
        //        $rootScope.topStates = data;
        //    });
        //});
        //tourService.getActivities(function (data) {
        //    $scope.$apply(function () {
        //        $rootScope.activities = data;
        //    });
        //});
    };
})();
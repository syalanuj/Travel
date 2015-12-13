(function () {
    'use strict';

        var app = angular.module('campture');

    app.controller('HeaderCtrl', ['$scope', '$cookies', '$rootScope', 'TourService', '$location', 'AccountService','$routeParams', controller]);
    function controller($scope, $cookies, $rootScope, tourService, $location, accountService, $routeParams) {
        //====== Scope Variables==========
        //================================
        //$rootScope.travelStyles;
        //$rootScope.topStates;
        //$rootScope.activities;
        $routeParams.tripId;
        $scope.userObj = Parse.User.current();

//        $scope.$watch('$routeParams', function (newValue, oldValue) {
//            accountService.getTripById($routeParams.tripId, function (data) {
//                $scope.$apply(function () {
//                    $scope.newObj = data.user;
//                });
//            });
//        });


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
                    console.log("Cancelled");
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
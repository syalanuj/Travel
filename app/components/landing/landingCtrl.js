(function () {
    'use strict';

    var app = angular.module('campture');
    app.controller('LandingCtrl', ['$scope', '$cookies', '$rootScope', 'AccountService', controller]);
    function controller($scope, $cookies, $rootScope, accountService) {
        //====== Scope Variables==========
        //================================
        $scope.myTrips;
        $scope.allTrips;
        $scope.newsFeedTrips;
        $scope.newTrip;
        $scope.userObj = Parse.User.current();
        $scope.isPostSuccessful = false;
        $scope.query = {};
        $scope.queryBy = '$';


        //Setting header
        var header = $('header.header-img');
        if(header) {
            header.removeClass('header-img');
            header.addClass('home-img');
            $('.intro-wrap').show();
            $('.timeline-wrap').addClass('hidden');
        }
        /*-----------*/

        accountService.getAllTrips(function (data) {
            $scope.$apply(function () {
                $scope.allTrips = data;
            });
        });

        $scope.postTrip = function () {
            accountService.postTrip($scope.newTrip, function (data) {
                $scope.$apply(function () {
                    if (data) {
                        $scope.newTrip = undefined;
                        $scope.isPostSuccessful = true;
                    }
                });
            });
        };
    };
})();
(function () {
    'use strict';

    var app = angular.module('campture');
    app.controller('MyProfileCtrl', ['$scope', '$cookies', '$rootScope', 'AccountService', 'uiGmapIsReady', controller]);
    function controller($scope, $cookies, $rootScope, accountService, uiGmapIsReady) {
        //====== Scope Variables==========
        //================================      
        $scope.myTrips;
        $scope.allTrips;
        $scope.newsFeedTrips;
        $scope.newTrip;
        $scope.userObj = Parse.User.current();
        $scope.isPostSuccessful = false;
        $scope.allMarkers = new Array();

        //MAP
        $scope.map = { center: { latitude: 21.0000, longitude: 78.0000 }, zoom: 4 };

        accountService.getMyTrips($scope.userObj.id, function (data) {
            $scope.$apply(function () {
                var markerId = 0;
                $scope.myTrips = data;
                angular.forEach($scope.myTrips, function (trip, key) {
                    angular.forEach(trip.visited_places, function (place, key) {
                        $scope.allMarkers.push({ latitude: place.coordinates.latitude, longitude: place.coordinates.longitude, title: place.location, id: markerId })
                        markerId++;
                    });
                });
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
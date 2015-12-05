(function () {
    'use strict';

    var app = angular.module('campture');
    app.controller('ProfileCtrl', ['$scope', '$cookies', '$rootScope', 'AccountService', 'uiGmapIsReady', '$routeParams', controller]);
    function controller($scope, $cookies, $rootScope, accountService, uiGmapIsReady, $routeParams) {
        //====== Scope Variables==========
        //================================      
        $scope.myTrips;
        $scope.newTrip;
        $scope.userObj;
        $scope.isPostSuccessful = false;
        $scope.allMarkers = new Array();
        $routeParams.userId;
        $scope.userObj;
        $scope.currentUserObj = Parse.User.current();
        $scope.isMyProfile = false;
        //MAP
        $scope.map = { center: { latitude: 21.0000, longitude: 78.0000 }, zoom: 4 };

        accountService.getMyTrips($scope.currentUserObj.id, function (data) {
            if (data.length > 0) {
                $scope.$apply(function () {
                    var markerId = 0;
                    $scope.userObj = data[0].user;
                    $scope.myTrips = data;
                    angular.forEach($scope.myTrips, function (trip, key) {
                        angular.forEach(trip.visited_places, function (place, key) {
                            $scope.allMarkers.push({ latitude: place.coordinates.latitude, longitude: place.coordinates.longitude, title: place.location, id: markerId })
                            markerId++;
                        });
                    });
                });
            }
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
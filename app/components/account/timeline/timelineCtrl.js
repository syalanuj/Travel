(function () {
    'use strict';

    var app = angular.module('campture');
    app.controller('TimelineCtrl', ['$scope', '$cookies', '$rootScope', '$routeParams', 'uiGmapIsReady', 'AccountService', 'TripService', controller]);
    function controller($scope, $cookies, $rootScope, $routeParams, uiGmapIsReady, accountService, tripService) {
        //====== Scope Variables==========
        //================================
        $routeParams.tripId;
        $scope.userObj = Parse.User.current();
        $scope.myProfile = $scope.userObj.get("facebook_profile");
        $scope.tripTabIndex = 0;
        $scope.allMarkers = new Array();


        accountService.getTripById($routeParams.tripId, function (data) {
            $scope.$apply(function () {
                $scope.trip = data;
                var markerId = 0;
                angular.forEach($scope.trip.visited_places, function (place, key) {
                    $scope.allMarkers.push({ latitude: place.coordinates.latitude, longitude: place.coordinates.longitude, title: place.location, id: markerId })
                    markerId++;
                });
                $scope.map = { center: { latitude: $scope.allMarkers[0].latitude, longitude: $scope.allMarkers[0].longitude }, zoom: 4 };
                $scope.polylines = [
                    {
                        id: 1,
                        path: $scope.allMarkers,
                        stroke: {
                            color: '#f56c35',
                            weight: 3
                        },
                        editable: false,
                        draggable: false,
                        geodesic: false,
                        visible: true,
                        icons: [{
                            icon: {
                                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
                            },
                            offset: '25px',
                            repeat: '50px'
                        }]
                    }
                    ];
            });
        });

        $scope.updateTripTabPos = function (pos) {
            $scope.tripTabIndex = pos;
        }
        $scope.likeTrip = function () {
            $scope.trip.total_likes++;
            var likeObj = {
                trip_pointer: $routeParams.tripId,
                user_pointer: $scope.userObj.id
            }
            tripService.tripLike($scope.trip.total_likes,likeObj, function (data) {
                if (data) {
                    var x = data;
                }
                else {
                    $scope.trip.total_likes--;
                }
            });
        };
        $scope.unlikeTrip = function () {
            $scope.trip.total_likes--;
            var likeObj = {
                trip_pointer: $routeParams.tripId,
                user_pointer: $scope.userObj.objectId
            }
            tripService.tripUnlike(likeObj, function (data) {
                if (data) {
                    var x = data;
                }
                else {
                    $scope.trip.total_likes--;
                }
            });
        };
        $scope.isMyTripTimeline = function () {
            if ($scope.trip.user.id == userObj.id) {
                return true;
            }
            else {
                false;
            }
        }
        //Map
        $scope.map = { center: { latitude: 21.0000, longitude: 78.0000 }, zoom: 4 };


        //Comments and Likes
        $scope.getTripComments = function () {
            tripService.getTripComments($routeParams.tripId, function (data) {
                $scope.$apply(function () {
                    if (data) {
                        $scope.tripComments = data;
                    }
                });
            });
        }
        $scope.postComment = function () {
            var myComment = {
                trip_pointer: $routeParams.tripId,
                user_pointer: $scope.userObj.id,
                text: $scope.myCommentText
            }
            tripService.postComment(myComment, function (data) {
                $scope.$apply(function () {
                    if (data) {
                        $scope.myCommentText = undefined;
                        $scope.getTripComments();
                    }
                });
            });
        }
        $scope.getTripComments();
    };
})();
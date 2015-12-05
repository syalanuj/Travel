(function () {
    var app = angular.module('campture');
    app.directive('profileWrap', function () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/account/profile/profileWrap.html',
            scope: {
                files: '=',
                user: '='
            },
            controller: ['$scope', '$cookies', '$rootScope', '$q', 'AccountService', '$window', '$location', '$routeParams', function ($scope, $cookies, $rootScope, $q, accountService, $window, $location, $routeParams) {
                $scope.$watch('user', function (newValue, oldValue) {
                    if(newValue){
                    $scope.userObj = newValue;
                    $scope.currentUserObj = Parse.User.current();
                    $scope.isMyProfile = false;
                    $rootScope.profileTabPos = 0;
                        if ($scope.userObj.id == $scope.currentUserObj.id) {
                            $scope.isMyProfile = true;
                        }   
                        else {
                            $scope.isMyProfile = false;
                        }
                        if ($scope.userObj.facebook_profile) {
                            $scope.myProfile = $scope.userObj.facebook_profile;
                        }
                    }
                });
                
                $scope.updateprofileTabPos = function (pos) {
                    $rootScope.profileTabPos = pos;
                    $location.path('/account/profile/' + $scope.userObj.id);
                }

            } ]
        };
    });
})();
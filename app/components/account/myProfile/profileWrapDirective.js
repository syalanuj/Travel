(function () {
    var app = angular.module('campture');
    app.directive('profileWrap', function () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/account/myProfile/profileWrap.html',
            scope: {
                files: '='
            },
            controller: ['$scope', '$cookies', '$rootScope', '$q', 'AccountService', '$window', '$location', function ($scope, $cookies, $rootScope, $q, accountService, $window, $location) {
                $rootScope.profileTabPos = 0;
                $rootScope.profileDetails;
                $scope.userObj = Parse.User.current();
                $scope.myProfile = $scope.userObj.get("facebook_profile");
                $scope.updateprofileTabPos = function (pos) {
                    $rootScope.profileTabPos = pos;
                    $location.path('/account/myProfile/');
                }

            } ]
        };
    });
})();
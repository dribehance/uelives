angular.module("Uelives").controller("onlineBookingController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.input.gender = 1;
    $scope.select_gender = function(gender) {
        $scope.input.gender = gender;
    };

    $scope.input.check = 0;
    $scope.check = function(n) {
        $scope.input.check=n

    };
})
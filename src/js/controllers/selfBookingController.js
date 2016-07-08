angular.module("Uelives").controller("selfBookingController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.input.gender = 1;
    $scope.select_gender = function(gender) {
        $scope.input.gender = gender;
    };
})
angular.module("Uelives").controller("selfBookingController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.input.gender = 1;
    $scope.select_gender = function(gender) {
    	
        $scope.input.gender = gender;
    };
    $scope.model = {
        status: 0
    };
    $scope.go = function() {

        $scope.model.status = 1;
    }
    $scope.cancel = function() {
        $scope.model.status = 0;
    }
    
})
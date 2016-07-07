angular.module("Uelives").controller("editBasicInfoController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.input={

	}
	$scope.input.gender = 1;
	$scope.select_gender=function(n){
		$scope.input.gender=n;
	}
	$scope.input.type = 1;
	$scope.select_type=function(n){
		$scope.input.type=n;
	}
})
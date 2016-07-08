angular.module("Uelives").controller("interpreterLevelController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.input={}
	$scope.input.check='1';
	$scope.check=function(n){
		$scope.input.check=n;
	}
})
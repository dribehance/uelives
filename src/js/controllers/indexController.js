// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("indexController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.input.city = localStorageService.get("city") || "深圳";
	$scope.input.language = localStorageService.get("language") || {
		from: "中文"
	};
	$scope.input.scene = localStorageService.get("scene") || [];
	$scope.input.days = "";
	$scope.input.industry = localStorageService.get("industry") || "";
	$scope.input.gender = 0
    $scope.select_gender = function(n) {
    	
        $scope.input.gender = n;
    };
})
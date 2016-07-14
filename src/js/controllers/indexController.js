// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("indexController", function($scope, $location, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.input.city = "深圳";
	$scope.input.language_from = "中文";
	$scope.input.language_to = "";
	$scope.input.scene = "";
	$scope.input.schedule_from = ""
	$scope.input.gender = "不限";
	if (localStorageService.get("cache")) {
		$scope.input = angular.extend({}, $scope.input, localStorageService.get("cache"));
	}
	$scope.select_gender = function(n) {
		$scope.input.gender = n;
	};
	$scope.cache_and_go = function(path, key) {
		localStorageService.set("cache", $scope.input);
		$location.path(path).search("cache_key", key);
	}
})
// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("indexController", function($scope, $filter, $location, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.input.city = "深圳";
	$scope.input.language = {
		from: "中文",
		to: ""
	}
	$scope.input.scenes = "";
	$scope.input.schedule_from = "";
	$scope.input.schedule_to = "";
	$scope.input.schedule_total = "";
	$scope.input.industry = "";
	$scope.input.gender = "不限";
	$scope.select_gender = function(n) {
		$scope.input.gender = n;
	};
	$scope.format_time = function(time, format) {
		return $filter("date")(time, format)
	}
	$scope.cache_and_go = function(path, key) {
		localStorageService.set("cache", $scope.input);
		$location.path(path).search("cache_key", key);
	}
	var cache = localStorageService.get("cache");
	if (cache) {
		$scope.input = angular.extend({}, $scope.input, cache);
		$scope.input.choice_time && ($scope.input.schedule_from = $scope.format_time($scope.input.choice_time[0], "MM-dd"));
		$scope.input.choice_time && ($scope.input.schedule_to = $scope.format_time($scope.input.choice_time[$scope.input.choice_time.length - 1], "MM-dd"));
		$scope.input.choice_time && ($scope.input.schedule_total = $scope.input.choice_time.length)
	}
})
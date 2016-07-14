angular.module("Uelives").controller("languagesController", function($scope, $routeParams, $rootScope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	//获取语言
	userServices.query_language().then(function(data) {
		$scope.languages = data;
	});
	//A  同类城市列表字体颜色转换
	$scope.select_language = function(language) {
		$scope.input.tag = language;
		var cache = localStorageService.get("cache");
		if (cache && $routeParams.cache_key) {
			cache[$routeParams.cache_key] = language;
			localStorageService.set("cache", cache)
		}
		$rootScope.back();
	}
	$scope.parse_key = function(k) {
		return k.substring(0, 2)
	}
})
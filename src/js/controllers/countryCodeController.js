// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("countryCodeController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	toastServices.show();
	userServices.query_country_code().then(function(data) {
		toastServices.hide()
		$scope.country_codes = data;
	})
	var cache = localStorageService.get("cache");
	if (cache && cache[$routeParams.cache_key]) {
		$scope.input.country_code = cache[$routeParams.cache_key];
	}

	$scope.select_country_code = function(t) {
		$scope.input.country_code = t;
		localStorageService.set("cache", angular.extend({}, cache, $scope.input))
		$rootScope.back();
	}
})
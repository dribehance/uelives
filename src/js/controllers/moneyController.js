angular.module("Uelives").controller("moneyController", function($scope, $rootScope, $timeout, $location, $filter, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
    var cache = localStorageService.get("cache");
    $scope.input = cache;
    $scope.ajaxForm = function() {
        if (cache && $routeParams.cache_key) {
            cache[$routeParams.cache_key] = $scope.input.pay_day;
            localStorageService.set("cache", cache);
        }
        $rootScope.back();
    }

})
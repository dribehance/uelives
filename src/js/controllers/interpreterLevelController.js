angular.module("Uelives").controller("interpreterLevelController", function($scope, $rootScope, $timeout, $location, $filter, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
    var cache = localStorageService.get("cache");
    $scope.input = cache;
    $scope.check = function(name) {
        $scope.input.translate_level = name;
        if (cache && $routeParams.cache_key) {
            cache[$routeParams.cache_key] = $scope.input.translate_level;
            localStorageService.set("cache", cache);
        }
        $rootScope.back();
    }
    toastServices.show();
    userServices.query_price().then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.price = data;
        } else {
            errorServices.autoHide(data.message);
        }
    })
})
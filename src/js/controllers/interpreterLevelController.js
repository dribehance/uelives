angular.module("Uelives").controller("interpreterLevelController", function($scope, $rootScope, $timeout, $location, $filter, $routeParams, errorServices, toastServices, localStorageService, config) {
    var cache = localStorageService.get("cache");
    $scope.input = cache;
    $scope.check = function(name) {

        $scope.input.translate_level = name;
        //缓存编辑信息
        
        if (cache && $routeParams.cache_key) {
            cache[$routeParams.cache_key] = $scope.input.translate_level;
            localStorageService.set("cache", cache);
        }
        $rootScope.back();
    }
    
})
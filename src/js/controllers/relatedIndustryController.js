angular.module("Uelives").controller("relatedIndustryController", function($scope, $routeParams, $rootScope, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {}

    $scope.select = function(industry) {
        industry.select = !industry.select
    }
    toastServices.show();
    userServices.query_industries().then(function(data) {
        var cache = localStorageService.get("cache");
        toastServices.hide();
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.industries = data.Result.TranslateFields;
            $scope.industries.map(function(industry) {
                if (cache && cache[$routeParams.cache_key] && cache[$routeParams.cache_key].indexOf(industry.name) != -1) {
                    industry.select = true
                }
                return industry;
            })
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.save = function() {
        var industries = $scope.industries.filter(function(industry) {
            return industry.select;
        }).map(function(industry) {
            return industry.name
        });
        if (industries.length == 0) {
            errorServices.autoHide("请选择擅长领域");
            return;
        }
        // 缓存编辑信息
        var cache = localStorageService.get("cache");
        if (cache && $routeParams.cache_key) {
            cache[$routeParams.cache_key] = industries.join("#")
            localStorageService.set("cache", cache);
        }
        $rootScope.back();
    }
})
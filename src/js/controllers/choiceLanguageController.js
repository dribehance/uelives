angular.module("Uelives").controller("choiceLanguageController", function($scope, $rootScope, $timeout, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.input.language = {
        from: "中文",
        to: ""
    }
    var cache = localStorageService.get("cache");
    if (cache && cache[$routeParams.cache_key]) {
        $scope.input.language = cache[$routeParams.cache_key];
    }
    // 1:源语言0目标语言
    $scope.input.choice = '0';
    //获取语言
    userServices.query_language().then(function(data) {
        $scope.languages = data;
    });
    // active tab
    $scope.query_language = function(n) {
        $scope.input.choice = n;
    };
    //A  同类城市列表字体颜色转换
    $scope.select_language = function(language) {
        $scope.input.tag = language;
        // 选择目标语言
        $scope.input.choice == '0' && ($scope.input.language.to = language);
        // 选择源语言
        $scope.input.choice == '1' && ($scope.input.language.from = language, $scope.input.choice = '0');
        if ($scope.input.language.from && $scope.input.language.to) {
            cache[$routeParams.cache_key] = $scope.input.language;
            localStorageService.set("cache", cache)
            $rootScope.back();
        }
    }
    $scope.query_inter_language = function(n) {
        userServices.query_language().then(function(data) {
            $scope.languages = data;
        })
        $scope.input.choice = n;
    }
    $scope.parse_key = function(k) {
        return k.substring(0, 2)
    }
})
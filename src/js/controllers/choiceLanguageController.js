angular.module("Uelives").controller("choiceLanguageController", function($scope, $rootScope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.language = localStorageService.get("language") || {
        "from": "中文"
    };
    // 1:源语言0目标语言
    $scope.input.choice = '0';
    //获取语言
    userServices.query_language().then(function(data) {
        $scope.languages = data;
    });
    // active tab
    $scope.query_language = function(n) {
        // userServices.query_language().then(function(data) {
        //     $scope.languages = data;
        // })
        $scope.input.choice = n;
    };
    //A  同类城市列表字体颜色转换
    $scope.select_language = function(language) {
        $scope.input.tag = language;
        $scope.input.choice == '1' && ($scope.language.from = language, localStorageService.set("language", $scope.language));
        $scope.input.choice == '0' && ($scope.language.to = language, localStorageService.set("language", $scope.language));
        if ($scope.language.from && $scope.language.to) {
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
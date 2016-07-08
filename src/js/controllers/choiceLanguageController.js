angular.module("Uelives").controller("choiceLanguageController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {}
    $scope.input.choice = '1';
    $scope.select_hot = function(tag) {
        $scope.input.tag = tag;
    }

    //A  同类城市列表字体颜色转换
    $scope.select_language = function(language) {
        $scope.input.tag = language
    }

    //获取语言
    userServices.query_language().then(function(data) {
        $scope.languages = data;
    })
    $scope.query_language = function(n) {
        userServices.query_language().then(function(data) {
            $scope.languages = data;
        })
        $scope.input.choice = n;
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
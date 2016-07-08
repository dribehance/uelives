angular.module("Uelives").controller("choiceCityController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {}
    $scope.input.choice = '1';

    $scope.select_hot = function(tag) {
        $scope.input.tag = tag;
    }

    //A  同类城市列表字体颜色转换
    $scope.select_city = function(city) {
        $scope.input.tag = city
    }

    //获取城市
    userServices.query_city().then(function(data) {
        $scope.cities = data;
    })
    $scope.query_city = function(n) {
        userServices.query_city().then(function(data) {
            $scope.cities = data;
        })
        $scope.input.choice = n;
    }
    $scope.query_inter_city = function(n) {
        userServices.query_inter_city().then(function(data) {
            $scope.cities = data;
        })
        $scope.input.choice = n;
    }

    //显示两个字
    $scope.parse_key = function(k) {
        return k.substring(0, 2)
    }

})
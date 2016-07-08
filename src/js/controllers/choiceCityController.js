angular.module("Uelives").controller("choiceCityController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {}
    $scope.input.choice = '1';
    $scope.choice = function(n) {
        $scope.input.choice = n;
    }

    // userServices.query_city().then(function(data) {
    //     $scope.cities = data.city;

    // });
    $scope.cities = ["北京", "上海", "广州", "深圳", "天津", "厦门", "长沙","呼和浩特", "武汉","成都","杭州","香港","西安","昆明","大连"];
    $scope.select = function(tag) {

        $scope.input.tag = tag
    }

    $scope.letters = ["热门", "A", "B", "C", "D", "E", "F","G","H","J","K","L","M","N","O","P","Q","R","S","T","W","X","Y","Z"];
})
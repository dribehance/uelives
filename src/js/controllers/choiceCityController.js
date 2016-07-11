 angular.module("Uelives").controller("choiceCityController", function($scope, $rootScope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
     $scope.input = {};
     $scope.input.tag = localStorageService.get("city") || "";
     // 1国内城市0国际城市
     $scope.input.choice = '1';
     //A  同类城市列表字体颜色转换
     $scope.select_city = function(city) {
         $scope.input.tag = city;
         localStorageService.set("city", city);
         $rootScope.back();
     };
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
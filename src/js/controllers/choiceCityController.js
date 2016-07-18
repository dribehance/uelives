 angular.module("Uelives").controller("choiceCityController", function($scope, $routeParams, $rootScope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
     $scope.input = {};
     $scope.input.tag = localStorageService.get("city") || "";
     // 1国内城市0国际城市
     $scope.input.choice = '1';
     //A  同类城市列表字体颜色转换
     $scope.select_city = function(city) {
         $scope.input.tag = city;
         // 缓存编辑信息
         var cache = localStorageService.get("cache");
         if (cache && $routeParams.cache_key) {
             cache[$routeParams.cache_key] = city;
             localStorageService.set("cache", cache);
         }
         $rootScope.back();
     };
     //获取城市
     $scope.query_city = function(n) {
         toastServices.show();
         userServices.query_city().then(function(data) {
             toastServices.hide();
             $scope.cities = data;
         })
         $scope.input.choice = n;
     }
     $scope.query_inter_city = function(n) {
         toastServices.show();
         userServices.query_inter_city().then(function(data) {
             toastServices.hide();
             $scope.cities = data;
         })
         $scope.input.choice = n;
     }
     $scope.query_city(1);
     //显示两个字
     $scope.parse_key = function(k) {
         return k.substring(0, 2)
     }

 })
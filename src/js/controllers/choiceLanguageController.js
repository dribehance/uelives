angular.module("Uelives").controller("choiceLanguageController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {}
    $scope.input.choice = '1';
    $scope.choice = function(n) {
        $scope.input.choice = n;
    }

    // userServices.query_city().then(function(data) {
    //     $scope.cities = data.city;

    // });
    $scope.languages = ["英语", "法语", "俄语", "意语", "德语", "日语","西班牙语","韩语","中文","阿拉伯语","葡萄牙语"];
    $scope.select = function(language) {

        $scope.input.language = language
    }

    $scope.letters = ["热门", "A", "B", "C", "D", "E", "F","G","H","J","K","L","M","N","O","P","Q","R","S","T","W","X","Y","Z"];
})
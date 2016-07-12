angular.module("Uelives").controller("editBasicInfoController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.input = {

    }
    $scope.input.options = {};
    $scope.input.gender = 1;
    $scope.select_gender = function(n) {
        $scope.input.gender = n;
    }
    $scope.input.type = 1;
    $scope.select_type = function(n) {
        $scope.input.type = n;
    }

    // if (!$scope.user.birthday) {
    //     $scope.input.birthday = $filter("date")(new Date(), "yyyy-MM-dd");
    //     $scope.input.options.value = $scope.input.birthday
    // } else {
    //     $scope.input.birthday = $scope.user.birthday;
    //     $scope.input.options.value = $scope.user.birthday;
    // }
    
    $scope.degrees = ["请选择", "大专", "本科", "硕士", "博士"];
    $scope.input.degree = $scope.degrees[0]
})
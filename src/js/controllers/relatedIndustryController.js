angular.module("Uelives").controller("relatredIndustryController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.tags = ["机械机电","汽车","家电","航空","化工","日常"];
    $scope.select = function(tag) {
		tag.select = !tag.select;
	}
})
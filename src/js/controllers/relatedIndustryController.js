angular.module("Uelives").controller("relatedIndustryController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.input={}
    $scope.tags = ["机械机电","汽车","家电","航空","化工","日常","进出口贸易"];
    $scope.select = function(tag) {
		tag.select = !tag.select;
	}
})
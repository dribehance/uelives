angular.module("Uelives").controller("relatedIndustryController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.input={}
    $scope.tags = ["机械机电","汽车","电子","航空","化工","IT通讯","进出口贸易","互联网","游戏","文化传媒","教育培训","影视","字幕","娱乐","体育","医疗健康","医疗设备","医药","食品","日化","建筑","房产","租赁","法律","专利","咨询","广告","金融","财经","矿产能源","水利"];
    $scope.select = function(tag) {
    	$scope.input.tag = tag
	}
	// $scope.tags = [{
	// 	name:"机械机电",
	// 	select:false
	// }]
})
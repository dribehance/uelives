angular.module("Uelives").controller("scenesController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.input={}
    $scope.tags = ["商务陪同","商务会谈","展会翻译","活动仪式","学术研讨","培训讲座","媒体访谈","新闻发布","节目录制","医疗美容","司法程序","政府会晤","会议同传","其他"];
    $scope.select = function(tag) {
    	$scope.input.tag = tag
	}
	// $scope.tags = [{
	// 	name:"机械机电",
	// 	select:false
	// }]
})
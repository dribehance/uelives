angular.module("Uelives").controller("onlinePreviewController", function($scope, $routeParams, $location, $rootScope, $filter, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	var share_url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/mobile/#/online_preview?type=2&id=" + $routeParams.id;
	$scope.input = {};
	toastServices.show();
	userServices.query_basicinfo({
		type: $routeParams.type,
		ta_user_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.user = data.Result.UserInfo;
			// 分享
			$rootScope.wx_browser && weixinServices.config().then(function() {
				weixinServices.initWeixinShareEvent("悠译翻译服务平台-" + $scope.user.nickname, share_url, $rootScope.staticImageUrl + $scope.user.image_01, "悠译，让世界沟通无限");
			})
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.format_time = function(time, format) {
		return $filter("date")(time, format)
	}
	$scope.replace_hash = function(hashs) {
		return hashs && hashs.replace(/#/g, "、");
	}
})
angular.module("Uelives").controller("onlinePreviewController", function($scope, $routeParams, $location, $rootScope, $filter, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
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
			var title = "【悠译】预约全球译员" + " " + $scope.user.nickname + "——" + $scope.user.city + " " + $scope.user.first_language + "翻译";
			var share_url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/mobile/#/interpreter_detail?type=2&id=" + $routeParams.id;
			var thumbnail = $rootScope.staticImageUrl + $scope.user.image_01;
			var summary = $scope.user.translate_level + "、" + $scope.user.translate_year + "翻译经验，" + $scope.user.mother_language + " 母语" + " | " + $scope.user.first_language + " " + $scope.user.first_language_level + " | " + $scope.user.second_language + " " + $scope.user.second_language_level + "，" + $scope.user.sex + " " + $scope.user.edu + "，" + $scope.user.good_field.split("#").filter(function(field, index) {
				return index < 3;
			}).join("、");
			$rootScope.wx_browser && weixinServices.config().then(function() {
				weixinServices.initWeixinShareEvent(title, share_url, thumbnail, summary);
			})
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.format_time = function(time, format) {
		if (time) {
			return time.split("-").join(".");
		}
	}
	$scope.replace_hash = function(hashs) {
		return hashs && hashs.replace(/#/g, "、");
	}
})
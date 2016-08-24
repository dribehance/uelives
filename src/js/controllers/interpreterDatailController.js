angular.module("Uelives").controller("interpreterDetailController", function($scope, $routeParams, $filter, $location, $rootScope, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	toastServices.show();
	userServices.query_basicinfo({
		type: "2",
		ta_user_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.user = data.Result.UserInfo;
			// 分享
			var title = "【悠译】预约全球译员" + $scope.user.nickname + "——" + $scope.user.city + " " + $scope.user.first_language + "翻译";
			var share_url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/mobile/#/interpreter_detail?type=2&id=" + $routeParams.id;
			var thumbnail = $rootScope.staticImageUrl + $scope.user.image_01;
			var summary = $scope.user.translate_level + "、" + $scope.user.translate_year + "，" + $scope.user.mother_language + " 母语" + " | " + $scope.user.first_language + " " + $scope.user.first_language_level + " | " + $scope.user.second_language + " " + $scope.user.second_language_level + "，" + $scope.user.sex + " " + $scope.user.edu + "，" + $scope.user.good_field.split("#").filter(function(field, index) {
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
	$scope.comments = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
		user_id: $routeParams.id
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_comments($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.total_score = data.comment_star;
				$scope.comments = $scope.comments.concat(data.Result.Comments.list);
				$scope.no_more = $scope.comments.length == data.Result.Comments.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "没有了";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
	$scope.go = function(id) {
		$location.path("online_booking").search({
			"id": $routeParams.id,
			"order_id": $routeParams.order_id
		})
	}
	$scope.replace_hash = function(hashs) {
		return hashs && hashs.replace(/#/g, "、");
	}
	$scope.cache_and_go = function(path, key) {
		localStorageService.set("cache", angular.extend({}, localStorageService.get("cache")), $scope.input);
		$location.path(path).search("cache_key", key);
	}
})
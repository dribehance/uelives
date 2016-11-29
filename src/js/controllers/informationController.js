angular.module("Uelives").controller("informationController", function($scope, $route, $rootScope, $filter, $location, $timeout, userServices, weixinServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	toastServices.show();
	userServices.query_basicinfo({
		type: "1",
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.user = data.Result.UserInfo;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.input.flow = {};
	// $scope.update_avatar = function() {
	// 	toastServices.show();
	// 	userServices.update_avatar({
	// 		fileName: $scope.input.flow.opts.query.filename
	// 	}).then(function(data) {
	// 		toastServices.hide()
	// 		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
	// 			errorServices.autoHide(data.message);
	// 		} else {
	// 			errorServices.autoHide(data.message);
	// 		}
	// 	})
	// }
	$scope.cache_and_go = function(path, key) {
		localStorageService.set("cache", $scope.input);
		$location.path(path).search("cache_key", key);
	}
	$scope.format_time = function(time, format) {
		if (time) {
			return time.split("-").join(".");
		}
	};
	$scope.replace_hash = function(hashs) {
		return hashs && hashs.replace(/#/g, "、");
	};
	$scope.preview = function() {
		$location.path("interpreter_detail").search({
			"id": $scope.user.user_id,
		});
		// toastServices.show();
		// userServices.preview().then(function(data) {
		// 	toastServices.hide()
		// 	if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
		// 		$location.path("online_preview").search("id", $scope.user.user_id);
		// 	} else {
		// 		errorServices.autoHide(data.message);
		// 	}
		// })
	};
	// remove cache
	localStorageService.remove("cache");
	$rootScope.wx_browser && weixinServices.config();
	// upload image
	$scope.choose_image = function() {
		weixinServices.choose_image({}, function(localIds) {
			// $scope.input.preview_disease_image = localIds[0];
			$scope.upload_image(localIds[0]);
		})
	}
	$scope.upload_image = function(localId) {
		weixinServices.upload_image({
			localId: localId
		}, function(serverId) {
			userServices.upload({
				"mediaId": serverId
			}).then(function(data) {
				if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
					// $scope.user.image_01 = data.filename;
					$route.reload();
				} else {
					errorServices.autoHide(data.message);
				}
			})
		})
	}
})
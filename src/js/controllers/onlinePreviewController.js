angular.module("Uelives").controller("onlinePreviewController", function($scope, $routeParams, $filter, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	toastServices.show();
	userServices.query_basicinfo({
		type: "2",
		ta_user_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.user = data.Result.UserInfo;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.format_time = function(time, format) {
		return $filter("date")(time, format)
	}

	$scope.skills = ["互联网x1","商务x1","商务合作x1"]
})

// x10
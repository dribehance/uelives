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
})
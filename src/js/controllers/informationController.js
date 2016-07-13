angular.module("Uelives").controller("informationController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.input.flow = {};
	$scope.update_avatar = function() {
		toastServices.show();
		userServices.update_avatar({
			fileName: $scope.input.flow.opts.query.filename
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
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
})
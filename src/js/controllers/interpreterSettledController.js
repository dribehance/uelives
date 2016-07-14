angular.module("Uelives").controller("interpreterSettledController", function($scope, $timeout, $location, userServices, errorServices, toastServices, localStorageService, config) {
	if (localStorageService.get("token")) {
		$location.path("information").replace();
	}
	$scope.input = {};
	// 验证码
	$scope.countdown = {
		// count: "5",
		message: "获取验证码",
	}
	$scope.countdown.callback = function() {
		toastServices.show();
		userServices.get_smscode({
			telephone: $scope.input.telephone
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message)
			} else {
				$scope.countdown.reset = true;
				// $scope.modal.status = 3;
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.signup({
			telephone: $scope.input.telephone,
			tel_code: $scope.input.code,
			weChat: $scope.input.wechat,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				localStorageService.set("token", data.token)
				$timeout(function() {
					$location.path("information").replace();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})
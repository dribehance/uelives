angular.module("Uelives").controller("certificateController", function($scope, $routeParams, $filter, $rootScope, $timeout, $location, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		time_option: ''
	};
	$scope.input.remove_id = $routeParams.id;
	$scope.time_option = parseFloat($filter("date")(new Date(), "yyyy"));
	$scope.time_options = [];
	for (i = 0; i < 50; i++) {
		$scope.time_options.push($scope.time_option + "年");
		$scope.time_option--;
	}

	$scope.query_cert_experience = function() {
		toastServices.show();
		userServices.query_cert_experience({
			user_identity_id: $routeParams.id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.input.get_time = data.Result.UserIdentity.get_time;
				$scope.input.title = data.Result.UserIdentity.title;
				$scope.input.image_01 = data.Result.UserIdentity.image_01;
				$scope.input.time_option = {
					value: $scope.input.get_time
				};
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.ajaxForm = function() {
		if ($routeParams.id) {
			$scope.update();
			return;
		}
		$scope.create();
	}
	$scope.input.flow = {};
	$scope.create = function() {
		toastServices.show();
		userServices.create_cert_experience({
			fileName: $scope.input.flow.opts.query.filename,
			title: $scope.input.title,
			get_time: $scope.input.time_option,
		}).then(function(data) {
			toastServices.hide();
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$rootScope.back();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.update = function() {
		$scope.input.image_01 = $scope.input.flow.opts.query.filename || $scope.input.image_01
		toastServices.show();
		userServices.update_cert_experience({
			user_identity_id: $routeParams.id,
			fileName: $scope.input.image_01,
			title: $scope.input.title,
			get_time: $scope.input.time_option,
		}).then(function(data) {
			toastServices.hide();
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$rootScope.back();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.remove = function() {
		toastServices.show();
		userServices.remove_cert_experience({
			user_identity_id: $routeParams.id,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$rootScope.back();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	if ($routeParams.id) {
		$scope.query_cert_experience();
	}
})
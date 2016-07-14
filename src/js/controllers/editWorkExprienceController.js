angular.module("Uelives").controller("editWorkExprienceController", function($scope, $routeParams, $filter, $rootScope, $timeout, $location, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.input.remove_id = $routeParams.id;
	$scope.input.start_time_option = {
		placeholder: "请选择入职时间"
	}
	$scope.input.end_time_option = {
		placeholder: "请选择离职时间"
	}
	if (localStorageService.get("cache")) {
		$scope.input = angular.extend({}, $scope.input, localStorageService.get("cache"));
	}
	$scope.query_work_experience = function() {
		toastServices.show();
		userServices.query_work_experience({
			user_work_experience_id: $routeParams.id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.input.start_time = data.Result.UserWorkExperience.start_time;
				$scope.input.end_time = data.Result.UserWorkExperience.end_time;
				$scope.input.work_name = data.Result.UserWorkExperience.work_name;
				$scope.input.position = data.Result.UserWorkExperience.position;
				$scope.input.duty = data.Result.UserWorkExperience.duty;
				$scope.input.working_scene = data.Result.UserWorkExperience.working_scene;
				if (localStorageService.get("cache")) {
					$scope.input = angular.extend({}, $scope.input, localStorageService.get("cache"));
				}
				$scope.input.start_time_option = {
					value: $scope.input.start_time
				};
				$scope.input.end_time_option = {
					value: $scope.input.end_time
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
	$scope.create = function() {
		toastServices.show();
		userServices.create_work_experience({
			start_time: $scope.input.start_time_option.value,
			end_time: $scope.input.end_time_option.value,
			work_name: $scope.input.work_name,
			position: $scope.input.position,
			duty: $scope.input.duty,
			working_scene: $scope.input.working_scene
		}).then(function(data) {
			toastServices.hide();
			localStorageService.remove("cache");
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
		toastServices.show();
		userServices.update_work_experience({
			user_work_experience_id: $routeParams.id,
			start_time: $scope.input.start_time_option.value,
			end_time: $scope.input.end_time_option.value,
			work_name: $scope.input.work_name,
			position: $scope.input.position,
			duty: $scope.input.duty,
			working_scene: $scope.input.working_scene
		}).then(function(data) {
			toastServices.hide();
			localStorageService.remove("cache");
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
		userServices.remove_work_experience({
			user_work_experience_id: $routeParams.id,
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
	$scope.cache_and_go = function(path, key) {
		localStorageService.set("cache", $scope.input);
		$location.path(path).search("cache_key", key);
	}
	if ($routeParams.id) {
		$scope.query_work_experience();
	}
})
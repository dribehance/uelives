angular.module("Uelives").controller("choiceTimeController", function($scope, $rootScope, $routeParams, $timeout, $route, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.schedule_mode = $routeParams.mode;
	$scope.select_gender = function(gender) {
		$scope.input.gender = gender;
	};
	toastServices.show();
	userServices.query_schedule().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.schedules = data.calendarBeans;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.parse_time = function(day) {
		return day.schedule_date.split("-")[2];
	}
	$scope.active = function(day) {
		if ($routeParams.mode == 'single') {
			$scope.single_check(day);
			return;
		}
		if ($routeParams.mode == 'multi') {
			$scope.multi_check(day);
		}
	}
	$scope.single_check = function(day) {
		if (day.schedule_state == 1) {
			return;
		}
		$scope.input.day = day;
	}
	$scope.multi_check = function(day) {
		if (day.schedule_state < 3) {
			return;
		}
		if (day.schedule_state == 3) {
			return day.schedule_state = 4
		}
		if (day.schedule_state == 4) {
			return day.schedule_state = 3
		}
	}
	$scope.mark_schedule = function(type) {
		toastServices.show();
		userServices.mark_schedule({
			type: type,
			choice_currentdates: $scope.input.day.schedule_date
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$route.reload();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.confirm_time = function() {
		var schedules = [];
		angular.forEach($scope.schedules, function(value, key) {
			schedules = schedules.concat(value.scheduleBeans)
		})
		schedules = schedules.filter(function(schedule) {
			return schedule.schedule_state == 4;
		})
		if (schedules.length == 0) {
			errorServices.autoHide("请选择时间");
			return;
		}
		// 缓存时间信息
		var cache = localStorageService.get("cache");
		if (cache && $routeParams.cache_key) {
			cache[$routeParams.cache_key] = schedules
			localStorageService.set("cache", cache);
		}
		$rootScope.back();
	}
})
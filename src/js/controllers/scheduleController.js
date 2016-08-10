angular.module("Uelives").controller("scheduleController", function($scope, $rootScope, $routeParams, $timeout, $route, userServices, errorServices, toastServices, localStorageService, config) {
	var cache = localStorageService.get("cache");
	$scope.input = {};
	toastServices.show();
	userServices.query_schedule({
		user_id: $routeParams.id || "0"
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.schedules = data.calendarBeans;
		} else {
			errorServices.autoHide(data.message);
		}
	})

	$scope.parse_time = function(day) {
		return day.schedule_date.split("-")[2];
	};
	//margin-left动态变化
	$scope.append_class = function(day, index) {
		if (index == 0) {
			return "margin-left-" + day.week;
		}
	}
	$scope.active = function(day) {

		if (day.schedule_state == 1) {
			return;
		}
		if (day.schedule_state == 3) {
			return day.schedule_state = 2
		}
		if (day.schedule_state == 2) {
			return day.schedule_state = 3
		}
	}

	$scope.mark_schedule = function() {
		var schedules = [];
		angular.forEach($scope.schedules, function(value, key) {
			schedules = schedules.concat(value.scheduleBeans)
		})
		schedules = schedules.filter(function(schedule) {
			return schedule.schedule_state != 1;
		}).map(function(s) {
			return s.schedule_date + "@" + s.schedule_state;
		});
		if (schedules.length == 0) {
			errorServices.autoHide("请选择时间");
			return;
		}
		toastServices.show();
		userServices.mark_schedule({
			// type: type,
			choice_currentdates: schedules.join("#")
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
})
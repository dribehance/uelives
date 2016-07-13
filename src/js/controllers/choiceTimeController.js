angular.module("Uelives").controller("choiceTimeController", function($scope, $routeParams, $timeout, $route, userServices, errorServices, toastServices, localStorageService, config) {
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
})
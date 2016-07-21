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
	}
	//margin-left动态变化
    $scope.append_class = function(day, index) {
        if (index == 0) {
            return "margin-left-" + day.week;
        }
    }
    
	// $scope.active = function(day) {
	// 	console.log(day);
	// 	$scope.input.day = day;
	// }

	$scope.active = function(day) {
		
        if (day.schedule_state < 3) {
            return;
        }
        $scope.input.day = day;
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
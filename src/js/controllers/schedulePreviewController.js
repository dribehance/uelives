angular.module("Uelives").controller("schedulePreviewController", function($scope, $rootScope, $routeParams, $timeout, $route, userServices, errorServices, toastServices, localStorageService, config) {
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
})
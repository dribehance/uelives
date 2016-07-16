// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("orderController", function($scope, $routeParams, $filter, userServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	userServices.query_order({
		orders_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.order = data.Result.Orders;
			$scope.order.schedule_from = $scope.format_time($scope.order.order_time.split("#")[0], "MM-dd");
			$scope.order.schedule_to = $scope.format_time($scope.order.order_time.split("#")[$scope.order.order_time.split("#").length - 1], "MM-dd");
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.format_time = function(time, format) {
		return $filter("date")(time, format)
	}
	$scope.parse_time = function(time) {
		return time.split("#").map(function(t) {
			return $scope.format_time(t, "yyyy.MM.dd");
		}).join("-")
	}
})
// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("indexController", function($scope, $filter, $location, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.input.city = "深圳";
	$scope.input.language = {
		from: "中文",
		to: ""
	}
	$scope.input.scenes = "";
	// $scope.input.schedule_from = "";
	// $scope.input.schedule_to = "";
	// $scope.input.schedule_total = "";
	$scope.input.industry = "";
	$scope.input.sex = "不限";
	$scope.select_gender = function(n) {
		$scope.input.sex = n;
	};
	$scope.format_time = function(time, format) {
		return $filter("date")(time, format);
	}
	$scope.replace_hash = function(hashs) {
		return hashs && hashs.replace(/#/g, "、");
	}
	$scope.cache_and_go = function(path, key) {
		localStorageService.set("cache", $scope.input);
		$location.path(path).search("cache_key", key);
	}
	var today = new Date(),
		tomorrow = new Date();
	today.setDate(today.getDate() + 1);
	tomorrow.setDate(tomorrow.getDate() + 2);
	$scope.input.choice_time = [$scope.format_time(today, "yyyy-MM-dd"), $scope.format_time(tomorrow, "yyyy-MM-dd")]
	var cache = localStorageService.get("cache");
	if (cache) {
		$scope.input = angular.extend({}, $scope.input, cache);
	}
	$scope.input.choice_time && ($scope.input.schedule_from = $scope.format_time($scope.input.choice_time[0], "MM-dd"));
	$scope.input.choice_time && ($scope.input.schedule_to = $scope.format_time($scope.input.choice_time[$scope.input.choice_time.length - 1], "MM-dd"));
	$scope.input.choice_time && ($scope.input.schedule_total = $scope.input.choice_time.length)
	$scope.ajaxForm = function() {
		localStorageService.set("cache", $scope.input);
		toastServices.show();
		userServices.booking({
			city: $scope.input.city,
			from_language: $scope.input.language.from,
			to_language: $scope.input.language.to,
			translate_scene: $scope.input.scenes,
			order_time: $scope.input.choice_time.join("#"),
			translate_day: $scope.input.schedule_total,
			translate_field: $scope.input.industry,
			sex: $scope.input.sex,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS && data.have_translate_user == '1') {
				$location.path("interpreter_list").search("order_id", data.orders_id)
			} else {
				$location.path("self_booking").search("order_id", data.orders_id);
			}
		})
	}
})
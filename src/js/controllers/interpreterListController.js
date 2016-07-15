angular.module("Uelives").controller("interpreterListController", function($scope, $filter, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.qualified_translators = [];
	$scope.format_time = function(time, format) {
		return $filter("date")(time, format)
	}
	var cache = localStorageService.get("cache");
	if (cache) {
		$scope.input = angular.extend({}, $scope.input, cache);
		$scope.input.choice_time && ($scope.input.schedule_from = $scope.format_time($scope.input.choice_time[0], "MM-dd"));
		$scope.input.choice_time && ($scope.input.schedule_to = $scope.format_time($scope.input.choice_time[$scope.input.choice_time.length - 1], "MM-dd"));
		$scope.input.choice_time && ($scope.input.schedule_total = $scope.input.choice_time.length)
	}
	$scope.qualified_page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
		city: $scope.input.city,
		from_language: $scope.input.language.from,
		to_language: $scope.input.language.to,
		translate_scene: $scope.input.scenes,
		order_time: $scope.input.choice_time.join("#"),
		translate_day: $scope.input.schedule_total,
		translate_field: $scope.input.industry,
		sex: $scope.input.gender,
		pay_day: "0",
		total_score: "0",
		multiple_order: "0"
	}
	$scope.load_qualified = function() {
		if ($scope.no_qualified) {
			return;
		}
		toastServices.show();
		$scope.qualified_page.message = "正在加载...";
		userServices.query_qualified_translator($scope.qualified_page).then(function(data) {
			toastServices.hide();
			$scope.qualified_page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.qualified_count = data.total_user;
				$scope.qualified_translators = $scope.qualified_translators.concat(data.Result.Users.list);
				$scope.no_qualified = $scope.qualified_translators.length == data.Result.Users.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_qualified) {
				// $scope.qualified_page.message = "没有了";
				$scope.load_unqualified();
			}
			$scope.qualified_page.pn++;
		})

	}
	$scope.load_qualified();
	// query_unqulified_translator
	$scope.unqualified_page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
		city: $scope.input.city,
		from_language: $scope.input.language.from,
		to_language: $scope.input.language.to,
		translate_scene: $scope.input.scenes,
		order_time: $scope.input.choice_time.join("#"),
		translate_day: $scope.input.schedule_total,
		translate_field: $scope.input.industry,
		sex: $scope.input.gender,
		pay_day: "0",
		total_score: "0",
		multiple_order: "0"
	}
	$scope.unqualified_translators = [];
	$scope.load_unqualified = function() {
		toastServices.show();
		$scope.unqualified_page.message = "正在加载...";
		userServices.query_unqualified_translator($scope.unqualified_page).then(function(data) {
			toastServices.hide();
			$scope.unqualified_page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.unqualified_count = data.total_user;
				$scope.unqualified_translators = $scope.unqualified_translators.concat(data.Result.Users.list);
				$scope.no_unqualified = $scope.unqualified_translators.length == data.Result.Users.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_unqualified) {
				// $scope.unqualified_page.message = "没有了";
			}
			$scope.unqualified_page.pn++;
		})
	}
})
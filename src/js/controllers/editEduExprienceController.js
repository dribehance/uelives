angular.module("Uelives").controller("editEduExprienceController", function($scope, $routeParams, $filter, $rootScope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		year: '',
		degree: ''

	};
	$scope.input.remove_id = $routeParams.id;
	$scope.year = parseFloat($filter("date")(new Date(), "yyyy"));
	$scope.years = ["至今"];
	for (i = 0; i < 50; i++) {
		$scope.years.push($scope.year + "年");
		$scope.year--;
	}
	$scope.degrees = ["专科", "本科", "硕士", "博士", "博士后"];
	$scope.query_edu_experience = function() {
		toastServices.show();
		userServices.query_edu_experience({
			user_edu_experience_id: $routeParams.id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.input.year = data.Result.UserEduExperience.end_time;
				$scope.input.school_name = data.Result.UserEduExperience.school_name;
				$scope.input.degree = data.Result.UserEduExperience.education;
				$scope.input.major = data.Result.UserEduExperience.profession;
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
		userServices.create_edu_experience({
			end_time: $scope.input.year,
			school_name: $scope.input.school_name,
			education: $scope.input.degree,
			profession: $scope.input.major,
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
	$scope.update = function() {
		toastServices.show();
		userServices.update_edu_experience({
			user_edu_experience_id: $routeParams.id,
			end_time: $scope.input.year,
			school_name: $scope.input.school_name,
			education: $scope.input.degree,
			profession: $scope.input.major,
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
	$scope.remove = function() {
		toastServices.show();
		userServices.remove_edu_experience({
			user_edu_experience_id: $routeParams.id,
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
		$scope.query_edu_experience();
	}
})
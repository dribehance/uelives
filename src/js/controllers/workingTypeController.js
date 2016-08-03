angular.module("Uelives").controller("workingTypeController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {}

	$scope.select_scene = function(scene) {
		// 缓存编辑信息
		var cache = localStorageService.get("cache");
		if (cache && $routeParams.cache_key) {
			cache[$routeParams.cache_key] = scene.name
			localStorageService.set("cache", cache);
		}
		$rootScope.back();
	}
	toastServices.show();
	userServices.query_scenes({
		type: 1
	}).then(function(data) {
		var cache = localStorageService.get("cache");
		toastServices.hide();
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.scenes = data.Result.TranslateScenes;
			$scope.scenes.map(function(scene) {
				if (cache && cache[$routeParams.cache_key] && cache[$routeParams.cache_key].indexOf(scene.name) != -1) {
					scene.select = true
				}
				return scene;
			})
		} else {
			errorServices.autoHide(data.message);
		}
	})
})
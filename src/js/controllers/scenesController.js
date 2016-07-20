angular.module("Uelives").controller("scenesController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {}
    $scope.select_scene = function(scene) {
        var scenes = $scope.scenes.filter(function(scene) {
            return scene.select;
        }).map(function(scene) {
            return scene.name
        });
        if (scenes.length > 1) {
            errorServices.autoHide("最多只能选择两个");
            return;
        }
        scene.select = !scene.select;
    }
    toastServices.show();
    userServices.query_scenes().then(function(data) {
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
    $scope.save = function() {
        var scenes = $scope.scenes.filter(function(scene) {
            return scene.select;
        }).map(function(scene) {
            return scene.name
        });
        if (scenes.length == 0) {
            errorServices.autoHide("请选择擅长领域");
            return;
        }
        // 缓存编辑信息
        var cache = localStorageService.get("cache");
        if (cache && $routeParams.cache_key) {
            cache[$routeParams.cache_key] = scenes.join("#")
            localStorageService.set("cache", cache);
        }
        $rootScope.back();
    }
})
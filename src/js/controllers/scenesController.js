angular.module("Uelives").controller("scenesController", function($scope, $rootScope, errorServices, toastServices, localStorageService, config) {
    $scope.input = {}
    
    $scope.input.scene = localStorageService.get("scene") || "";
    $scope.select_scene = function(scene) {

        scene.select =! scene.select;
        
        // localStorageService.set("scene", scene);
        // $rootScope.back();
    }
    $scope.scenes = [{
    	name:"商务陪同",
    	select:false
    },{
        name:"商务会谈",
        select:false
    },{
        name:"展会翻译",
        select:false
    },{
        name:"活动仪式",
        select:false
    },{
        name:"学术研讨",
        select:false
    },{
        name:"培训讲座",
        select:false
    },{
        name:"媒体访谈",
        select:false
    },{
        name:"新闻发布",
        select:false
    },{
        name:"节目录制",
        select:false
    },{
        name:"医疗美容",
        select:false
    },{
        name:"司法程序",
        select:false
    },{
        name:"政府会晤",
        select:false
    },{
        name:"会议同传",
        select:false
    },{
        name:"其他",
        select:false
    }]
})
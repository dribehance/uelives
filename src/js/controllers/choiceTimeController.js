angular.module("Uelives").controller("choiceTimeController", function($scope, $rootScope, $routeParams, $timeout, $route, userServices, errorServices, toastServices, localStorageService, config) {
    var cache = localStorageService.get("cache");
    $scope.user_id = $routeParams.id;
    $scope.input = {};
    toastServices.show();
    userServices.query_schedule({
        user_id: $routeParams.id || "0"
    }).then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.schedules = data.calendarBeans;
            $scope.schedule_init();
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.schedule_init = function() {
        angular.forEach($scope.schedules, function(value, key) {
            angular.forEach(value.scheduleBeans, function(v, k) {
                if (cache[$routeParams.cache_key] && cache[$routeParams.cache_key].includes(v.schedule_date)) {
                    v.schedule_state = 4;
                }
            })
        })
    }
    $scope.parse_time = function(day) {
        return day.schedule_date.split("-")[2];
    };
    //margin-left动态变化
    $scope.append_class = function(day, index) {
        if (index == 0) {
            return "margin-left-" + day.week;
        }
    }
    $scope.active = function(day) {
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
    $scope.confirm_time = function() {
        var schedules = [];
        angular.forEach($scope.schedules, function(value, key) {
            schedules = schedules.concat(value.scheduleBeans)
        })
        schedules = schedules.filter(function(schedule) {
            return schedule.schedule_state == 4;
        }).map(function(s) {
            return s.schedule_date;
        });
        if (schedules.length == 0) {
            errorServices.autoHide("请选择时间");
            return;
        }
        if (cache && $routeParams.cache_key) {
            cache[$routeParams.cache_key] = schedules
            localStorageService.set("cache", cache);
        }
        $rootScope.back();
    }
})
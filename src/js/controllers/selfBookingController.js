angular.module("Uelives").controller("selfBookingController", function($scope, $rootScope, $filter, $location, $routeParams, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.input.sex = 1;
    $scope.select_gender = function(gender) {
        $scope.input.sex = gender;
    };
    $scope.agree = false;
    $scope.is_agree = function() {
        $scope.agree = !$scope.agree;
    };
    $scope.replace_hash = function(hashs) {
        return hashs && hashs.replace(/#/g, "、");
    };
    // 验证码
    $scope.countdown = {
        // count: "5",
        message: "获取验证码",
    }
    $scope.input.country_code = {
        name: "中国",
        code: "+86"
    };
    $scope.countdown.callback = function() {
        toastServices.show();
        userServices.get_smscode({
            telephone: $scope.input.telephone,
            country_code: $scope.input.country_code.code,
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide(data.message)
            } else {
                $scope.countdown.reset = true;
                // $scope.modal.status = 3;
                errorServices.autoHide(data.message);
            }
        })
    };
    // get information from cache
    $scope.format_time = function(time, format) {
        return $filter("date")(time, format)
    }


    $scope.cache_and_go = function(path, key) {
        localStorageService.set("cache", $scope.input);
        $location.path(path).search("cache_key", key);
    }
    var cache = localStorageService.get("cache");
    if (cache) {
        $scope.input = angular.extend({}, $scope.input, cache);
        $scope.input.choice_time && ($scope.input.schedule_from = $scope.format_time($scope.input.choice_time[0], "MM-dd"));
        $scope.input.choice_time && ($scope.input.schedule_to = $scope.format_time($scope.input.choice_time[$scope.input.choice_time.length - 1], "MM-dd"));
        $scope.input.choice_time && ($scope.input.schedule_total = $scope.input.choice_time.length)
    }
    var server = localStorageService.get("server");
    // $scope.input.wechat = (server && server.wechat) || "";
    $scope.ajaxForm = function() {
        toastServices.show();
        userServices.online_booking({
            city: $scope.input.city,
            from_language: $scope.input.language.from,
            to_language: $scope.input.language.to,
            translate_scene: $scope.input.scenes,
            order_time: $scope.input.choice_time.join("#"),
            translate_day: $scope.input.schedule_total,
            translate_field: $scope.input.industry,
            sex: $scope.input.sex,
            type: 3,
            orders_id: $routeParams.order_id,
            translate_user_id: $routeParams.id,
            work_content: $scope.input.work_content,
            other_require: $scope.input.other_require,
            order_name: $scope.input.nickname,
            order_company: $scope.input.company,
            order_telephone: $scope.input.telephone,
            order_wechat: $scope.input.wechat,
            money: $scope.input.money,
            msg_code: $scope.input.smscode,
            country_code: $scope.input.country_code.code,
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide(data.message);
                $timeout(function() {
                    localStorageService.remove("cache");
                    $rootScope.back();
                    // $location.path("order_management_user").search({
                    //     id: null,
                    //     order_id: null,
                    //     money: null
                    // }).replace();
                }, 2000)
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
})
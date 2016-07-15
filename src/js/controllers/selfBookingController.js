angular.module("Uelives").controller("selfBookingController", function($scope, $filter, $location, $routeParams, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.input.gender = 1;
    $scope.select_gender = function(gender) {
        $scope.input.gender = gender;
    };
    $scope.agree = false;
    $scope.is_agree = function() {
        $scope.agree = !$scope.agree;
    };
    // 验证码
    $scope.countdown = {
        // count: "5",
        message: "获取验证码",
    }
    $scope.countdown.callback = function() {
        toastServices.show();
        userServices.get_smscode({
            telephone: $scope.input.telephone
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
    $scope.ajaxForm = function() {
        toastServices.show();
        userServices.online_booking({
            type: 3,
            orders_id: $routeParams.order_id,
            translate_user_id: $routeParams.id,
            work_content: $scope.input.work_content,
            other_require: $scope.input.other_require,
            order_name: $scope.input.nickname,
            order_company: $scope.input.company,
            order_telephone: $scope.input.telephone,
            order_wechat: $scope.input.wechat,
            money: $scope.get_total_money(),
            msg_code: $scope.input.smscode,
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide(data.message);
                $timeout(function() {
                    $location.path("order_management_user").search({
                        id: null,
                        order_id: null,
                        money: null
                    }).replace();
                }, 2000)
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.get_total_money = function() {
        return parseFloat($scope.input.schedule_total) * parseFloat($routeParams.money);
    }
    // $scope.model = {
    //     status: 0
    // };
    // $scope.go = function() {

    //     $scope.model.status = 1;
    // }
    // $scope.cancel = function() {
    //     $scope.model.status = 0;
    // }
})
angular.module("Uelives").controller("editBasicInfoController", function($scope, $rootScope, $timeout, $location, $filter, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        translate_year: '',
        options: {}
    };
    toastServices.show();
    userServices.query_basicinfo({
        type: "1",
    }).then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.user = data.Result.UserInfo;
            $scope.input.nickname = $scope.user.nickname || "";
            $scope.input.wechat = $scope.user.weChat || "";
            $scope.input.sex = $scope.user.sex || "";
            $scope.input.degree = $scope.user.edu || "";
            $scope.input.birthday = $scope.user.birthday || "";
            $scope.input.city = $scope.user.city || "";
            $scope.input.telephone = $scope.user.telephone || "";
            $scope.input.email = $scope.user.email || "";
            $scope.input.job_type = $scope.user.job_type || "";
            $scope.input.job_property = $scope.user.job_property || "";
            $scope.input.mother_language = $scope.user.mother_language || "";
            $scope.input.first_language = $scope.user.first_language || "";
            $scope.input.first_language_level = $scope.user.first_language_level || "";
            $scope.input.second_language = $scope.user.second_language || "";
            $scope.input.second_language_level = $scope.user.second_language_level || "";
            $scope.input.good_at = $scope.user.good_field || "";
            $scope.input.translate_year = $scope.user.translate_year || "";
            $scope.input.translate_level = $scope.user.translate_level || "";
            $scope.input.pay_day = $scope.user.pay_day || "";
            $scope.input.pay_day_example = $filter("currency")(data.average_pay_day || "0", "￥");
            // mobile picker
            $scope.input.options.value = $scope.user.birthday;
            var job_type = $scope.input.job_type.split("#"),
                job_property = $scope.input.job_property.split("#");
            $scope.input.job_types.map(function(job) {
                if (job_type.includes(job.name)) {
                    job.selected = true;
                }
                return job;
            })
            $scope.input.job_propertys.map(function(job) {
                if (job_property.includes(job.name)) {
                    job.selected = true;
                }
                return job;
            })
            if (localStorageService.get("cache")) {
                $scope.input = angular.extend({}, $scope.input, localStorageService.get("cache"));
                console.log($scope.input)
            }
            localStorageService.set("user_id", $scope.user.user_id)
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.input.job_types = [{
        name: "口译",
        selected: false
    }, {
        name: "笔译",
        selected: false
    }, {
        name: "口笔译",
        selected: false
    }];
    $scope.input.job_propertys = [{
        name: "全职",
        selected: false
    }, {
        name: "兼职",
        selected: false
    }, {
        name: "实习",
        selected: false
    }];
    $scope.degrees = ["大专", "本科", "硕士", "博士"];
    $scope.translate_years = ["1年", "2年", "3年", "4年", "5年", "6年", "7年", "8年", "9年", "10年", "10年以上"];
    $scope.agree = false;
    $scope.is_agree = function() {
        $scope.agree = !$scope.agree;
    };
    $scope.single_check = function(name, value) {
        $scope.input[name] = value;
    }
    $scope.multi_check = function(job) {
        return job.selected = !job.selected;
    }
    $scope.replace_hash = function(hashs) {
        return hashs && hashs.replace(/#/g, "、");
    }
    $scope.cache_and_go = function(path, key) {
        console.log($scope.input)
        localStorageService.set("cache", $scope.input);
        $location.path(path).search("cache_key", key);
    }
    $scope.input.flow = {};
    $scope.update_avatar = function() {
        toastServices.show();
        userServices.update_avatar({
            fileName: $scope.input.flow.opts.query.filename
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.ajaxForm = function() {
        toastServices.show();
        userServices.update_userinfo({
            fileName: $scope.user.image_01,
            nickname: $scope.input.nickname,
            weChat: $scope.input.wechat,
            sex: $scope.input.sex,
            edu: $scope.input.degree,
            birthday: $scope.input.options.value,
            city: $scope.input.city,
            email: $scope.input.email,
            job_type: $scope.input.job_types.filter(function(job) {
                return job.selected
            }).map(function(j) {
                return j.name
            }).join("#"),
            job_property: $scope.input.job_propertys.filter(function(job) {
                return job.selected
            }).map(function(j) {
                return j.name
            }).join("#"),
            mother_language: $scope.input.mother_language,
            first_language: $scope.input.first_language,
            first_language_level: $scope.input.first_language_level,
            second_language: $scope.input.second_language,
            second_language_level: $scope.input.second_language_level,
            good_field: $scope.input.good_at,
            translate_year: $scope.input.translate_year,
            translate_level: $scope.input.translate_level,
            pay_day: $scope.input.pay_day,
        }).then(function(data) {
            toastServices.hide();
            localStorageService.remove("cache");
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
})
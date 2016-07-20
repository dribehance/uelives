angular.module("Uelives").controller("moneyController", function($scope, $rootScope, $timeout, $location, $filter, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {

    };
    
    $scope.ajaxForm = function() {
        toastServices.show();
        userServices.update_userinfo({
            type: "1",
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
               
                $scope.input.pay_day = $scope.user.pay_day || "";
                $scope.input.pay_day_example = $filter("currency")(data.average_pay_day || "0", "￥");
                
                if (localStorageService.get("cache")) {
                    $scope.input = angular.extend({}, $scope.input, localStorageService.get("cache"));
                }
            } else {
                errorServices.autoHide(data.message);
            }
        });
    }

})
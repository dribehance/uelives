// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("paymentController", function($scope, $rootScope, $timeout, $routeParams, userServices, weixinServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.order_id) {
		$rootScope.back();
		return;
	}
	$scope.order_id = $routeParams.order_id;
	$scope.payment = localStorageService.get("payment");
	$scope.weixinpay = function() {
		if (parseFloat($scope.payment.money) > 2999.99) {
			errorServices.autoHide("支付金额大于3000，请使用银联支付");
			return;
		}
		if ($routeParams.status == 3) {
			weixinServices.queryAuthorizationCodeSilently({
				orders_id: $scope.order_id,
				redirect_uri: "http://www.uelives.com/app/MenuController/getWeixinOauth"
			});
			return;
		}
		weixinServices.prepare_pay({
			id: $scope.order_id
		});
	}
	$scope.yinlianpay = function() {
		angular.element("#yinlianForm").submit();
	}
})
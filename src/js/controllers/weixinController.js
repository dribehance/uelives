// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("weixinController", function($scope, $rootScope, $location, $timeout, weixinServices, errorServices, toastServices, localStorageService, config) {
	// config weixin
	$rootScope.wx_browser && weixinServices.config().then(function(data) {
		toastServices.show();
		weixinServices.query_payment_signature({
			orders_id: localStorageService.get("orders_id"),
			code: localStorageService.get("code")
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				weixinServices.pay(data);
			} else {
				$rootScope.back();
				// errorServices.autoHide(data.message);
			}
		})
	});
})
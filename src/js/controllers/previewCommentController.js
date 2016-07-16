// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("previewCommentController", function($scope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	userServices.query_comment_by_order({
		orders_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.comment = data.Result.Comment;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})
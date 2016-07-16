angular.module("Uelives").directive('onRepeatDone', function() {
	return {
		restrict: 'A',
		link: function(scope, el, attr) {
			$(el).hide();
			if (scope.$last) {
				$(el).show();
				scope.$emit("onRepeatDone", el);
			}
		}
	};
});
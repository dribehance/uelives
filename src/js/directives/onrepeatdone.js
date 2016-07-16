angular.module("Uelives").directive('onRepeatDone', function() {
	return {
		restrict: 'A',
		link: function(scope, el, attr) {
			if (scope.$last) {
				scope.$emit("onRepeatDone", el);
			}
		}
	};
});
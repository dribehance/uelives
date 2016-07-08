// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("letterIndexController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.$on("onRepeatDone", function() {
		var letters = $(".letter"),
			letter = letters.find("span"),
			letter_height = letter.height();
		var hammer = new Hammer(letters[0], {
			touchAction: "pan-x"
		});
		hammer.on("pan", function(e) {
			var offset = Math.round(e.deltaY / letter_height);
			$scope.navgation_to($(e.target), offset)
		})
		hammer.on("tap", function(e) {
			$scope.$emit("letterIndexChange", $(e.target).text())
		})
		$scope.navgation_to = function(elem, offset) {
			var dest = letter.index(elem) + offset;
			dest = Math.min(dest, letter.length - 1);
			dest = Math.max(0, dest);
			$scope.$emit("letterIndexChange", letter.eq(dest).text())
		}
	})
})
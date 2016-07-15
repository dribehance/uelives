// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").controller("letterIndexController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.$on("onRepeatDone", function() {
		var letters = $(".letter"),
			letter = letters.find("span"),
			letter_height = letter.height() + parseFloat(letter.css("padding-top"));
		// create a simple instance
		// by default, it only adds horizontal recognizers
		var mc = new Hammer(letters[0]);

		// let the pan gesture support all directions.
		// this will block the vertical scrolling on a touch-device while on the element
		mc.get('pan').set({
			direction: Hammer.DIRECTION_ALL
		});

		mc.on("panleft panright panup pandown tap press", function(e) {
			var offset = Math.round(e.deltaY / letter_height);
			$scope.navgation_to($(e.target), offset)
		})
		mc.on("panend", function(e) {
			$scope.$apply(function() {
				$scope.letter_index = "";
			})
		})
		//navgation distance
		$scope.navgation_to = function(elem, offset) {
			var dest = letter.index(elem) + offset;
			dest = Math.min(dest, letter.length - 1);
			dest = Math.max(0, dest);
			$scope.$emit("letterIndexChange", letter.eq(dest).text())
		}
		//letter compare letter
		$scope.$on("letterIndexChange", function(e, args) {
			$scope.$apply(function() {
				$scope.letter_index = args;
			})
			$("body").scrollTop($("[data-index=" + args + "]").offset().top);
		})
	})
})
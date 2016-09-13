// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").directive('pagetitle', function($document) {
	return {
		restrict: 'E',
		scope: {
			title: "="
		},
		link: function(scope, element, attrs) {
			// function body
			$document[0].title = scope.title;
			var $body = $('body');
			var $iframe = $('<iframe src="/favicon.ico" style="display:none"></iframe>');
			$iframe.on('load', function() {
				setTimeout(function() {
					$iframe.off('load').remove();
				}, 0);
			}).appendTo($body);
		}
	};
});
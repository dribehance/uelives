angular.module("Uelives").directive('uploader', function($timeout, localStorageService, toastServices, errorServices, config) {
	return {
		restrict: 'E',
		template: function(element, attrs) {
			// flow event on directive attrs
			// flow-file-success="someHandlerMethod( $file, $message, $flow )"
			// flow-file-progress="someHandlerMethod( $file, $flow )"
			// flow-file-added="someHandlerMethod( $file, $event, $flow )"
			// flow-files-added="someHandlerMethod( $files, $event, $flow )"
			// flow-files-submitted="someHandlerMethod( $files, $event, $flow )"
			// flow-file-retry="someHandlerMethod( $file, $flow )"
			// flow-file-error="someHandlerMethod( $file, $message, $flow )"
			// flow-error="someHandlerMethod( $file, $message, $flow )"
			// flow-complete=" ... "
			// flow-upload-started=" ... "
			// flow-progress=" ... "
			var template = "",
				rate = attrs.rate;
			template = "<imageview center-only data-rate='" + rate + "' src='src'></imageview>";
			return template;
		},
		controller: function($scope, $element, $attrs) {
			var filename, extension;
			$scope.$on("flow::filesSubmitted", function(event, flow) {
				flow.files[0].name.replace(/.png|.jpg|.jpeg|.gif/g, function(ext) {
					extension = ext;
					return ext;
				});
				var random = Math.floor(Math.random() * 1000000) + extension;
				filename = new Date().getTime() + random;
				flow.opts.target = config.url + "/app/UserCenter/updatePic";
				flow.opts.testChunks = false;
				flow.opts.fileParameterName = "image_01";
				flow.opts.query = {
					"invoke": "h5",
					"token": localStorageService.get("token"),
					"filename": filename
				};
				toastServices.show();
				flow.upload();
			});
			$scope.$on('flow::fileAdded', function(file, message, chunk) {
				// $scope.cover.url = "";
			});
			// default image;
			$scope.src = "../images/default.png";
			if ($attrs.default) {
				$scope.src = $attrs.default;
			}
			$attrs.$observe('src', function(value) {
				if (value) {
					$scope.src = config.imageUrl + value
				}
			});
			$scope.$on('flow::fileSuccess', function(file, message, chunk) {
				$scope.src = config.imageUrl + filename;
				toastServices.hide();
			});
		},
		link: function(scope, element, attrs) {}
	}
});
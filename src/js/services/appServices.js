 // by dribehance <dribehance.kksdapp.com>
 // EventHandle
 angular.module("Uelives").factory("appServices", function($rootScope, $window, $location, errorServices, toastServices, localStorageService, config) {
 	var routeChangeStart = function(e) {
 		// do something white routechangestart,eg:
 		// toastServices.show();
 	}
 	var routeChangeSuccess = function(e, currentRoute, prevRoute) {
 		// do something white routechangesuccess,eg:
 		toastServices.hide();
 		errorServices.hide();
 		navBarHandler(e, currentRoute, prevRoute);
 	}
 	var routeChangeError = function(e, currentRoute, prevRoute) {
 		// do something white routechangesuccess,eg:
 		// $rootScope.back();
 	}
 	var navBarHandler = function(e, currentRoute, prevRoute) {
 		// handle navbar
 	}
 	var onBackKeyDown = function() {
 		$rootScope.$apply(function() {
 			$rootScope.back();
 		});
 	}
 	return {
 		init: function() {
 			$rootScope.$on("$routeChangeStart", routeChangeStart);
 			$rootScope.$on("$routeChangeSuccess", routeChangeSuccess);
 			$rootScope.$on("$routeChangeError", routeChangeError);
 			$rootScope.go = function(path) {
 				$location.path(path);
 			}
 			$rootScope.back = function() {
 				$window.history.back();
 			}
 			if ($location.port() == "8000") {
 				localStorageService.set("token", "oeZT9s0s0P1-s5Ns7nQOxfUldSk3")
 			}
 			$rootScope.staticImageUrl = config.imageUrl;
 		}
 	}
 });
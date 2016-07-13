// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").factory("userServices", function($rootScope, $http, apiServices, localStorageService, config) {
	return {
		// rsa encrypt
		rsa_key: apiServices._get(angular.extend({}, config.common_params, {
			url: "key/private_key.pem",
		})),
		// signin
		signin: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		// signup
		signup: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/RegistTelOne",
		})),
		// forget password
		forget: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		// reset password
		reset: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		get_smscode: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/GetCode",
		})),
		// query user basic information
		query_basicinfo: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/userInfo",
			token: localStorageService.get("token")
		})),
		update_avatar: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/updateBgImg",
			token: localStorageService.get("token")
		})),
		update_userinfo: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/updateUserInfo",
			token: localStorageService.get("token")
		})),
		realname_authen: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
		phone_authen: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
		// favourite 收藏
		like: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
		// 取消收藏
		unlike: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
		// 消息列表
		query_messages: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
		// 消息详情
		query_message_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
		query_city: apiServices._get(angular.extend({}, config.common_params, {
			url: "city/city_with_index.json",
			token: localStorageService.get("token")
		})),
		query_inter_city: apiServices._get(angular.extend({}, config.common_params, {
			url: "city/inter_city_with_index.json",
			token: localStorageService.get("token")
		})),
		query_language: apiServices._get(angular.extend({}, config.common_params, {
			url: "city/language.json",
			token: localStorageService.get("token")
		})),
		// 涉及行业列表
		query_industries: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/translateFieldList",
		})),
	}
});
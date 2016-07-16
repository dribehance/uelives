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
		// 新增教育经历
		create_edu_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserEduExps/addUserEduExps",
			token: localStorageService.get("token")
		})),
		// 查询教育经历信息
		query_edu_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserEduExps/userEduExperienceInfo",
			token: localStorageService.get("token")
		})),
		// 编辑教育经历
		update_edu_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserEduExps/editUserEduExps",
			token: localStorageService.get("token")
		})),
		// 删除教育经历
		remove_edu_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserEduExps/deleteUserEduExps",
			token: localStorageService.get("token")
		})),
		// 新增工作经历
		create_work_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserWorkExps/addUserWorkExps",
			token: localStorageService.get("token")
		})),
		// 查询工作经历信息
		query_work_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserWorkExps/userUserWorkExpInfo",
			token: localStorageService.get("token")
		})),
		// 编辑工作经历
		update_work_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserWorkExps/editUserWorkExps",
			token: localStorageService.get("token")
		})),
		// 删除工作经历
		remove_work_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserWorkExps/deleteUserWorkExps",
			token: localStorageService.get("token")
		})),
		// 新增证书
		create_cert_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserIdentitys/addUserIdentity",
			token: localStorageService.get("token")
		})),
		// 查询证书信息
		query_cert_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserIdentitys/userIdentityInfo",
			token: localStorageService.get("token")
		})),
		// 编辑证书
		update_cert_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserIdentitys/editUserIdentity",
			token: localStorageService.get("token")
		})),
		// 删除证书
		remove_cert_experience: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserIdentitys/deleteUserIdentity",
			token: localStorageService.get("token")
		})),
		// 工作场景
		query_scenes: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/Home/translateSceneList",
			token: localStorageService.get("token")
		})),
		// 时间表
		query_schedule: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/ScheduleManage/scheduleList",
			token: localStorageService.get("token")
		})),
		// 标记时间表
		mark_schedule: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/ScheduleManage/setTranslateTime",
			token: localStorageService.get("token")
		})),
		// 预订
		booking: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/makeOrder",
		})),
		// 合适的译员
		query_qualified_translator: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/Home/fullCompletelyUserList",
		})),
		// 可能合适的译员
		query_unqualified_translator: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/Home/maybeUserList",
		})),
		// 评论列表
		query_comments: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/Comments/myCommentList",
		})),
		comment: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/Comments/comment",
		})),
		query_comment_by_order: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/commentDetail",
		})),
		// 在线预订
		online_booking: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/submitOrder",
		})),
		// 订单列表，根据微信uid获取
		query_orders: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/myOrderList",
		})),
		query_order: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/orderDetail",
		})),
		// 订单评价，拒绝，同意
		mark: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/OrdersManage/setOrderType",
		})),
	}
});
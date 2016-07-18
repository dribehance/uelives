angular.module("Uelives").constant("config", {
	url: "http://www.uelives.com",
	imageUrl: "http://www.uelives.com/files/image?name=",
	request: {
		"SUCCESS": "200",
		"TOKEN_INVALID": "405"
	},
	response: {
		"SUCCESS": 1
	},
	common_params: {
		invoke: "h5",
		app_sign: "123456"
	},
	interceptor: [
		"index",
		"booking_date",
		"choice_city",
		"choice_language",
		"choice_time",
		"edit_basic_info",
		"edit_edu_exprience",
		"edit_work_exprience",
		"interpreter_detail",
		"interpreter_level",
		"interpreter_list",
		"interpreter_evaluate",
		"interpreter_settled",
		"online_booking",
		"online_preview",
		"schedule",
		"schedule_preview",
		"order_management_interpreter",
		"order_management_user",
		"order",
		"order_cancel",
		"order_confirm",
		"order_finish",
		"order_wait",
		"languages",
		"related_industry",
		"self_booking",
		"information",
		"scenes",
		"certificate",
		"preview_comment",
		"country_code",
	]
});
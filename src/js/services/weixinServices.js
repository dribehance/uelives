// by dribehance <dribehance.kksdapp.com>
angular.module("Uelives").factory("weixinServices", function($http, $route, $timeout, $rootScope, $location, toastServices, $q, $window, localStorageService, config) {
    var weixin_config = {
        "base_url": "https://open.weixin.qq.com/connect/oauth2/authorize",
        "access_token_url": "https://api.weixin.qq.com/sns/oauth2/access_token",
        "userinfo_url": "https://api.weixin.qq.com/sns/userinfo",
        "appid": "wxfc4845662ab85927",
        "secret": "1428c0468f80f233c7f17d887582f2f6",
        "redirect_uri": "http://www.uelives.com/oauth",
        "payment_redirect_uri": "http://www.uelives.com/mobile/weixinpay.html/#/index",
        "response_type": "code",
        "scope": "snsapi_userinfo",
        "state": "weixin",
        "wechat_redirect": "#wechat_redirect",
    };

    function initWeixinShareEvent(title, link, thumbnail, desc) {
        wx.onMenuShareTimeline({
            title: title || config.share.title, // 分享标题
            link: link || config.share.link, // 分享链接
            imgUrl: thumbnail || config.share.thumbnail, // 分享图标
            trigger: function() {
                // alert("分享朋友圈")
            },
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: title || config.share.title, // 分享标题
            desc: desc || config.share.desc, // 分享描述
            link: link || config.share.link, // 分享链接
            imgUrl: thumbnail || config.share.thumbnail, // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({
            title: title || config.share.title, // 分享标题
            desc: desc || config.share.desc, // 分享描述
            link: link || config.share.link, // 分享链接
            imgUrl: thumbnail || config.share.thumbnail, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareWeibo({
            title: title || config.share.title, // 分享标题
            desc: desc || config.share.desc, // 分享描述
            link: link || config.share.link, // 分享链接
            imgUrl: thumbnail || config.share.thumbnail, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQZone({
            title: title || config.share.title, // 分享标题
            desc: desc || config.share.desc, // 分享描述
            link: link || config.share.link, // 分享链接
            imgUrl: thumbnail || config.share.thumbnail, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
    }
    return {
        config: function() {
            // if (!$rootScope.wx_browser) return {};
            return this.query_signature({
                current_url: $location.absUrl().split("#")[0]
            }).then(function(data) {
                if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: weixin_config.appid, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填，签名，见附录1
                        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                }
            });
            wx.ready(function() {
                // alert("initWeixinShareEvent")
                initWeixinShareEvent();
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.error(function(res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        },
        // 获取配置签名
        query_signature: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/WeixinCommon/getSignature",
                method: "GET",
                params: angular.extend({}, config.common_params, input)
            }).then(function(data) {
                return data.data;
            });
        },
        // 获取支付签名,根据订单号获取
        query_payment_signature: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/OrdersManage/comfiyPay",
                method: "GET",
                params: angular.extend({}, config.common_params, input)
            }).then(function(data) {
                return data.data;
            });
        },
        // share
        initWeixinShareEvent: function(title, link, thumbnail, desc) {
            initWeixinShareEvent(title, link, thumbnail, desc);
        },
        // 显性授权 login
        queryAuthorizationCode: function() {
            var url = weixin_config.base_url + "?" + "appid=" + weixin_config.appid + "&redirect_uri=" + encodeURIComponent(weixin_config.redirect_uri) + "&response_type=" + weixin_config.response_type + "&scope=" + weixin_config.scope + "&state=" + weixin_config.state + weixin_config.wechat_redirect;
            $window.location.href = url;
        },
        // 静默授权 silence authorization
        prepare_pay: function(params) {
            var url = weixin_config.base_url + "?" + "appid=" + weixin_config.appid + "&redirect_uri=" + encodeURIComponent(weixin_config.payment_redirect_uri) + "&response_type=" + weixin_config.response_type + "&scope=" + weixin_config.scope + "&state=" + JSON.stringify(params) + weixin_config.wechat_redirect;
            $window.location.href = url;
        },
        // invoke weixin pay
        pay: function(params) {
            toastServices.show();
            wx.chooseWXPay({
                // "appId": params.appId,//weixin_config.appid,
                "timestamp": params.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                "nonceStr": params.nonceStr, // 支付签名随机串，不长于 32 位
                "package": params.package_web, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                "signType": params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                "paySign": params.paySign, // 支付签名
                success: function(res) {
                    // 支付成功后的回调函数
                    toastServices.hide();
                    $timeout(function() {
                        $window.location.href = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/mobile/#/order_management_user";
                    }, 1000)
                },
                cancel: function() {
                    toastServices.hide();
                    $timeout(function() {
                        $rootScope.back();
                    }, 1000)
                },
                fail: function(res) {
                    toastServices.hide();
                    $timeout(function() {
                        $rootScope.back();
                    }, 1000);
                }
            });
        }
    }
});
//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
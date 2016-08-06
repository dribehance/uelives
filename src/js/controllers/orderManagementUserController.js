angular.module("Uelives").controller("orderManagementUserController", function($scope, $routeParams, $route, $timeout, $filter, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        type: $routeParams.type || "2",
        status: 'wait'
    }
    $scope.orders = [];
    $scope.page = {
        pn: 1,
        page_size: 10,
        message: "点击加载更多",
        // uid: "oqEj-vsfYWEE4l4rWAR7lxyJgO55",
        // uid: "oqEj-vsfYWEE4l4rWAR7lxyJgOLI",
        // uid: localStorageService.get("server").wechat,
        order_type: $scope.input.type
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        userServices.query_orders($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.orders = $scope.orders.concat(data.Result.OrderList.list);
                $scope.no_more = $scope.orders.length == data.Result.OrderList.totalRow ? true : false;
            } else {
                errorServices.autoHide("服务器错误");
            }
            if ($scope.no_more) {
                $scope.page.message = "加载完成，共加载" + $scope.orders.length + "条数据";
            }
            $scope.page.pn++;
        })

    }
    $scope.loadMore();
    $scope.active_tab = function(tab_index) {
        $scope.input.type = tab_index;
        $scope.page = {
            pn: 1,
            page_size: 10,
            message: "点击加载更多",
            // uid: "oqEj-vsfYWEE4l4rWAR7lxyJgO55",
            // uid: "oqEj-vsfYWEE4l4rWAR7lxyJgOLI",
            // uid: localStorageService.get("server").wechat,
            order_type: $scope.input.type
        }
        $scope.orders = [];
        $scope.no_more = false;
        $scope.loadMore();
    };
    $scope.format_time = function(time, format) {
        return $filter("date")(time, format)
    }

    $scope.replace_hash = function(hashs) {
        return hashs && hashs.replace(/#/g, "、");
    }
    
    $scope.parse_time = function(time) {
        return time.split("#").map(function(t) {
            return $scope.format_time(t, "yyyy.MM.dd");
        }).join("-")
    }
    $scope.mark = function(type, order) {
        var confirm_title = ["", "接受", "拒绝", "收款"];
        $scope.confirm.title = "请确认";
        $scope.confirm.content = confirm_title[type];
        $scope.confirm.open();
        $scope.confirm.cancle_callback = function() {}
        $scope.confirm.ok_callback = function() {
            toastServices.show();
            userServices.mark({
                orders_id: order.orders_id,
                transaction_id: order.transaction_id,
                type: type,
            }).then(function(data) {
                toastServices.hide()
                if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                    errorServices.autoHide(data.message);
                    $timeout(function() {
                        $route.reload();
                    }, 2000)
                } else {
                    errorServices.autoHide(data.message);
                }
            })
        }
    }
})
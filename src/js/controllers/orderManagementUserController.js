angular.module("Uelives").controller("orderManagementUserController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        type: 'wait',
        status: 'wait'
    }


    $scope.orders = [{
        type: "wait",
        status: "1",
        status_message: "",
        title: "",
        from_date: "",
        end_date: "",
        summary: "",
        user: {
            avatar: "",
            name: "",
        }
    }, {
        type: "wait",
        status: "2",
        status_message: "",
        title: "",
        from_date: "",
        end_date: "",
        summary: "",
        user: {
            avatar: "",
            name: "",
        }
    }, {
        type: "confirm",
        status: "3",
        status_message: "",
        title: "",
        from_date: "",
        end_date: "",
        summary: "",
        user: {
            avatar: "",
            name: "",
        }
    }, {
        type: "confirm",
        status: "4",
        status_message: "",
        title: "",
        from_date: "",
        end_date: "",
        summary: "",
        user: {
            avatar: "",
            name: "",
        }
    }, {
        type: "finish",
        status: "5",
        status_message: "",
        title: "",
        from_date: "",
        end_date: "",
        summary: "",
        user: {
            avatar: "",
            name: "",
        }
    }, {
        type: "finish",
        status: "6",
        status_message: "",
        title: "",
        from_date: "",
        end_date: "",
        summary: "",
        user: {
            avatar: "",
            name: "",
        }
    }, {
        type: "cancel",
        status: "7",
        status_message: "",
        title: "",
        from_date: "",
        end_date: "",
        summary: "",
        user: {
            avatar: "",
            name: "",
        }
    }, {
        type: "cancel",
        status: "8",
        status_message: "",
        title: "",
        from_date: "",
        end_date: "",
        summary: "",
        user: {
            avatar: "",
            name: "",
        }
    }];
    $scope.active_tab = function(tab_index) {
        if (tab_index == $scope.input.type && tab_index == $scope.input.status) {
            return;
        }
        $scope.input.type = tab_index;
        $scope.input.status = tab_index;




    };


})
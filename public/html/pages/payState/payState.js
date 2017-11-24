"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/payState/:pageType/:state', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/payState/payState.html";
            },
            controller: "payStateController"
        });
}]).controller('payStateController', ['$scope', '$location', '$cookieStore', 'MarketSvc', '$routeParams', 'OrderSvc', function ($scope, $location, $cookieStore, MarketSvc, $routeParams, OrderSvc) {
    $scope.$root.pageType = $routeParams.pageType;
    $scope.state = $routeParams.state;
    $scope.orderNo = $routeParams.orderNo;
    $scope.orderProduct = unescape($routeParams.orderProduct);
    //console.log(unescape($scope.orderProduct));
    $scope.orderPrice = $routeParams.orderPrice;
    $scope.returnUrl = $routeParams.returnUrl;

    function getFlowCoupon(price, max) {
        if (price <= max) {
            return Math.floor(price);
        } else {
            return max;
        }
    }

    function getFeeCoupon(price, max) {
        for (var i = 0; i <= max / 5; i++) {
            if (i * 50 == price) {
                return i * 5;
            }
            if (i * 50 > price) {
                return (i - 1) * 5;
            }
            if (i * 50 < price && i * 5 >= max) {
                return max;
            }
        }
    }

    $scope.rechargeDetails = "";

    $scope.goToMall = function (state) {
        if (state === 'flow') {
            $scope.tipsShow = true;
        }
        if (state === 'phone') {
            window.location.href = "http://mall.yfq.cn";
        }
    };

    OrderSvc.getOrder($scope.orderNo).then(function success(data) {
        $scope.order = data[0];

        if ($scope.state === 'phone') {
            $scope.getCoupon = 0;
        }

        if ($scope.state === 'flow') {
            if ($scope.order.product.productname == '话费充值') {
                $scope.rechargeDetails = $scope.order.flowPrice.productName + "话费";
                $scope.getCoupon = getFeeCoupon($scope.order.salesOrder.amount, 30);
            } else {
                $scope.rechargeDetails = $scope.order.flowPrice.productName + $scope.order.flowPrice.region + "流量";
                $scope.getCoupon = getFlowCoupon($scope.order.salesOrder.totalamount, 30);
            }
        }
    });

}]);
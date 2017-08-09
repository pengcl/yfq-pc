/*
"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/flow/index', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/flow/flow.html";
            },
            controller: "flowIndexController"
        });
}]).controller('flowIndexController', ['$scope', '$location', '$cookieStore', 'MarketSvc', function ($scope, $location, $cookieStore, MarketSvc) {

    $scope.$root.pageTitle = '翼分期';

    $scope.limitTo = 3;
    $scope.showMore = true;
    
    $scope.category = systemName + "_flowBag_A";
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    if ($cookieStore.get('rechargeMobile')) {
        $scope.mobile = $cookieStore.get('rechargeMobile');
    }
    
    //只有输入手机号码才记录到闭环
    $scope.inputMobile = function (mobile) {
    	if (mobile == undefined || mobile == "" || mobile.length <= 10) return;
    	writebdLog($scope.category, "_InputMobile", "渠道号", $scope.gh);//手机号码
    };

    $scope.more = function () {
        $scope.product = null;
        $scope.limitTo = 100;
        if ($scope.listData) {
            $scope.showMore = false;
        }
    };

    $scope.getFlows = function (mobile) {
        MarketSvc.getFlows(mobile).then(function success(data) {
            $scope.listData = data;
        });
    };

    $scope.selectedProd = function (product) {
        $scope.product = product;
        $scope.showMore = true;
        $scope.regionProducts = product.regionProducts;
        $scope.regionProduct = $scope.regionProducts[0];
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);
        //$scope.showMore = !$scope.showMore;
    };

    /!*$scope.unSelectedProd = function () {
        $scope.product = null;
    };*!/

    $scope.buyProd = function (product) {
        $scope.regionProduct = product;
    };

    /!*$scope.showOverlay = function () {
        $scope.state.overlay.open(true, $("#flowTips").html());
    };*!/

    $scope.pay = function (isChecked, mobile, productId, productFlowPriceId, carrier, activityTag, channelCode) {
        if (!isChecked) {
            return false;
        }
        MarketSvc.pay(mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, encodeURIComponent('http://mall.yfq.cn/payState/A/flow?returnUrl=' + encodeURIComponent(window.location.href))).then(function success(data) {
            if (data.result) {
                window.location.href = data.payUrl;
                writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);
            } else {
                console.log(data.msg);
            }
        });
    };

    $scope.$watch('mobile', function (n, o, $scope) {
        if (n) {
            $cookieStore.put('rechargeMobile', n);
            MarketSvc.getFlows(n).then(function success(data) {
                $scope.listData = data;
            });
        } else {
            $scope.product = null;
            $scope.regionProduct = null;
            $scope.listData = null;
        }
    });
}]);*/

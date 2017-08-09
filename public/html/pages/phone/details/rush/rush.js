"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/phs/rs/:pageType/:phoneId/:activityProductId/:activeDate/:dayTag', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/phone/details/rush/" + $routeParams.pageType + "/rush.html";
            },
            controller: "pRushProController"
        });
}]).controller('pRushProController', ['$scope', '$location', '$http', '$interval', '$routeParams', '$cookieStore', function ($scope, $location, $http, $interval, $routeParams, $cookieStore) {
    $scope.$root.pageType = $routeParams.pageType;
    $scope.activeDate = $routeParams.activeDate;
    $scope.activityProductId = $routeParams.activityProductId;
    $scope.$root.params = window.location.search;
    $scope.activeTag = "xsqg";
    $scope.category = systemName + "_mysy_" + $scope.pageType + "_RushPhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
    $scope.mainTipsIndex = 0;
    $scope.mainPayTipsIndex = 0;
    $http.jsonp("http://m.yfq.cn/product/getProDetial.html?productId=" + $routeParams.phoneId + "&activeTag=jjk&pt=pc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;

        //seo start
        $scope.$root.pageTitle = $scope.phone.phoneTypes[0].productName + "产品页-翼分期商城";
        $scope.$root.pageKeywords = $scope.phone.phoneTypes[0].productName + "," + $scope.phone.phoneTypes[0].productName + "全网通," + $scope.phone.phoneTypes[0].productName + "分期, " + $scope.phone.phoneTypes[0].productName + "优惠, " + $scope.phone.phoneTypes[0].productName + "秒杀,手机卡、上网卡、天翼4G卡、电信套餐、电信4G、套餐资费、手机套餐、手机靓号、电信流量卡、电信4G套餐";
        $scope.$root.pageDescription = $scope.phone.phoneTypes[0].productName + "入网即享0利息0手续费轻松购。传飞翼分期商城是中国电信唯一指定分期平台，提供手机、平板、笔记本、数码相机等3C类产品分期购物服务，分期购机价和手续费都是全网最低，上线至今赢得客户的一致好评与信赖！咨询热线：020-85599918。";
        //seo end

        $scope.package = $scope.phone.packageProductList[0];
        $scope.totolPrice = data.salePrice;

        $scope.payType = 0;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    $scope.rashActiveDate = $cookieStore.get("rashActiveDate");
    $scope.rashActiveDateE = $scope.rashActiveDate.split(" ")[0] + " " + (parseInt($routeParams.activeDate) + 1) + ":00:00";

    $http.jsonp(apiBaseUrl + "/product/getServerTime.html?s=wap&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.serverTime = data[0].serverTime;
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    $http.jsonp(apiBaseUrl + "/product/getActiveProductLast.html?activeTag=xsqg&activeTime=" + $routeParams.activeDate + "&activeDate=" + $routeParams.dayTag + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phoneStatu = data[0].productList[getIndex(data[0].productList,"activityProductId",$routeParams.activityProductId)];
        console.log(data);
    }).error(function (data, status, headers, config) {
        console.log(status);
    });



    $scope.activeTagName = "裸机+5折话费套餐";

    $scope.buyType = 1;
    toTop();

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.setPayType = function (event, type) {
        event.preventDefault();
        $scope.payType = type;
        
        value = payTypeAry[type];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    };

    $scope.setPackage = function (event, pkg, index) {
        $scope.package = pkg;
        //var $this = $(event.currentTarget);
        $scope.mainTipsIndex = index;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    $http.jsonp('http://m.yfq.cn/product/getProList.html?activeTag=jjk&pt=pc&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.domShow = function (event, obj) {
        event.preventDefault();
        $("body").addClass("modal-open");
        $(obj).show();
        writebdLog($scope.category, "_Show" + obj.replace("\#", ""), "渠道号", $scope.gh);//去看看
    };
    $scope.domHide = function (event, obj) {
        event.preventDefault();
        $("body").removeClass("modal-open");
        $(obj).hide();
    };

    $scope.submitForm = function (e) {
        e.preventDefault();
        if($("#productBuyNow").hasClass("disabled")){
            return false;
        }
        if ($scope.buyType == 1) {
            if ($scope.checkMainNumber()) {
                writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//去购买
                $("#productDetailsForm").submit();
            }
        } else {
            writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//去购买
            $("#productDetailsForm").submit();
        }
    }

}]);
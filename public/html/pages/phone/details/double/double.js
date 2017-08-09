"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/phs/db/:pageType/:phoneId', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/phone/details/double/" + $routeParams.pageType + "/double.html";
            },
            controller: "pDoubleProController"
        });
}]).controller('pDoubleProController', ['$scope', '$location', '$http', '$interval', '$routeParams', function ($scope, $location, $http, $interval, $routeParams) {

    $scope.$root.pageTitle = "翼分期商城-广东电信官方唯一指定分期商城";
    $scope.$root.pageType = $routeParams.pageType;
    $scope.$root.params = window.location.search;

    $scope.activeTag = "mysy";
    $scope.mainTipsIndex=0;
    $scope.mainPayTipsIndex=0;
    $scope.appType = systemName + "_mysy_" + $scope.pageType + "_DoublePhones";
    $scope.category = $scope.appType;
    $scope.phoneQueryUrl = window.location.href;
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
    
    $scope.buyType = 1;

    toTop();

    $http.jsonp("http://m.yfq.cn/product/getProDetial.html?productId=" + $routeParams.phoneId + "&activeTag=mysy&pt=pc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;

        //seo start
        $scope.$root.pageTitle = $scope.phone.phoneTypes[0].productName + " + " + $scope.phone.phoneTypes[1].productName + "产品页-翼分期商城";
        $scope.$root.pageKeywords = $scope.phone.phoneTypes[0].productName + " + " + $scope.phone.phoneTypes[1].productName + "," + $scope.phone.phoneTypes[0].productName + " + " + $scope.phone.phoneTypes[1].productName + "全网通," + $scope.phone.phoneTypes[0].productName + " + " + $scope.phone.phoneTypes[1].productName + "分期, " + $scope.phone.phoneTypes[0].productName + " + " + $scope.phone.phoneTypes[1].productName + "优惠, " + $scope.phone.phoneTypes[0].productName + " + " + $scope.phone.phoneTypes[1].productName + "秒杀,手机卡、上网卡、天翼4G卡、电信套餐、电信4G、套餐资费、手机套餐、手机靓号、电信流量卡、电信4G套餐";
        $scope.$root.pageDescription = $scope.phone.phoneTypes[0].productName + " + " + $scope.phone.phoneTypes[1].productName + "入网即享0利息0手续费轻松购。传飞翼分期商城是中国电信唯一指定分期平台，提供手机、平板、笔记本、数码相机等3C类产品分期购物服务，分期购机价和手续费都是全网最低，上线至今赢得客户的一致好评与信赖！咨询热线：020-85599918。";
        //seo end

        $scope.package=$scope.phone.packageProductList[0];
        $scope.totolPrice = data.salePrice;

        if($scope.totolPrice > 1500){
            $scope.payType = 2;
        }else {
            $scope.payType = 0;
        }

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $http.jsonp('http://m.yfq.cn/product/getProList.html?activeTag=mysy&pt=pc&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.doublePhones = data;
    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.domShow = function (event,obj){
        event.preventDefault();
        $("body").addClass("modal-open");
        $(obj).show();
        writebdLog($scope.category, "_Show"+obj.replace("\#",""), "渠道号", $scope.gh);//去看看
    };

    $scope.domHide = function (event,obj){
        event.preventDefault();
        $("body").removeClass("modal-open");
        $(obj).hide();
    };

    $scope.setPackage = function (event, pkg) {
        event.preventDefault();
        $scope.package = pkg;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.setPayType = function (event, type) {
        event.preventDefault();
        $scope.payType = type;
        
        value = payTypeAry[type];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    };

    $scope.submitForm = function (e) {
        e.preventDefault();
        if($scope.checkMainNumber()){
        	writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//去购买
            $("#productDetailsForm").submit();
        }
    }

}]);
"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/phone/:pageType/index', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/phone/index/" + $routeParams.pageType + "/index.html";
            },
            controller: "pIndexController"
        });
}]).controller('pIndexController', ['$scope', '$location', '$http', '$interval', '$routeParams', function ($scope, $location, $http, $interval, $routeParams) {
    $scope.$root.pageType = $routeParams.pageType;

    //seo start
    $scope.$root.pageTitle = "翼分期商城-广东电信官方唯一指定分期商城";
    $scope.$root.pageKeywords = "手机卡、上网卡、天翼4G卡、电信套餐、电信4G、套餐资费、手机套餐、手机靓号、电信流量卡、电信4G套餐、电信手机卡、4G卡、iphone手机、华为手机、苹果手机、oppo手机、vivo手机";
    $scope.$root.pageDescription = "传飞翼分期商城是中国电信唯一指定分期平台，提供手机、平板、笔记本、数码相机等3C类产品分期购物服务，分期购机价和手续费都是全网最低，上线至今赢得客户的一致好评与信赖！产品都是正品国行，分期手续便捷，还款方式灵活。咨询热线：020-85599918。";
    //seo end

    $scope.$root.pageName = 'index';

    $scope.appType = systemName + "_ljzm_" + $scope.pageType + "_index";
    $scope.category = $scope.appType;

    if (window.location.search == '') {
        $scope.$root.params = '?gh=&activity='
    } else {
        $scope.$root.params = window.location.search;
    }

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $http.jsonp('http://sell.yfq.cn/product/getProList.ht?activeTag=ljzma&pt=pc&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;

        console.log(typeof ($scope.singlePhones[0].sortOrder));

        $scope.pkgs = data;
        $("#banner").owlCarousel({
            navigation: true, // Show next and prev buttons
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: true,
            autoPlay: 3000
        });

        $("#brand").owlCarousel({
            navigation: true, // Show next and prev buttons
            slideSpeed: 300,
            paginationSpeed: 400,
            items: 8,
            autoPlay: 3000,
            navigationText: ["&lt", ">"],
            pagination: false
        });

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    $scope.ftClose = function () {
        $(".footer-ft").hide();
    };

    /*$interval(function () {
     $scope.selkillTxt = getRandomName() + "，刚刚购买了 " + getRandomProduct();
     }, 2000);*/

    //记录用户购买的商品：专区模块英文名称+商品id
    $scope.writeSelectFoods = function (obj, productId, modular) {
        writebdLog($scope.category, "_ClickGoods" + productId, "渠道号", $scope.gh);//选择的商品ID
    };

    $scope.$root.scrollTo = function (event, index, className) {
        $scope.navSortIndex = index;
        $("html,body").animate({
            scrollTop: $(className).offset().top
        }, 500, 'swing');
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $("img.lazy").lazyload({
            effect: "fadeIn"
        });
    });

    $scope.priceArea = [1500, 3500];

    $scope.setPriceArea = function (priceArea) {
        $scope.priceArea = priceArea;
    };

    var $window = $(window);
    window.onscroll = function () {
        var $indexNavSort = $(".index-nav-sort");
        if ($window.scrollTop() > 720) {
            $indexNavSort.addClass("is-lift-nav-fixed");
            /*if ($window.scrollTop() >= $(".ng-rush").offset().top && $window.scrollTop() < $(".single-phone").offset().top) {
             $scope.$apply(function () {
             //wrapped this within $apply
             $scope.navSortIndex = 0;
             });
             }*/
            if ($window.scrollTop() >= $(".single-phone").offset().top) {
                $scope.$apply(function () {
                    //wrapped this within $apply
                    $scope.navSortIndex = 1;
                });
            }
        }
        else {
            $indexNavSort.removeClass("is-lift-nav-fixed");
        }
        //console.log($window.scrollTop(), $(".ng-rush").offset().top, $(".single-phone").offset().top, $(".double-phone").offset().top);
    };

    $scope.$on("$destroy", function () {
        window.onscroll = null;
    })

}]);
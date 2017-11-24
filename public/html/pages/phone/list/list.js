"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/phone/:pageType/list', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/phone/list/" + $routeParams.pageType + "/list.html";
            },
            controller: "pListController"
        });
}]).controller('pListController', ['$scope', '$location', '$http', '$routeParams', '$filter', function ($scope, $location, $http, $routeParams, $filter) {

    $scope.$root.pageType = $routeParams.pageType;

    //seo start
    $scope.$root.pageTitle = "翼分期商城-广东电信官方唯一指定分期商城";
    $scope.$root.pageKeywords = "手机卡、上网卡、天翼4G卡、电信套餐、电信4G、套餐资费、手机套餐、手机靓号、电信流量卡、电信4G套餐、电信手机卡、4G卡、iphone手机、华为手机、苹果手机、oppo手机、vivo手机";
    $scope.$root.pageDescription = "传飞翼分期商城是中国电信唯一指定分期平台，提供手机、平板、笔记本、数码相机等3C类产品分期购物服务，分期购机价和手续费都是全网最低，上线至今赢得客户的一致好评与信赖！产品都是正品国行，分期手续便捷，还款方式灵活。咨询热线：020-85599918。";
    //seo end

    $scope.appType = systemName + "_ljzm_" + $scope.pageType + "_list";
    $scope.category = $scope.appType;

    $scope.$root.pageName = 'list';

    //$scope.$root.params = window.location.search;
    if (window.location.search == '') {
        $scope.$root.params = '?gh=&activity='
    } else {
        $scope.$root.params = window.location.search;
    }
    $scope.gh = $location.search().gh;

    //统计
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    $scope.getContact = function () {
        getMeiqia();
        //$("#contactUs").show();
        _MEIQIA('showPanel');
        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.$root.filterBrand = 'all';
    $scope.filterSpec = 'all';
    $scope.$root.filterPrice = 'all';
    $scope.phoneFilter = 'null';
    $scope.filterSellOut = true;

    if (!!$location.search().spec && $location.search().spec != 'all') {
        $scope.filterSpec = $location.search().spec;
    }

    if (!!$location.search().brand && $location.search().brand != 'all') {
        $scope.$root.filterBrand = $location.search().brand;
    }

    if (!!$location.search().price && $location.search().price != 'all') {
        $scope.$root.filterPrice = $.parseJSON(unescape($location.search().price));
    }

    if (!!$location.search().brandMore) {
        $scope.brandMore = $.parseJSON(unescape($location.search().brandMore));
    }else {
        $scope.brandMore = false;
    }

    $scope.showBrandMore = function (state) {
        $scope.brandMore = state;
    };

    $scope.filterObj = {
        brand: $scope.$root.filterBrand,
        spec: $scope.filterSpec,
        price: $scope.$root.filterPrice,
        sellOut: $scope.filterSellOut
    };

    $scope.pageSize = 16;
    $scope.dataInit = function () {
        $scope.selPage = 1;
        //$scope.pages = Math.ceil($scope.singlePhones.length / $scope.pageSize); //分页数
        $scope.setData();
    };

    $scope.setData = function () {
        $scope.filterData = $filter('phoneListFilter')($scope.singlePhones, $scope.filterObj.brand, $scope.filterObj.spec, $scope.filterObj.price, $scope.filterObj.sellOut);
        $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
        $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
    };

    $scope.selectPage = function (page) {
        //不能小于1大于最大
        if (page < 1) {
            return;
        }

        if (page > $scope.pages) {
            return;
        }

        $scope.selPage = page;
        $scope.setData();
        $scope.isActivePage(page);
        //console.log("选择的页：" + page);
    };

    $scope.toListTop = function () {
        $("html,body").animate({
            scrollTop: $(".phone-filter").offset().top
        }, 500, 'swing');
    };

    $scope.isActivePage = function (page) {
        return $scope.selPage == page;
    };
    //上一页
    $scope.Previous = function () {
        $scope.selectPage($scope.selPage - 1);
        $scope.toListTop();

        //writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);
    };
    //下一页
    $scope.Next = function () {
        $scope.selectPage($scope.selPage + 1);
        $scope.toListTop();
        //writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);
    };


    $http.jsonp('http://sell.yfq.cn/product/getProDetailList.ht?activeTag=ljzma&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {

        $scope.singlePhones = data;
        var trimBrands = ["iPhone", "华为", "OPPO", "vivo", "小米"];
        var brands = [];
        $.each(data, function (i, k) {
            if (brands.indexOf(k.brandName) === -1 && trimBrands.indexOf(k.brandName) === -1) {
                brands.push(k.brandName);
            }
        });
        $scope.brands = brands;
        //$scope.filterItems = $filter('phoneListFilter')(data, $scope.$root.filterBrand, $scope.filterSpec, $scope.$root.filterPrice, $scope.filterSellOut);

        $scope.dataInit();

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

    toTop();


    $scope.ifSellOut = false;

    $scope.showIfSellOut = function () {
        $scope.filterObj.sellOut = !$scope.filterObj.sellOut;
        writebdLog($scope.category, "_FilterStock", "渠道号", $scope.gh);//筛选是否有货
    };

    $scope.setFilterBrand = function (brand) {
        $scope.filterObj.brand = brand;
        writebdLog($scope.category, "_FilterBrand", "渠道号", $scope.gh);//筛选品牌
    };

    $scope.setFilterSpec = function (spec) {
        $scope.filterObj.spec = spec;
        writebdLog($scope.category, "_FilterSpec", "渠道号", $scope.gh);//筛选规格
    };

    $scope.setFilterPrice = function (price) {
        $scope.filterObj.price = price;
        writebdLog($scope.category, "_FilterPrice", "渠道号", $scope.gh);//筛选价格
    };

    $scope.setPhoneFilter = function (keyWord) {
        $scope.phoneFilter = keyWord;

        if (keyWord.indexOf("-") === -1) {
            $scope.singlePhones = $scope.singlePhones.sort(function (a, b) {
                return b[keyWord] - a[keyWord];
            });
        } else {
            $scope.singlePhones = $scope.singlePhones.sort(function (a, b) {
                return a[keyWord.substring(1)] - b[keyWord.substring(1)];
            });
        }

        /*console.log($scope.singlePhones[0].salePrice, $scope.singlePhones[0].activityproductId, $scope.singlePhones[0].commentNum);*/

        $scope.dataInit();
        writebdLog($scope.category, "_" + keyWord.replace('-', ''), "渠道号", $scope.gh);//排序
    };

    $scope.ftClose = function () {
        $(".footer-ft").hide();
    };


    $scope.$watch('filterObj', function (n, o, $scope) {
        if (n != o) {
            $scope.dataInit();
        }
    }, true);


    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在数据 render完成后执行的js
        $("img.lazy").lazyload({
            effect: "fadeIn"
        });
    });

}]);
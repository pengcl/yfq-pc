"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/phs/sg/:pageType/:phoneId', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/phone/details/single/" + $routeParams.pageType + "/single.html";
            },
            controller: "pSingleProController"
        });
}]).controller('pSingleProController', ['$scope', '$location', '$http', '$interval', '$routeParams', function ($scope, $location, $http, $interval, $routeParams) {
    $scope.$root.pageType = $routeParams.pageType;
    $scope.$root.params = window.location.search;
    $scope.activeTag = "jjk";
    $scope.category = systemName + "_mysy_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
    $scope.mainTipsIndex=0;
    $scope.mainPayTipsIndex=0;

    var butie = "358:6388;359:5388;360:3880;361:2980;362:2400";

    $http.jsonp("http://m.yfq.cn/product/getProDetial.html?productId=" + $routeParams.phoneId + "&activeTag=jjk&pt=pc&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;

        //seo start
        $scope.$root.pageTitle = $scope.phone.phoneTypes[0].productName + "产品页-翼分期商城";
        $scope.$root.pageKeywords = $scope.phone.phoneTypes[0].productName + "," + $scope.phone.phoneTypes[0].productName + "全网通," + $scope.phone.phoneTypes[0].productName + "分期, " + $scope.phone.phoneTypes[0].productName + "优惠, " + $scope.phone.phoneTypes[0].productName + "秒杀,手机卡、上网卡、天翼4G卡、电信套餐、电信4G、套餐资费、手机套餐、手机靓号、电信流量卡、电信4G套餐";
        $scope.$root.pageDescription = $scope.phone.phoneTypes[0].productName + "入网即享0利息0手续费轻松购。传飞翼分期商城是中国电信唯一指定分期平台，提供手机、平板、笔记本、数码相机等3C类产品分期购物服务，分期购机价和手续费都是全网最低，上线至今赢得客户的一致好评与信赖！咨询热线：020-85599918。";
        //seo end

        $http.jsonp('http://m.yfq.cn/product/getPackageList.html?activeTag=fqssj&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
            $scope.pkgs = data;

            $scope.packageIndex = 0;

            var cardItems = $scope.phone.cardItems.split(";").sort(function (a, b) {
                return a.slice(a.indexOf(":") + 1, a.length) - b.slice(b.indexOf(":") + 1, b.length);
            });


            $scope.packages = [];

            $.each(eval(cardItems), function (i, k) {
                var obj = $scope.pkgs[getIndex($scope.pkgs, "productId", k.slice(0, k.indexOf(':')))];
                obj.phonePrice = k.slice(k.indexOf(':') + 1, k.length);
                obj.comparePrices = $scope.phone.phoneBillPrice - obj.salesPrice;

                $.each(eval(butie.split(";")), function (jtem, value) {
                    if (value.split(":")[0] == k.slice(0, k.indexOf(':'))) {
                        if ($scope.phone.salePrice > value.split(":")[1]) {
                            obj.comparePrices = obj.oldPrice * 18 + ($scope.phone.salePrice - value.split(":")[1]);
                        } else {
                            obj.comparePrices = obj.oldPrice * 18;
                        }
                    }
                });

                $scope.packages.push(obj);
            });

            for (var i = 1; i < $scope.packages.length; i++) {
                if ($scope.packages[i].comparePrices < $scope.packages[$scope.packageIndex].comparePrices) {
                    $scope.packageIndex = i;
                }
            }

            $scope.package = $scope.packages[$scope.packageIndex];

        }).error(function (data, status, headers, config) {
            console.log(status);
            //deferred.reject(status)
        });
    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    $scope.activeTagName = "裸机+5折话费套餐";

    $scope.buyType = 1;
    toTop();

    $scope.setBuyType = function (event, type) {
        event.preventDefault();
        $scope.buyType = type;
        var $this = $(event.currentTarget);
        $this.siblings().removeClass('curr');
        $this.addClass('curr');
        if (type == 0) {
            $scope.activeTag = "lj";
        } else {
            $scope.activeTag = "jjk";
        }
        writebdLog($scope.category, "_SelectBuyType", "渠道号", $scope.gh);//选择购买方式
    };

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.setPayType = function (event, type) {
        event.preventDefault();
        $scope.payType = type;
        
        value = payTypeAry[type];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    };

    $scope.setDefaultPayType = function (type) {
        $scope.payType = type;
    };

    $scope.setDefaultPayType(0);

    $scope.setPackage = function (event, pkg,index) {
        $scope.package = pkg;
        //var $this = $(event.currentTarget);
        $scope.mainTipsIndex=index;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };

    $http.jsonp('http://m.yfq.cn/product/getProList.html?activeTag=jjk&pt=pc&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
        $scope.singlePhones = data;
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

    $scope.submitForm = function (e) {
        e.preventDefault();
        if($("#productBuyNow").hasClass("disabled")){
            return false;
        }
        if($scope.buyType == 1){
            if($scope.checkMainNumber()){
                writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//去购买
                $("#productDetailsForm").submit();
            }
        }else {
            writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//去购买
            $("#productDetailsForm").submit();
        }
    };

    $scope.$watch('package', function (n, o, $scope) {
        if (n != o) {
            $.each(eval(butie.split(";")), function (i, k) {
                if (k.split(":")[0] == n.productId) {
                    $scope.btp = k.split(":")[1];
                }
            });

            if ($scope.phone.salePrice > $scope.btp) {
                $scope.totalPrice = $scope.package.oldPrice * 18 + ($scope.phone.salePrice - $scope.btp);
            } else {
                $scope.totalPrice = $scope.package.oldPrice * 18;
            }
        }
    }, true);

}]);
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

    $scope.$root.pageTitle = '翼分期商城-广东电信官方唯一指定分期商城';
    $scope.$root.pageType = $routeParams.pageType;
    $scope.$root.params = window.location.search;
    $scope.activeTag = "ljzma";
    $scope.category = systemName + "_ljzm_" + $scope.pageType + "_SinglePhones";
    $scope.phoneQueryUrl = "http://" + $location.host() + $location.url();
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);
    $scope.mainTipsIndex = 0;
    $scope.mainPayTipsIndex = 0;

    $scope.limitNo = 5;

    $scope.setlimitNo = function (num) {
        $scope.limitNo = num;
    };

    $scope.$root.pageName = 'details';

    $http.jsonp("http://sell.yfq.cn/product/getProDetial.ht?productId=" + $routeParams.phoneId + "&activeTag=ljzma&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
        $scope.phone = data;

        if ($scope.phone.phoneTypes[0].fullDescription) {
            $scope.phone.phoneTypes[0].fullDescription = $scope.phone.phoneTypes[0].fullDescription.replace(/src=\"\/upload\//gi, 'src="http://cz.gd189fq.com/backend/upload/');
        }

        //seo start
        $scope.$root.pageTitle = $scope.phone.phoneTypes[0].productName + "产品页-翼分期商城";
        $scope.$root.pageKeywords = $scope.phone.phoneTypes[0].productName + "," + $scope.phone.phoneTypes[0].productName + "全网通," + $scope.phone.phoneTypes[0].productName + "分期, " + $scope.phone.phoneTypes[0].productName + "优惠, " + $scope.phone.phoneTypes[0].productName + "秒杀,手机卡、上网卡、天翼4G卡、电信套餐、电信4G、套餐资费、手机套餐、手机靓号、电信流量卡、电信4G套餐";
        $scope.$root.pageDescription = $scope.phone.phoneTypes[0].productName + "入网即享0利息0手续费轻松购。传飞翼分期商城是中国电信唯一指定分期平台，提供手机、平板、笔记本、数码相机等3C类产品分期购物服务，分期购机价和手续费都是全网最低，上线至今赢得客户的一致好评与信赖！咨询热线：020-85599918。";
        //seo end

        /*$scope.package = $scope.phone.packageProductList[0];*/
        /*$scope.totolPrice = data.salePrice;*/

        /*if($scope.totolPrice > 1500){
         $scope.payType = 2;
         }else {
         $scope.payType = 0;
         }*/

        $scope.payType = 0;

        $http.jsonp("http://cz.gd189fq.com/yfqcz/czInterfaceController.do?messageDetail&productId=" + $routeParams.phoneId + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            $scope.feedbacks = data;
            $scope.feedbackType = 'all';
        }).error(function (data, status, headers, config) {
            console.log(status);
        });

    }).error(function (data, status, headers, config) {
        console.log(status);
    });

    $scope.activeTagName = "裸机+5折话费套餐";

    $scope.buyType = 0;
    toTop();

    /*$scope.setBuyType = function (event, type) {
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
     };*/

    var value;
    var payTypeAry = ['payAll', 'payCOD', 'payMonthly'];
    $scope.setPayType = function (event, type) {
        //event.preventDefault();
        $scope.payType = type;

        value = payTypeAry[type];
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//选择支付方式
    };

    /*$scope.setPackage = function (event, pkg, index) {
        $scope.package = pkg;
        //var $this = $(event.currentTarget);
        $scope.mainTipsIndex = index;
        writebdLog($scope.category, "_SelectPackage", "渠道号", $scope.gh);//选择套餐
    };*/

    $scope.setFlashDriver = function (flash,isSoldOut) {
        if (isSoldOut) {
            return false;
        }
        $scope.productId = flash.productId;
        writebdLog($scope.category, "_FuselageMemory", "渠道号", $scope.gh);
        //window.location.href = 'http://' + window.location.host + '/phs/dj/A/' + flash.productId + window.location.search;
    };

    $http.jsonp('http://sell.yfq.cn/product/getProList.ht?activeTag=ljzma&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
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
        if ($("#productBuyNow").hasClass("disabled")) {
            return false;
        }
        /*if($scope.buyType == 1){
         if($scope.checkMainNumber()){
         $("#productDetailsForm").submit();
         writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//去购买
         }
         }else {*/
        $("#productDetailsForm").submit();
        writebdLog($scope.category, "_BuyNow", "渠道号", $scope.gh);//去购买
        /*}*/
    };

    $scope.setFeedbackType = function (type) {
        $scope.feedbackType = type;
        writebdLog($scope.category, "_" + type, "渠道号", $scope.gh);//点击评价
    };

    $scope.$watch('feedbackType', function (n, o, $scope) {
        $scope.typeFeedbacks = [];
        if (n != undefined && n != o) {
            if ($scope.feedbacks.success) {
                if (n === 'all') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        $scope.typeFeedbacks.push(k);
                    });
                }
                if (n === 'best') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 >= 4) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
                if (n === 'good') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 > 2 && rate / 3 < 4) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
                if (n === 'bad') {
                    $.each($scope.feedbacks.result, function (i, k) {
                        var rate = parseInt(k.starRating1) + parseInt(k.starRating2) + parseInt(k.starRating3);
                        if (rate / 3 <= 2) {
                            $scope.typeFeedbacks.push(k);
                        }
                    });
                }
            }
        }

    });

    $scope.$watch('productId', function (n, o, $scope) {
        if (n != o) {
            $http.jsonp("http://sell.yfq.cn/product/getProDetial.ht?productId=" + n + "&activeTag=ljzma&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                $scope.phone = data;

                if ($scope.phone.phoneTypes[0].fullDescription) {
                    $scope.phone.phoneTypes[0].fullDescription = $scope.phone.phoneTypes[0].fullDescription.replace(/src=\"\/upload\//gi, 'src="http://cz.gd189fq.com/backend/upload/');
                }

                var _colors = data.phoneTypes[0].mediaProductList;
                var _colorIndex = getIndex(data.phoneTypes[0].mediaProductList, "name", $scope.$root.mainColor.name);

                if (_colorIndex == undefined || data.phoneTypes[0].mediaProductList[_colorIndex].stock == 0) {
                    $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[getIndex(data.phoneTypes[0].mediaProductList, 'selected', 1)];
                } else {
                    $scope.$root.mainColor = data.phoneTypes[0].mediaProductList[_colorIndex];
                }


                $http.jsonp("http://cz.gd189fq.com/yfqcz/czInterfaceController.do?messageDetail&productId=" + n + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                    $scope.feedbacks = data;
                    $scope.feedbackType = 'all';
                }).error(function (data, status, headers, config) {
                    console.log(status);
                });

            }).error(function (data, status, headers, config) {
                console.log(status);
            });

        }
    });

}]);
'use strict';

//map
function Map() {
    var struct = function (key, value) {
        this.key = key;
        this.value = value;
    };
    var put = function (key, value) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                this.arr[i].value = value;
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key, value);
    };

    var get = function (key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                return this.arr[i].value;
            }
        }
        return null;
    };

    var remove = function (key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if (v.key === key) {
                continue;
            }
            this.arr.unshift(v);
        }
    };
    var size = function () {
        return this.arr.length;
    };

    var isEmpty = function () {
        return this.arr.length <= 0;
    };
    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.isEmpty = isEmpty;
};

//统计 开始
function operation() {
    var pageName = "";
    var productName = "";
    var productId = "";
    var map = null;
    var loc = window.location.href;
    this.init = function (pName, pdName, pdId) {
        pageName = pName;
        productName = pdName;
        productId = pdId;
    };
    this.record = function (type) {
        if (type == null) {
            return false;
        }
        map = new Map();
        map.put('operation', type);
        this.writeOperation();
    };
    this.writeOperation = function () {
        var flag = false;
        var info = "flow=" + loc + "&operation=" + map.get('operation');
        info = info.replace("?", "&");//将链接里的？字符转换为&，可以让后台获取
        var url = "http://m.gd189fq.com/record/writeLog.html?" + info + "&s=wap";
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            success: function (json) {

            },
            error: function () {

            }
        });
        return flag;
    };
    this.writeIntentionMsg = function (operationName, operationValue, dataType, opSeq) {
        var url = "http://m.gd189fq.com/record/intentionLog.html";
        $.get(url, {operationName: operationName, operationValue: operationValue, dataType: dataType, opSeq: opSeq},
            function (data) {

            }
        );
    }
};

var op = new operation();

function writebdLog(category, action, opt_label, opt_value) {//category项目，action统计项目，渠道label，渠道号
    op.record(encodeURI(category + action));
};

//美恰在线客服
function getMeiqia() {
    (function (m, ei, q, i, a, j, s) {
        m[a] = m[a] || function () {
            (m[a].a = m[a].a || []).push(arguments)
        };
        j = ei.createElement(q),
            s = ei.getElementsByTagName(q)[0];
        j.async = true;
        j.charset = 'UTF-8';
        j.src = i + '?v=' + new Date().getUTCDate();
        s.parentNode.insertBefore(j, s);
    })(window, document, 'script', '//static.meiqia.com/dist/meiqia.js', '_MEIQIA');
    _MEIQIA('entId', 27864);
    _MEIQIA('withoutBtn');
};


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null)
        return unescape(r[2]);
    return null; //返回参数值
}

/* App Module */
var app = angular.module('app', ['ngResource', 'ngCookies']);
app.config(['$sceProvider', function ($sceProvider) {
    //For sport ie7
    $sceProvider.enabled(false);
}]);

app.directive("ngGh", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "gh/gh.html",
        link: function (scope, element, attrs) {
            scope.gh = $location.search().gh;
        }
    };
}]);

app.directive("headerLogo", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "header/logo/logo.html",
        link: function (scope, element, attrs) {

        }
    };
}]);

app.directive("headerTop", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "header/top/top.html",
        link: function (scope, element, attrs) {

        }
    };
}]);

app.directive("ngActivity", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "activity/activity.html",
        link: function (scope, element, attrs) {
            scope.activity = $location.search().activity;
        }
    };
}]);

app.directive("ngComments", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "comments/comments.html",
        link: function (scope, element, attrs) {
            var $commentsTips = $(".comments-tips");
            var $showQrCodeTips = $(".qrcode-tips");

            scope.scrollTo = function (event, index, className) {
                scope.navSortIndex = index;
                $("html,body").animate({
                    scrollTop: 0
                }, 500, 'swing');
            };

            scope.getComments = function (event) {
                event.preventDefault();
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel', {
                    groupToken: '8ba3446475970c6af51f22c9a7bb4fb4'
                });
            };
            scope.showComments = function (event) {
                event.preventDefault();
                $commentsTips.show();
            };
            scope.hideComments = function (event) {
                event.preventDefault();
                $commentsTips.hide();
            };
            scope.addFavorite = function (event) {
                event.preventDefault();
                addFavorite();
            };
            scope.showQrCode = function (event) {
                event.preventDefault();
                $showQrCodeTips.show();
            };
            scope.hideQrCode = function (event) {
                event.preventDefault();
                $showQrCodeTips.hide();
            }
        }
    };
}]);

app.directive("wtf", [function () {
    return {
        restrict: 'A',
        scope: {
            wtfClass: '='
        },
        link: function (scope, element, attrs) {
            var _class;
            if (attrs.wtf) {
                _class = attrs.wtf;
            } else {
                _class = 'active';
            }

            scope.$watch('wtfClass', function (n, o, scope) {
                if (n === true) {
                    $(element).addClass(_class);
                } else {
                    $(element).removeClass(_class);
                }
            });

        }
    };
}]);

app.factory("MarketSvc", ['$http', '$q', function ($http, $q) {
    var service = {};
    service.getFlows = function (mobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp('http://sell.yfq.cn/product/findProductFlows.ht?mobile=' + mobile + '&type=1&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getFees = function (mobile) {
        var d = $q.defer();
        $http.jsonp('http://sell.yfq.cn/product/findProductFlows.ht?mobile=' + mobile + '&type=2&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.pay = function (mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, successUrl, channelUrl, couponNo, referrerId, category) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp('http://sell.yfq.cn/order/submitFlowOrder.ht?mobile=' + mobile + '&productId=' + productId + '&productFlowPriceId=' + productFlowPriceId + '&carrier=' + carrier + '&activityTag=' + activityTag + '&channelCode=' + channelCode + '&successUrl=' + successUrl + '&channelUrl=' + channelUrl + '&couponNo=' + couponNo + '&referrerId=' + referrerId + '&category=' + category + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);

app.factory("CouponSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getCouponList = function (mobile) {//获取订单列表 promise对象
        var d = $q.defer();
        $http.jsonp('http://sell.yfq.cn/product/getCouponList.ht?recieverMobile=' + mobile + '&callback=JSON_CALLBACK').success(function (data) {
            var isOverdueCount = 0;
            var isUsedCount = 0;
            var length = data[0].couponList.length;
            var couponList = {
                "length": length,
                "couponList": []
            };

            $.each(data[0].couponList, function (i, k) {
                var isOverdue;
                if (k.validEndTime.time - Date.parse(new Date()) >= 0) {//没过期
                    isOverdue = 0;
                } else {//已过期
                    isOverdue = 1;
                    isOverdueCount = isOverdueCount + 1;
                }
                if (k.isUsed == 1) {
                    isUsedCount = isUsedCount + 1
                }
                var obj = {
                    couponNo: k.couponNo,
                    activeUsername: k.activeUsername,
                    couponBatchName: k.couponBatchName,
                    validStartTime: k.validStartTime.time,
                    validEndTime: k.validEndTime.time,
                    isUsed: k.isUsed,
                    callbackUrl: k.callbackUrl,
                    type: k.couponBatchType,
                    isOverdue: isOverdue
                };
                couponList.couponList.push(obj);
            });

            couponList.isOverdueCount = isOverdueCount;
            couponList.isUsedCount = isUsedCount;
            return d.resolve(couponList);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);

app.filter('flowCoupon', function () {
    return function (number) {
        if (number <= 30) {
            return Math.floor(number);
        } else {
            return 30;
        }
    }
});

app.filter('jm', function () {
    return function (price, max) {
        for (var i = 0; i <= max / 5; i++) {
            if (i * 100 == price) {
                return i * 5;
            }
            if (i * 100 > price) {
                return (i - 1) * 5;
            }
            if (i * 100 < price && i * 5 >= max) {
                return max;
            }
        }
    }
});

app.filter('feeCoupon', function () {
    return function (price, max) {
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
});

app.filter('MathFloor', function () {
    return function (number) {
        return Math.floor(number);
    }
});

app.filter('flowSalesPrice', function () {
    return function (data) {
        var price = data[0].salesPrice;
        $.each(data, function (i, k) {
            if (k.salesPrice < price) {
                price = k.salesPrice;
            }
        });
        return price;
    }
});

app.controller('appController', ['$scope', '$location', '$cookieStore', '$filter', 'MarketSvc', 'CouponSvc', function ($scope, $location, $cookieStore, $filter, MarketSvc, CouponSvc) {
    $scope.$root.pageTitle = '翼分期';

    $scope.isFeeShow = true;

    $("#banner").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        autoPlay: 3000
    });

    if (getUrlParam('gh')) {
        $scope.gh = getUrlParam('gh');
    } else {
        $scope.gh = "";
    }


    if (getUrlParam('activity')) {
        $scope.activity = getUrlParam('activity');
    } else {
        $scope.activity = "";
    }

    if (getUrlParam('referrerId')) {
        $scope.referrerId = getUrlParam('referrerId');
    } else {
        $scope.referrerId = "";
    }

    if (getUrlParam('token') && getUrlParam('uid')) {
        $scope.showTips = true;
        $scope.gh = "etc_a_yypdf_01";
        if (!(window.location.search.indexOf('gh') !== -1)) {
            $scope.cookie_gh = $scope.gh;
            $cookieStore.put('cookie_gh', $scope.cookie_gh);
        }
    }

    $scope.category = "yfqmall_flowBag_A";
    writebdLog($scope.category, "_Load", "渠道号", $scope.gh);

    if ($cookieStore.get('rechargeMobile')) {
        $scope.mobile = $cookieStore.get('rechargeMobile');
    }

    $scope.bodyClass = 'bodyc';

    $scope.productType = 'flow';

    $scope.setProductType = function (type) {
        $scope.productType = type;
        $scope.regionProduct = null;
        writebdLog($scope.category, "_" + $scope.productType, "渠道号", $scope.gh);
    };


    //只有输入手机号码才记录到闭环
    $scope.inputMobile = function (mobile) {
        if (mobile == undefined || mobile == "" || mobile.length <= 10) return;
        writebdLog($scope.category, "_InputMobile" + $scope.productType, "渠道号", $scope.gh);//手机号码
    };

    $scope.selectedFlowProd = function (checked, product) {
        $scope.productType = 'flow';
        if (!checked) {
            //$scope.$root.appDialog.open('系统提示', '请输入您的手机号码');
            return false;
        }
        $scope.flowCoupons = "";
        $scope.flowProduct = product;

        $scope.flowCouponLength = 0;
        if (product.productName.indexOf('M') !== -1) {
            product.flowRate = (product.productName).substring(0, (product.productName).length - 1);
        }

        if (product.productName.indexOf('G') !== -1) {
            product.flowRate = (product.productName).substring(0, (product.productName).length - 1) + '000';
        }

        if (product.flowRate >= 100 && $scope.couponList.length >= 1) {
            $scope.flowCoupons = $scope.couponList[0].couponNo;
            $scope.flowCouponLength = 1;
        }

        if (product.flowRate >= 500 && $scope.couponList.length >= 2) {
            $scope.flowCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
            $scope.flowCouponLength = 2;
        }

        $scope.regionFlowProduct = product.regionProducts[0];
        writebdLog($scope.category, "_SelectPackage" + $scope.productType + product.sortNo + 'M', "渠道号", $scope.gh);
    };

    $scope.selectedFeeProd = function (checked, product) {
        $scope.productType = 'fee';
        if (!checked) {
            //$scope.$root.appDialog.open('系统提示', '请输入您的手机号码');
            return false;
        }
        $scope.feeCoupons = "";
        $scope.feeProduct = product;

        $scope.feeCouponLength = 0;

        if (product.salesPrice >= 50 && $scope.couponList.length >= 1) {
            $scope.feeCoupons = $scope.couponList[0].couponNo;
            $scope.feeCouponLength = 1;
        }

        if (product.salesPrice >= 100 && $scope.couponList.length >= 2) {
            $scope.feeCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
            $scope.feeCouponLength = 2;
        }

        $scope.regionFeeProduct = product.regionProducts[0];

        writebdLog($scope.category, "_SelectPackage" + $scope.productType + product.sortNo + 'M', "渠道号", $scope.gh);
    };

    $scope.getFlowMore = function (checked) {
        if (!checked) {
            return false;
        }
        $scope.flowLimitTo = 100;
        $scope.feeLimitTo = 4;
    };

    $scope.getFeeMore = function (checked) {
        if (!checked) {
            return false;
        }
        $scope.feeLimitTo = 100;
        $scope.flowLimitTo = 4;
    };

    $scope.buyFlowProd = function (product, event) {
        $scope.regionFlowProduct = product;
    };

    $scope.buyFeeProd = function (product, event) {
        $scope.regionFeeProduct = product;
    };
    $scope.pay = function (product, regionProduct, coupons) {
        if (regionProduct) {
            //mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, successUrl, channelUrl, couponNo, referrerId
            //console.log($scope.gh);
            MarketSvc.pay($scope.mobile, product.productId, regionProduct.productFlowPriceId, $scope.flowList.area_operator, 'recharge', $scope.gh, encodeURIComponent('http://mall.yfq.cn/payState/A/flow?returnUrl=' + encodeURIComponent(window.location.href)), encodeURIComponent(window.location.href), coupons, $scope.referrerId, $scope.category + $scope.productType).then(function success(data) {
                if (data.result) {
                    window.location.href = data.payUrl;
                    writebdLog($scope.category, "_BuyNow" + $scope.productType, "渠道号", $scope.gh);
                } else {
                    console.log(data.msg);
                }
            });
        } else {
            console.log("请选择套餐");
        }

    };

    $scope.$watch('mobile', function (n, o, $scope) {

        $scope.flowProduct = null;
        $scope.feeProduct = null;
        $scope.regionProducts = null;
        $scope.regionFlowProduct = null;
        $scope.regionFeeProduct = null;
        /*$scope.flowList = null;
        $scope.feeList = null;*/
        $scope.couponList = null;
        $scope.flowLimitTo = 4;
        $scope.feeLimitTo = 4;
        $scope.flowCouponLength = null;
        $scope.feeCouponLength = null;
        if (n === undefined || n === '') {
            $scope.flowList = {
                "area": "广东",
                "codeMsg": "查询成功",
                "area_operator": "广东移动",
                "data": [
                    {
                        "productId": 10000091120342,
                        "productName": "10M",
                        "regionProducts": [
                            {
                                "costPrice": 3,
                                "describes": "",
                                "productFlowPriceId": 2527,
                                "recommend": 0,
                                "regionName": "全国",
                                "salesPrice": 2.94
                            }
                        ],
                        "salesPrice": 3,
                        "sortNo": 10
                    },
                    {
                        "productId": 10000091120342,
                        "productName": "30M",
                        "regionProducts": [
                            {
                                "costPrice": 5,
                                "describes": "",
                                "productFlowPriceId": 2528,
                                "recommend": 0,
                                "regionName": "全国",
                                "salesPrice": 4.9
                            }
                        ],
                        "salesPrice": 5,
                        "sortNo": 30
                    }, {
                        "productId": 10000091120342,
                        "productName": "70M",
                        "regionProducts": [
                            {
                                "costPrice": 10,
                                "describes": "",
                                "productFlowPriceId": 2529,
                                "recommend": 0,
                                "regionName": "全国",
                                "salesPrice": 9.8
                            }
                        ],
                        "salesPrice": 10,
                        "sortNo": 70
                    }, {
                        "productId": 10000091120342,
                        "productName": "100M",
                        "regionProducts": [
                            {
                                "costPrice": 10,
                                "describes": "",
                                "productFlowPriceId": 2530,
                                "recommend": 0,
                                "regionName": "全国",
                                "salesPrice": 9.8
                            }
                        ],
                        "salesPrice": 10,
                        "sortNo": 100
                    }
                ],
                "code": "0",
                "operator": "移动"
            };

            $scope.feeList = {
                "area": "广东",
                "codeMsg": "查询成功",
                "area_operator": "广东移动",
                "data": [{
                    "productId": 10000092870385,
                    "productName": "30元",
                    "regionProducts": [
                        {
                            "costPrice": 30,
                            "describes": "",
                            "productFlowPriceId": 2682,
                            "recommend": 0,
                            "regionName": "省内",
                            "salesPrice": 30
                        }
                    ],
                    "salesPrice": 30,
                    "sortNo": 30
                }, {
                    "productId": 10000092870385,
                    "productName": "50元",
                    "regionProducts": [
                        {
                            "costPrice": 50,
                            "describes": "",
                            "productFlowPriceId": 2683,
                            "recommend": 0,
                            "regionName": "省内",
                            "salesPrice": 50
                        }
                    ],
                    "salesPrice": 50,
                    "sortNo": 50
                }, {
                    "productId": 10000092870385,
                    "productName": "100元",
                    "regionProducts": [
                        {
                            "costPrice": 100,
                            "describes": "",
                            "productFlowPriceId": 2684,
                            "recommend": 0,
                            "regionName": "省内",
                            "salesPrice": 100
                        }
                    ],
                    "salesPrice": 100,
                    "sortNo": 100
                }, {
                    "productId": 10000092870385,
                    "productName": "200元",
                    "regionProducts": [
                        {
                            "costPrice": 200,
                            "describes": "",
                            "productFlowPriceId": 2685,
                            "recommend": 0,
                            "regionName": "省内",
                            "salesPrice": 200
                        }
                    ],
                    "salesPrice": 200,
                    "sortNo": 200
                }
                ],
                "code": "0",
                "operator": "移动"
            };
        }
        if (n !== undefined) {

            $cookieStore.put('rechargeMobile', n);
            CouponSvc.getCouponList(n).then(function success(data) {
                $scope.couponList = $filter('filter')(data.couponList, {isUsed: 0, isOverdue: 0, type: 'DK'});

                MarketSvc.getFlows(n).then(function success(data) {
                    $scope.flowList = data;
                });
                MarketSvc.getFees(n).then(function success(data) {
                    $scope.feeList = data;
                });
            });
        }
    });
}]);
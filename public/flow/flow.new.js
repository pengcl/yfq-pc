'use strict';

function stopPropagation(e){

    e=window.event||e;

    if(document.all){  //只有ie识别

        e.cancelBubble=true;

    }else{

        e.stopPropagation();

    }

}

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
        var url = "http://m.yfq.cn/record/writeLog.html?" + info + "&s=wap";
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
        var url = "http://m.yfq.cn/record/intentionLog.html";
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

function addFavorite() {
    if (document.all) {
        try {
            window.external.addFavorite(window.location.href, document.title);
        } catch (e) {
            alert("你的浏览器版本不支持快捷收藏，请使用Ctrl+D进行添加");
        }

    } else {
        alert("你的浏览器版本不支持快捷收藏，请使用Ctrl+D进行添加");
    }
}

$(document).ready(function () {
    $(document).on('mouseover', "#header-qrcode", function () {
        $("#qrcodeImg").show();
    });

    $(document).on('mouseout', "#header-qrcode", function () {
        $("#qrcodeImg").hide();
    });

    $("#telcom").mouseover(function () {
        $(this).attr("src", "http://www.yfq.cn/templates/default/pages/active/fanghao/images/telcom_big.jpg");
    });
    $("#telcom").mouseout(function () {
        $(this).attr("src", "http://www.yfq.cn/templates/default/pages/active/fanghao/images/telcom.jpg");
    });
});

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
        $http.jsonp(cfApi.apiHost + '/product/findProductFlows.ht?mobile=' + mobile + '&type=1&platform=pc&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getFees = function (mobile) {
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + '/product/findProductFlows.ht?mobile=' + mobile + '&type=2&platform=pc&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.pay = function (mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, successUrl, channelUrl, couponNo, referrerId, category) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + '/order/submitFlowOrder.ht?mobile=' + mobile + '&productId=' + productId + '&productFlowPriceId=' + productFlowPriceId + '&carrier=' + carrier + '&activityTag=' + activityTag + '&channelCode=' + channelCode + '&successUrl=' + successUrl + '&channelUrl=' + channelUrl + '&couponNo=' + couponNo + '&referrerId=' + referrerId + '&category=' + category + '&callback=JSON_CALLBACK').success(function (data) {
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
        $http.jsonp(cfApi.apiHost + '/product/getCouponList.ht?recieverMobile=' + mobile + '&callback=JSON_CALLBACK').success(function (data) {
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

app.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
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

app.filter('phoneNumber', function () {
    return function (number) {
        if (number) {
            var value = number;
            value = value.replace(/\s*/g, "");
            var result = [];
            for (var i = 0; i < value.length; i++) {
                if (i == 3 || i == 7) {
                    result.push(" " + value.charAt(i));
                }
                else {
                    result.push(value.charAt(i));
                }
            }
            return result.join("");
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

app.controller('appController', ['$scope', '$q', '$location', '$cookieStore', '$filter', '$timeout', 'MarketSvc', 'CouponSvc', function ($scope, $q, $location, $cookieStore, $filter, $timeout, MarketSvc, CouponSvc) {
    $scope.$root.pageTitle = '翼分期';

    $(".mobile").focus();

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
        $scope.mobileView = $cookieStore.get('rechargeMobile');
    }

    $scope.bodyClass = 'bodyc';

    $scope.productType = 'flow';

    $scope.warningShow = false;

    $scope.setProductType = function (type) {
        $scope.productType = type;
        $scope.regionProduct = null;
        writebdLog($scope.category, "_" + $scope.productType, "渠道号", $scope.gh);
    };


    //只有输入手机号码才记录到闭环
    $scope.inputMobile = function (mobile) {
        /*if(!$scope.mobileValid && !$scope.rechargeForm.mobileView.$pristine){
            $scope.warningShow = true;
        }else {
            $scope.warningShow = false;
        }*/
        if (mobile == undefined || mobile == "" || mobile.length <= 10) return;
        writebdLog($scope.category, "_InputMobile" + $scope.productType, "渠道号", $scope.gh);//手机号码
    };

    $scope.writeClick = function (value) {
        writebdLog($scope.category, "_" + value, "渠道号", $scope.gh);//记录点击事件
    };

    $scope.isMore = true;

    $scope.selectedFlowProd = function (checked, product, isMore, e) {
        //$scope.productType = 'flow';
        if (!checked) {
            //$scope.$root.appDialog.open('系统提示', '请输入您的手机号码');
            return false;
        }

        $scope.isMore = isMore;

        $scope.flowMore = false;
        $scope.flowCoupons = "";
        $scope.flowProduct = product;

        $scope.flowCouponLength = 0;

        if (product.productName.indexOf('M') !== -1) {
            product.flowRate = (product.productName).substring(0, (product.productName).length - 1);
        }

        if (product.productName.indexOf('G') !== -1) {
            product.flowRate = (product.productName).substring(0, (product.productName).length - 1) + '000';
        }

        if ($scope.couponList) {
            if (product.flowRate >= 100 && $scope.couponList.length >= 1) {
                $scope.flowCoupons = $scope.couponList[0].couponNo;
                $scope.flowCouponLength = 1;
            }

            if (product.flowRate >= 500 && $scope.couponList.length >= 2) {
                $scope.flowCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
                $scope.flowCouponLength = 2;
            }
        } else {
            $scope.flowCoupons = "";
        }

        $scope.regionFlowProduct = product.regionProducts[0];
        if(e)
        {
        	writebdLog($scope.category, "_SelectPackage" + $scope.productType + product.sortNo + 'M', "渠道号", $scope.gh);
        }
    };

    $scope.selectedFeeProd = function (checked, product, isMore, e) {
        //$scope.productType = 'fee';
        if (!checked) {
            //$scope.$root.appDialog.open('系统提示', '请输入您的手机号码');
            return false;
        }
        $scope.feeCoupons = "";
        $scope.feeProduct = product;

        $scope.feeCouponLength = 0;

        if ($scope.couponList) {
            if (product.salesPrice >= 50 && $scope.couponList.length >= 1) {
                $scope.feeCoupons = $scope.couponList[0].couponNo;
                $scope.feeCouponLength = 1;
            }

            if (product.salesPrice >= 100 && $scope.couponList.length >= 2) {
                $scope.feeCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
                $scope.feeCouponLength = 2;
            }
        } else {
            $scope.feeCoupons = "";
        }

        $scope.regionFeeProduct = product.regionProducts[0];

        if(e)
        {
        	writebdLog($scope.category, "_SelectPackage" + $scope.productType + product.sortNo + 'M', "渠道号", $scope.gh);
        }
    };

    $scope.getFlowMore = function (e) {
        stopPropagation(e);
        $scope.flowMore = !$scope.flowMore;
    };

    $("#container").click(function () {
        $scope.flowMore = false;
        $scope.$apply();
    });

    $scope.getFeeMore = function () {
        $scope.feeMore = true;
    };

    $scope.buyFlowProd = function (product, event) {
        $scope.regionFlowProduct = product;
    };

    $scope.buyFeeProd = function (product, event) {
        $scope.regionFeeProduct = product;
    };

    $scope.pay = function (mobileValid, product, regionProduct, coupons) {
        if (!mobileValid) {
            return false;
        }
        if (regionProduct) {
            MarketSvc.pay($scope.mobile, product.productId, regionProduct.productFlowPriceId, $scope.flowList.area_operator, 'recharge', $scope.gh, encodeURIComponent(cfApi.webHost + '/payState/A/flow?returnUrl=' + encodeURIComponent(window.location.href)), encodeURIComponent(window.location.href), coupons, $scope.referrerId, $scope.category + $scope.productType).then(function success(data) {
                if (data.result) {
                    window.location.href = data.payUrl;
                    writebdLog($scope.category, "_BuyNow" + $scope.productType, "渠道号", $scope.gh);
                } else {
                    $scope.alert = {
                        title: '系统提示',
                        content: data.msg
                    };
                    $('#appMsg').modal('show');
                }
            });
        } else {
            console.log("请选择套餐");
        }

    };

    $scope.showCouponTips = function (type) {

        var content = "";

        if (type === 'flow') {
            content = '<p>1、充值流量包即可获得支付金额同等金额的优惠券（按实际支付金额向下取整，单笔最多获得30元优惠券）。</p>' +
                '<p>2、优惠券可用于下次充值，适用于话费及流量，请在有效期内使用。</p>';
        }

        if (type === 'fee') {
            content = '<p>1、充值话费面值50元或以上可获得5元优惠券，面值100元或以上可获得10元优惠券，多充多送（单笔最多获得30元优惠券）。</p>' +
                '<p>2、优惠券可用于下次充值，适用于话费及流量，请在有效期内使用。</p>';
        }

        $scope.alert = {
            title: '优惠券使用说明',
            content: content
        };
        $('#appMsg').modal('show');

        writebdLog($scope.category, "_CouponTips" + type, "渠道号", $scope.gh); //记录查看优惠券信息行为
    };

    $scope.$watch('mobileView', function (n, o, $scope) {
        if (n) {
            var value = n;
            value = value.replace(/\s*/g, "");
            var result = [];
            for (var i = 0; i < value.length; i++) {
                if (i == 3 || i == 7) {
                    result.push(" " + value.charAt(i));
                }
                else {
                    result.push(value.charAt(i));
                }
            }
            $scope.mobileView = result.join("");
            $scope.mobile = value;
            $cookieStore.put('rechargeMobile', $scope.mobileView);
        } else {
            $scope.mobile = "";
        }
    });

    var rebuildData = function (data, compareData) {//data 待对比对象 compareData 对比对象
        if (compareData) {//如果 compareData === true 进行对比
            $.each(data.data, function (i, k) {
                k.stock = false;
                $.each(compareData.data, function (item, key) {
                    if (k.productName === key.productName) {
                        k.regionProducts = key.regionProducts;
                        k.stock = true;
                    }
                });
            });
        } else {//如果 compareData === false 不进行对比
            $.each(data.data, function (i, k) {
                k.stock = true;
            });
        }

        data.area_operator = compareData.area_operator;

        return data;
    };

    var tempFlowList, tempFeeList;

    var getDefault = function (data) {
        var index = 0;
        $.each(data, function (i, k) {
            var prodName = k.productName.substr(0, k.productName.length - 1);
            if (k.stock && prodName >= 100) {
                index = i;
                return false;
            }
        });

        return index;
    };

    MarketSvc.getFlows('').then(function success(data) {
        tempFlowList = data;
    }).then(function success() {
        MarketSvc.getFees('').then(function success(data) {
            tempFeeList = data;
        }).then(function success() {
            $scope.$watch('mobileValid', function (n, o, $scope) {
                //console.log(n);
                if (n) {
                    CouponSvc.getCouponList($scope.mobile).then(function success(data) {

                        $scope.couponList = $filter('filter')(data.couponList, {isUsed: 0, isOverdue: 0, type: 'DK'});

                        MarketSvc.getFlows($scope.mobile).then(function success(data) {
                            if(data.code == 0){
                                $scope.flowList = rebuildData(tempFlowList, data);

                                var _flowIndex = getDefault($scope.flowList.data);

                                if (_flowIndex > 6) {
                                    $scope.selectedFlowProd(true, $scope.flowList.data[_flowIndex], false);
                                } else {
                                    $scope.selectedFlowProd(true, $scope.flowList.data[_flowIndex], true);
                                }
                            }else {
                                $scope.flowList = rebuildData(tempFlowList, false);
                                $scope.selectedFlowProd(true, $scope.flowList.data[0], true);
                            }
                        });
                        MarketSvc.getFees($scope.mobile).then(function success(data) {
                            if(data.code == 0){
                                $scope.feeList = rebuildData(tempFeeList, data);

                                var _feeIndex = getDefault($scope.feeList.data);

                                if (_feeIndex > 6) {
                                    $scope.selectedFeeProd(true, $scope.feeList.data[_feeIndex], false);
                                } else {
                                    $scope.selectedFeeProd(true, $scope.feeList.data[_feeIndex], true);
                                }
                            }else {
                                $scope.feeList = rebuildData(tempFeeList, false);
                                $scope.selectedFeeProd(true, $scope.feeList.data[0], true);
                            }
                        });

                    });
                } else {
                    $scope.flowList = rebuildData(tempFlowList, false);
                    $scope.selectedFlowProd(true, $scope.flowList.data[0], true);
                    $scope.feeList = rebuildData(tempFeeList, false);
                    $scope.selectedFeeProd(true, $scope.feeList.data[0], true);
                }
            });
        });
    });

    $scope.getComments = function (event) {
        event.preventDefault();
        getMeiqia();
        //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
        _MEIQIA('showPanel', {
            groupToken: '8ba3446475970c6af51f22c9a7bb4fb4'
        });

        writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
    };

    $scope.$watch('mobile', function (n, o, $scope) {

        $scope.couponList = 0;
        $scope.flowCouponLength = 0;
        $scope.feeCouponLength = 0;

        /*$scope.flowProduct = null;
        $scope.feeProduct = null;
        $scope.regionProducts = null;
        $scope.regionFlowProduct = null;
        $scope.regionFeeProduct = null;*/
        /*$scope.flowList = null;
        $scope.feeList = null;*/
        /*$scope.couponList = null;
        $scope.flowLimitTo = 4;
        $scope.feeLimitTo = 4;
        $scope.flowCouponLength = null;
        $scope.feeCouponLength = null;*/

        if (n !== undefined && n.length == 11) {
            $scope.mobileValid = $scope.mobile;
        } else {
            $scope.mobileValid = false;
        }
    });
}]);
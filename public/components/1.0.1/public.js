
'use strict';

/* App Module */
var app = angular.module('app', ['ngRoute', 'appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({
            redirectTo: '/phone/A/index'
        });
        $locationProvider.html5Mode(true);
    }]).config(['$sceProvider', function ($sceProvider) {
    //For sport ie7
    $sceProvider.enabled(false);
}]).controller('appController', ['$scope', '$location', function ($scope, $location) {
}]);
'use strict';

//全局统计
var systemName = "yfqmall";

var apiBaseUrl = "http://m.yfq.cn";

//手机号处理 开始

//手机号处理 结束

//获取对象或数组中选中对象的index
function getIndex(jsonArray, keyName, value) {
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i][keyName] == value) {
            return i;
        }
    }
}

function GetDateStr(today, AddDayCount) {
    var dd = today;
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
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
}

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
        info = info.replace("?","&");//将链接里的？字符转换为&，可以让后台获取
        var url = "http://m.gd189fq.com/record/writeLog.html?" + info + "&s=wap";
        $.ajax({
            type: "get",
            url: url,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "callback",
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
}

var op = new operation();

function writebdLog(category, action, opt_label, opt_value) {//category项目，action统计项目，渠道label，渠道号
    op.record(encodeURI(category + action));
}

//统计 结束

//美恰在线客服
function getMeiqia() {
    (function(m, ei, q, i, a, j, s) {
        m[i] = m[i] || function() {
            (m[i].a = m[i].a || []).push(arguments)
        };
        j = ei.createElement(q),
            s = ei.getElementsByTagName(q)[0];
        j.async = true;
        j.charset = 'UTF-8';
        j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
        s.parentNode.insertBefore(j, s);
    })(window, document, 'script', '_MEIQIA');
    _MEIQIA('entId', 27864);
    _MEIQIA('fallback', 1);
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

//
var jsonData = new Array();
var dt = (new Date()).getTime();

//
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this && this[from] === elt)
                return from;
        }
        return -1;
    };
}

function getNumArr(orderNumber) {
    var jdata = findJsonData(orderNumber);
    var numArr = getPosNum(orderNumber, jdata);
    //console.log(numArr);
    //alert(numArr);
    //alert(numArr[1]);
    //alert(numArr[2]);
    return numArr;
}

function findJsonData(orderNumber) {
    if (orderNumber == null) {
        return jsonData;
    }
    var result = [];
    var len = jsonData.length;
    var t = 0;
    for (var i = 0; i < len; i++) {
        var no = jsonData[i].n;
        if (no.indexOf(orderNumber) != -1) {
            result[t] = no;
            t = t + 1;
        }
    }
    return result;
}

function getPosNum(orderNumber, data) {
    if (orderNumber == null || data == null) {
        return null;
    }

    var pos = orderNumber.length;
    var posdata = new Array();

    var len = data.length;
    for (var i = 0; i < len; i++) {
        var no = data[i];
        var c = no.substring(pos, pos + 1);
        if (posdata != null && posdata.indexOf(c) == -1) {
            posdata.push(c);
        }
    }
    return posdata;
}

function getPosNumArr(len, data) {
    var data = [];
    var datalen = jsonData.length;
    for (var i = 0; i < datalen; i++) {
        var no = jsonData[i].n;
        var d = no.substr(len - 1, 1);
        if (data.indexOf(d) == -1) {
            data.push(d);
        }
    }
    data.sort(function (n1, n2) {
        return n1 - n2;
    });
    return data;
}

var curr = "";

function maskHeight() {
    $(".mask").height($(document).outerHeight());
}

function maskShow(e) {
    $(e).show();
}

function tooltipShow(e) {
    maskHeight();
    $(e).show();
}

function lodingShow() {
    $("#idNumDiv").find(".loding").removeClass("hidden");
    $(".numloded").addClass("hidden");
}

function lodingHidden() {
    $("#idNumDiv").find(".loding").addClass("hidden");
    $(".numloded").removeClass("hidden");
}

function maskHeight() {
    $(".mask").height($(document).outerHeight());
}

function maskShow(e) {
    $(e).show();
}

function tooltipShow(e) {
    maskHeight();
    $(e).show();
}

function lodingShow() {
    $("#idNumDiv").find(".loding").removeClass("hidden");
    $(".numloded").addClass("hidden");
}

function lodingHidden() {
    $("#idNumDiv").find(".loding").addClass("hidden");
    $(".numloded").removeClass("hidden");
}

function findNumbers() {
    var dt = (new Date()).getTime();
    lodingShow();
    $.ajax({
        dataType: "jsonp",
        type: "get",
        contentType: "application/json; charset=utf-8",
        url: "http://m.gd189fq.com/wap/taokafanghaoNew/fetchNumber.html",
        jsonp: "callback",
        jsonpCallback: "getNumberList",
        success: function (json) {
            $.each(eval(json), function (i, k) {
                if (!k.t) {
                    jsonData.push(k);
                }
                //console.log(jsonData);
            });
            //console.log(jsonData);
        },
        error: function (e) {
            alert(e);
        }
    });
}
findNumbers();

//

$(document).ready(function () {
    $("#header-qrcode").mouseover(function () {
        $("#qrcodeImg").show();
    });
    $("#header-qrcode").mouseout(function () {
        $("#qrcodeImg").hide();
    });
    $("#telcom").mouseover(function () {
        $(this).attr("src", "http://www.yfq.cn/templates/default/pages/active/fanghao/images/telcom_big.jpg");
    });
    $("#telcom").mouseout(function () {
        $(this).attr("src", "http://www.yfq.cn/templates/default/pages/active/fanghao/images/telcom.jpg");
    });
});

function toTop() {
    $("html,body").animate({
        scrollTop: $("body").offset().top
    }, 500, 'swing');
}

(function () {
    $("#container").on("click", ".cf-tab-nav ul li", function (e) {
        e.preventDefault();
        var navItem = $(".cf-tab-nav ul li");
        var contentItem = $(".cf-content .tab-content");
        var index = $(this).index();
        navItem.removeClass("active");
        navItem.eq(index).addClass("active");
        contentItem.hide();
        contentItem.eq(index).show();
    });
})();

function checkSameNumber(number1, number2) {
    if (number1 === number2) {
        return false;
    }
    return true;
}
var a = 0;
$(window).scroll(function () {

    if (a == 0) {
        $(".footer-ft").show();
    }
    a++;
});
'use strict';

/* Filters */
var appFilters = angular.module('appFilters', []);

appFilters.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

appFilters.filter('MB', function () {
    return function (kb) {
        var m = 1024,
            //sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(kb) / Math.log(m));
        return (kb / m);
    };
});

appFilters.filter('GB', function () {
    return function (kb) {
        var m = 1024,
            g = 1024;
        //sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        //i = Math.floor(Math.log(kb) / Math.log(m));
        return ((kb / m) / g);
    };
});

appFilters.filter('replaceS', function () {
    return function (input, key) {
        if (key != undefined || key != null || key != "") {
            return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
        } else {

        }
    };
});

appFilters.filter('replaceInput', function () {
    return function (input, key) {
        if (key != undefined && key != "") {
            return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
        } else {
            return input;
        }
    };
});

appFilters.filter('onlyNumber', function () {
    return function (input) {
        return input.replace(new RegExp(key, 'g'), '<em>' + key + '</em>');
    };
});

appFilters.filter('formatMoney', function () {
    return function (input, lastindex) {
        if (input != undefined) {
            return input.slice(0, lastindex) + "<sub style='font-size:75%'>" + input.substr(lastindex) + "</sub>";
        }
    };
});

appFilters.filter('formatPhone', function () {
    return function (input) {
        var lastVar = input.slice(0, -4) + " " + input.substr(-4);
        return lastVar.slice(0, 3) + " " + lastVar.substr(3);
        //return lastVar;
    };
});

appFilters.filter('doubleName', function () {
    return function (input, key) {
        input = input.split(" + ");
        if (key == 1) {
            return input[1];
        } else {
            return input[0];
        }
    };
});

appFilters.filter('range', function () {
    return function (data, start, end) {
        if (angular.isArray(data) && angular.isNumber(start) && angular.isNumber(end)) {
            if (data.length < start) {
                return data;
            }
            else {
                return data.slice(start, end);
            }
        }
    }
});

appFilters.filter('jm', function () {
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

appFilters.filter('mx', function () {
    return function (price) {

        if (price > 7680) {
            return 768;
        } else {
            return Math.round(price * 0.1);
        }
    }
});

appFilters.filter('numberUp', function () {
    return function (price) {

        return Math.ceil(price);
    }
});

appFilters.filter('mp', function () {
    return function (price) {

        if (price == 0) {
            return "&mp=0"
        } else {
            return ""
        }
    }
});

appFilters.filter('other', function () {
    return function (phones) {
        var otherPhones = [];
        if (phones != undefined) {
            $.each(phones, function (i, k) {
                if (k.brandName != "iPhone" && k.brandName != "华为" && k.brandName != "OPPO" && k.brandName != "vivo" && k.brandName != "小米") {
                    otherPhones.push(k);
                }
            });
            return otherPhones;
        }
    }
});

appFilters.filter('priceQuery', function () {
    return function (phones, priceArea) {
        var _phones = [];
        if (phones != undefined) {
            $.each(phones, function (i, k) {
                if (k.salePrice >= priceArea[0] && k.salePrice < priceArea[1]) {
                    _phones.push(k);
                }
            });
        }
        return _phones;
    }
});

appFilters.filter('phoneListFilter', function () {
    return function (phones, brand, spec, price, sellOut) {
        var filterBrand = function (rest) {
            var _phones = [];
            if (brand == 'all') {
                return rest;
            } else if (brand == 'other') {
                $.each(rest, function (i, k) {
                    if (k.brandName != "iPhone" && k.brandName != "华为" && k.brandName != "OPPO" && k.brandName != "vivo" && k.brandName != "小米") {
                        _phones.push(k);
                    }
                });
            } else {
                $.each(rest, function (i, k) {
                    if (brand == k.brandName) {
                        _phones.push(k);
                    }
                });
            }
            return _phones;
        };

        var filterSpec = function (rest) {
            var _phones = [];
            if (spec == 'all') {
                return rest;
            } else if (spec == 'other') {
                $.each(rest, function (i, k) {
                    if (k.flash != 16 && k.flash != 32 && k.flash != 64 && k.flash != 128 && k.flash != 256) {
                        _phones.push(k);
                    }
                });
            } else {
                $.each(rest, function (i, k) {
                    if (spec == k.flash) {
                        _phones.push(k);
                    }
                });
            }
            return _phones;
        };

        var filterPrice = function (rest) {
            var _phones = [];
            if (price == 'all') {
                return rest;
            } else {
                $.each(rest, function (i, k) {
                    if (k.salePrice >= price[0] && k.salePrice < price[1]) {
                        _phones.push(k);
                    }
                });
            }
            return _phones;
        };

        var filterSellOut = function (rest) {
            var _phones = [];
            if (!sellOut) {
                return rest;
            } else {
                $.each(rest, function (i, k) {
                    if (k.ifSellOut > 0) {
                        _phones.push(k);
                    }
                });
            }
            return _phones;
        };

        if (phones != undefined) {
            return filterSellOut(filterPrice(filterSpec(filterBrand(phones))));
        }
    }
});

appFilters.filter('phoneFilter', function () {
    return function (price) {

        return price.substr(0, 4) + "****" + price.substr(8, 11);
    }
});

appFilters.filter('MathFloor',function () {
    return function (number) {
        return Math.floor(number);
    }
});
var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('FlowPackages', ['$resource', function ($resource) {
    return $resource('http://app.gd189fq.com:3099/api/getFlowPackages/:cardType', null, {
        query: {method: 'GET', params: {cardType: '0'}, isArray: true}
    });
}]);

appServices.factory('Phone', ['$resource', '$q', function ($resource, $q) {
    return $resource('/data/phones/:phoneId.json', {}, {
        query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
    });
}]);

appServices.factory("MarketSvc", ['$http', '$q', function ($http, $q) {
    var service = {};
    service.getFlows = function (mobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + '/product/findProductFlows.ht?mobile=' + mobile + "&callback=JSON_CALLBACK").success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.pay = function (mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, successUrl) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + '/order/submitFlowOrder.ht?mobile=' + mobile + '&productId=' + productId + '&productFlowPriceId=' + productFlowPriceId + '&carrier=' + carrier + '&activityTag=' + activityTag + '&channelCode=' + channelCode + '&successUrl=' + successUrl + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);

appServices.factory("AddressSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getProvince = function () {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + "/wap/comm/getRegion.ht?need=province&key=" + new Date() + "&callback=JSON_CALLBACK").success(function (data) {
            var _data = [];
            $.each(eval(data), function (i, k) {
                _data.push(
                    {
                        name: "province",
                        value: k.name
                    }
                );
            });
            return d.resolve(_data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getCity = function (province) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + "/wap/comm/getRegion.ht?need=city&province=" + encodeURI(encodeURI(province)) + "&key=" + new Date() + "&callback=JSON_CALLBACK").success(function (data) {
            var _data = [];
            $.each(eval(data), function (i, k) {
                _data.push(
                    {
                        name: "city",
                        value: k.name
                    }
                );
            });
            return d.resolve(_data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getDistrict = function (province, city) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + "/wap/comm/getRegion.ht?need=district&province=" + encodeURI(encodeURI(province)) + "&city=" + encodeURI(encodeURI(city)) + "&key=" + new Date() + "&callback=JSON_CALLBACK").success(function (data) {
            var _data = [];
            $.each(eval(data), function (i, k) {
                _data.push(
                    {
                        name: "district",
                        value: k.name
                    }
                );
            });
            return d.resolve(_data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);

appServices.factory("OrderSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getCounts = function (receiverMobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + '/product/findOrderStatusCounts.ht?receiverMobile=' + receiverMobile + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrderList = function (receiverMobile, orderStatus) {//获取订单列表 promise对象
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + '/product/searchOrders.ht?receiverMobile=' + receiverMobile + '&orderStatus=' + orderStatus + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrder = function (orderNo) {
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + '/order/getSalesOrder.ht?orderNo=' + orderNo + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getLogistics = function (orderNo) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp(cfApi.apiHost + '/product/findLogistics.ht?orderNo=' + orderNo + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
(function(){var a,b,c,d,e,f,g,h,i=[].slice,j={}.hasOwnProperty,k=function(a,b){function c(){this.constructor=a}for(var d in b)j.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};g=function(){},b=function(){function a(){}return a.prototype.addEventListener=a.prototype.on,a.prototype.on=function(a,b){return this._callbacks=this._callbacks||{},this._callbacks[a]||(this._callbacks[a]=[]),this._callbacks[a].push(b),this},a.prototype.emit=function(){var a,b,c,d,e,f;if(d=arguments[0],a=2<=arguments.length?i.call(arguments,1):[],this._callbacks=this._callbacks||{},c=this._callbacks[d])for(e=0,f=c.length;f>e;e++)b=c[e],b.apply(this,a);return this},a.prototype.removeListener=a.prototype.off,a.prototype.removeAllListeners=a.prototype.off,a.prototype.removeEventListener=a.prototype.off,a.prototype.off=function(a,b){var c,d,e,f,g;if(!this._callbacks||0===arguments.length)return this._callbacks={},this;if(d=this._callbacks[a],!d)return this;if(1===arguments.length)return delete this._callbacks[a],this;for(e=f=0,g=d.length;g>f;e=++f)if(c=d[e],c===b){d.splice(e,1);break}return this},a}(),a=function(a){function c(a,b){var e,f,g;if(this.element=a,this.version=c.version,this.defaultOptions.previewTemplate=this.defaultOptions.previewTemplate.replace(/\n*/g,""),this.clickableElements=[],this.listeners=[],this.files=[],"string"==typeof this.element&&(this.element=document.querySelector(this.element)),!this.element||null==this.element.nodeType)throw new Error("Invalid dropzone element.");if(this.element.dropzone)throw new Error("Dropzone already attached.");if(c.instances.push(this),this.element.dropzone=this,e=null!=(g=c.optionsForElement(this.element))?g:{},this.options=d({},this.defaultOptions,e,null!=b?b:{}),this.options.forceFallback||!c.isBrowserSupported())return this.options.fallback.call(this);if(null==this.options.url&&(this.options.url=this.element.getAttribute("action")),!this.options.url)throw new Error("No URL provided.");if(this.options.acceptedFiles&&this.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");this.options.acceptedMimeTypes&&(this.options.acceptedFiles=this.options.acceptedMimeTypes,delete this.options.acceptedMimeTypes),this.options.method=this.options.method.toUpperCase(),(f=this.getExistingFallback())&&f.parentNode&&f.parentNode.removeChild(f),this.options.previewsContainer!==!1&&(this.previewsContainer=this.options.previewsContainer?c.getElement(this.options.previewsContainer,"previewsContainer"):this.element),this.options.clickable&&(this.clickableElements=this.options.clickable===!0?[this.element]:c.getElements(this.options.clickable,"clickable")),this.init()}var d,e;return k(c,a),c.prototype.Emitter=b,c.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","addedfiles","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached","queuecomplete"],c.prototype.defaultOptions={url:null,method:"post",withCredentials:!1,parallelUploads:2,uploadMultiple:!1,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:120,thumbnailHeight:120,filesizeBase:1e3,maxFiles:null,params:{},clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,autoQueue:!0,addRemoveLinks:!1,previewsContainer:null,hiddenInputContainer:"body",capture:null,renameFilename:null,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",accept:function(a,b){return b()},init:function(){return g},forceFallback:!1,fallback:function(){var a,b,d,e,f,g;for(this.element.className=""+this.element.className+" dz-browser-not-supported",g=this.element.getElementsByTagName("div"),e=0,f=g.length;f>e;e++)a=g[e],/(^| )dz-message($| )/.test(a.className)&&(b=a,a.className="dz-message");return b||(b=c.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(b)),d=b.getElementsByTagName("span")[0],d&&(null!=d.textContent?d.textContent=this.options.dictFallbackMessage:null!=d.innerText&&(d.innerText=this.options.dictFallbackMessage)),this.element.appendChild(this.getFallbackForm())},resize:function(a){var b,c,d;return b={srcX:0,srcY:0,srcWidth:a.width,srcHeight:a.height},c=a.width/a.height,b.optWidth=this.options.thumbnailWidth,b.optHeight=this.options.thumbnailHeight,null==b.optWidth&&null==b.optHeight?(b.optWidth=b.srcWidth,b.optHeight=b.srcHeight):null==b.optWidth?b.optWidth=c*b.optHeight:null==b.optHeight&&(b.optHeight=1/c*b.optWidth),d=b.optWidth/b.optHeight,a.height<b.optHeight||a.width<b.optWidth?(b.trgHeight=b.srcHeight,b.trgWidth=b.srcWidth):c>d?(b.srcHeight=a.height,b.srcWidth=b.srcHeight*d):(b.srcWidth=a.width,b.srcHeight=b.srcWidth/d),b.srcX=(a.width-b.srcWidth)/2,b.srcY=(a.height-b.srcHeight)/2,b},drop:function(){return this.element.classList.remove("dz-drag-hover")},dragstart:g,dragend:function(){return this.element.classList.remove("dz-drag-hover")},dragenter:function(){return this.element.classList.add("dz-drag-hover")},dragover:function(){return this.element.classList.add("dz-drag-hover")},dragleave:function(){return this.element.classList.remove("dz-drag-hover")},paste:g,reset:function(){return this.element.classList.remove("dz-started")},addedfile:function(a){var b,d,e,f,g,h,i,j,k,l,m,n,o;if(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),this.previewsContainer){for(a.previewElement=c.createElement(this.options.previewTemplate.trim()),a.previewTemplate=a.previewElement,this.previewsContainer.appendChild(a.previewElement),l=a.previewElement.querySelectorAll("[data-dz-name]"),f=0,i=l.length;i>f;f++)b=l[f],b.textContent=this._renameFilename(a.name);for(m=a.previewElement.querySelectorAll("[data-dz-size]"),g=0,j=m.length;j>g;g++)b=m[g],b.innerHTML=this.filesize(a.size);for(this.options.addRemoveLinks&&(a._removeLink=c.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'+this.options.dictRemoveFile+"</a>"),a.previewElement.appendChild(a._removeLink)),d=function(b){return function(d){return d.preventDefault(),d.stopPropagation(),a.status===c.UPLOADING?c.confirm(b.options.dictCancelUploadConfirmation,function(){return b.removeFile(a)}):b.options.dictRemoveFileConfirmation?c.confirm(b.options.dictRemoveFileConfirmation,function(){return b.removeFile(a)}):b.removeFile(a)}}(this),n=a.previewElement.querySelectorAll("[data-dz-remove]"),o=[],h=0,k=n.length;k>h;h++)e=n[h],o.push(e.addEventListener("click",d));return o}},removedfile:function(a){var b;return a.previewElement&&null!=(b=a.previewElement)&&b.parentNode.removeChild(a.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(a,b){var c,d,e,f;if(a.previewElement){for(a.previewElement.classList.remove("dz-file-preview"),f=a.previewElement.querySelectorAll("[data-dz-thumbnail]"),d=0,e=f.length;e>d;d++)c=f[d],c.alt=a.name,c.src=b;return setTimeout(function(){return function(){return a.previewElement.classList.add("dz-image-preview")}}(this),1)}},error:function(a,b){var c,d,e,f,g;if(a.previewElement){for(a.previewElement.classList.add("dz-error"),"String"!=typeof b&&b.error&&(b=b.error),f=a.previewElement.querySelectorAll("[data-dz-errormessage]"),g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.textContent=b);return g}},errormultiple:g,processing:function(a){return a.previewElement&&(a.previewElement.classList.add("dz-processing"),a._removeLink)?a._removeLink.textContent=this.options.dictCancelUpload:void 0},processingmultiple:g,uploadprogress:function(a,b){var c,d,e,f,g;if(a.previewElement){for(f=a.previewElement.querySelectorAll("[data-dz-uploadprogress]"),g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push("PROGRESS"===c.nodeName?c.value=b:c.style.width=""+b+"%");return g}},totaluploadprogress:g,sending:g,sendingmultiple:g,success:function(a){return a.previewElement?a.previewElement.classList.add("dz-success"):void 0},successmultiple:g,canceled:function(a){return this.emit("error",a,"Upload canceled.")},canceledmultiple:g,complete:function(a){return a._removeLink&&(a._removeLink.textContent=this.options.dictRemoveFile),a.previewElement?a.previewElement.classList.add("dz-complete"):void 0},completemultiple:g,maxfilesexceeded:g,maxfilesreached:g,queuecomplete:g,addedfiles:g,previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'},d=function(){var a,b,c,d,e,f,g;for(d=arguments[0],c=2<=arguments.length?i.call(arguments,1):[],f=0,g=c.length;g>f;f++){b=c[f];for(a in b)e=b[a],d[a]=e}return d},c.prototype.getAcceptedFiles=function(){var a,b,c,d,e;for(d=this.files,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.accepted&&e.push(a);return e},c.prototype.getRejectedFiles=function(){var a,b,c,d,e;for(d=this.files,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.accepted||e.push(a);return e},c.prototype.getFilesWithStatus=function(a){var b,c,d,e,f;for(e=this.files,f=[],c=0,d=e.length;d>c;c++)b=e[c],b.status===a&&f.push(b);return f},c.prototype.getQueuedFiles=function(){return this.getFilesWithStatus(c.QUEUED)},c.prototype.getUploadingFiles=function(){return this.getFilesWithStatus(c.UPLOADING)},c.prototype.getAddedFiles=function(){return this.getFilesWithStatus(c.ADDED)},c.prototype.getActiveFiles=function(){var a,b,d,e,f;for(e=this.files,f=[],b=0,d=e.length;d>b;b++)a=e[b],(a.status===c.UPLOADING||a.status===c.QUEUED)&&f.push(a);return f},c.prototype.init=function(){var a,b,d,e,f,g,h;for("form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(c.createElement('<div class="dz-default dz-message"><span>'+this.options.dictDefaultMessage+"</span></div>")),this.clickableElements.length&&(d=function(a){return function(){return a.hiddenFileInput&&a.hiddenFileInput.parentNode.removeChild(a.hiddenFileInput),a.hiddenFileInput=document.createElement("input"),a.hiddenFileInput.setAttribute("type","file"),(null==a.options.maxFiles||a.options.maxFiles>1)&&a.hiddenFileInput.setAttribute("multiple","multiple"),a.hiddenFileInput.className="dz-hidden-input",null!=a.options.acceptedFiles&&a.hiddenFileInput.setAttribute("accept",a.options.acceptedFiles),null!=a.options.capture&&a.hiddenFileInput.setAttribute("capture",a.options.capture),a.hiddenFileInput.style.visibility="hidden",a.hiddenFileInput.style.position="absolute",a.hiddenFileInput.style.top="0",a.hiddenFileInput.style.left="0",a.hiddenFileInput.style.height="0",a.hiddenFileInput.style.width="0",document.querySelector(a.options.hiddenInputContainer).appendChild(a.hiddenFileInput),a.hiddenFileInput.addEventListener("change",function(){var b,c,e,f;if(c=a.hiddenFileInput.files,c.length)for(e=0,f=c.length;f>e;e++)b=c[e],a.addFile(b);return a.emit("addedfiles",c),d()})}}(this))(),this.URL=null!=(g=window.URL)?g:window.webkitURL,h=this.events,e=0,f=h.length;f>e;e++)a=h[e],this.on(a,this.options[a]);return this.on("uploadprogress",function(a){return function(){return a.updateTotalUploadProgress()}}(this)),this.on("removedfile",function(a){return function(){return a.updateTotalUploadProgress()}}(this)),this.on("canceled",function(a){return function(b){return a.emit("complete",b)}}(this)),this.on("complete",function(a){return function(){return 0===a.getAddedFiles().length&&0===a.getUploadingFiles().length&&0===a.getQueuedFiles().length?setTimeout(function(){return a.emit("queuecomplete")},0):void 0}}(this)),b=function(a){return a.stopPropagation(),a.preventDefault?a.preventDefault():a.returnValue=!1},this.listeners=[{element:this.element,events:{dragstart:function(a){return function(b){return a.emit("dragstart",b)}}(this),dragenter:function(a){return function(c){return b(c),a.emit("dragenter",c)}}(this),dragover:function(a){return function(c){var d;try{d=c.dataTransfer.effectAllowed}catch(e){}return c.dataTransfer.dropEffect="move"===d||"linkMove"===d?"move":"copy",b(c),a.emit("dragover",c)}}(this),dragleave:function(a){return function(b){return a.emit("dragleave",b)}}(this),drop:function(a){return function(c){return b(c),a.drop(c)}}(this),dragend:function(a){return function(b){return a.emit("dragend",b)}}(this)}}],this.clickableElements.forEach(function(a){return function(b){return a.listeners.push({element:b,events:{click:function(d){return(b!==a.element||d.target===a.element||c.elementInside(d.target,a.element.querySelector(".dz-message")))&&a.hiddenFileInput.click(),!0}}})}}(this)),this.enable(),this.options.init.call(this)},c.prototype.destroy=function(){var a;return this.disable(),this.removeAllFiles(!0),(null!=(a=this.hiddenFileInput)?a.parentNode:void 0)&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,c.instances.splice(c.instances.indexOf(this),1)},c.prototype.updateTotalUploadProgress=function(){var a,b,c,d,e,f,g,h;if(d=0,c=0,a=this.getActiveFiles(),a.length){for(h=this.getActiveFiles(),f=0,g=h.length;g>f;f++)b=h[f],d+=b.upload.bytesSent,c+=b.upload.total;e=100*d/c}else e=100;return this.emit("totaluploadprogress",e,c,d)},c.prototype._getParamName=function(a){return"function"==typeof this.options.paramName?this.options.paramName(a):""+this.options.paramName+(this.options.uploadMultiple?"["+a+"]":"")},c.prototype._renameFilename=function(a){return"function"!=typeof this.options.renameFilename?a:this.options.renameFilename(a)},c.prototype.getFallbackForm=function(){var a,b,d,e;return(a=this.getExistingFallback())?a:(d='<div class="dz-fallback">',this.options.dictFallbackText&&(d+="<p>"+this.options.dictFallbackText+"</p>"),d+='<input type="file" name="'+this._getParamName(0)+'" '+(this.options.uploadMultiple?'multiple="multiple"':void 0)+' /><input type="submit" value="Upload!"></div>',b=c.createElement(d),"FORM"!==this.element.tagName?(e=c.createElement('<form action="'+this.options.url+'" enctype="multipart/form-data" method="'+this.options.method+'"></form>'),e.appendChild(b)):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method",this.options.method)),null!=e?e:b)},c.prototype.getExistingFallback=function(){var a,b,c,d,e,f;for(b=function(a){var b,c,d;for(c=0,d=a.length;d>c;c++)if(b=a[c],/(^| )fallback($| )/.test(b.className))return b},f=["div","form"],d=0,e=f.length;e>d;d++)if(c=f[d],a=b(this.element.getElementsByTagName(c)))return a},c.prototype.setupEventListeners=function(){var a,b,c,d,e,f,g;for(f=this.listeners,g=[],d=0,e=f.length;e>d;d++)a=f[d],g.push(function(){var d,e;d=a.events,e=[];for(b in d)c=d[b],e.push(a.element.addEventListener(b,c,!1));return e}());return g},c.prototype.removeEventListeners=function(){var a,b,c,d,e,f,g;for(f=this.listeners,g=[],d=0,e=f.length;e>d;d++)a=f[d],g.push(function(){var d,e;d=a.events,e=[];for(b in d)c=d[b],e.push(a.element.removeEventListener(b,c,!1));return e}());return g},c.prototype.disable=function(){var a,b,c,d,e;for(this.clickableElements.forEach(function(a){return a.classList.remove("dz-clickable")}),this.removeEventListeners(),d=this.files,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(this.cancelUpload(a));return e},c.prototype.enable=function(){return this.clickableElements.forEach(function(a){return a.classList.add("dz-clickable")}),this.setupEventListeners()},c.prototype.filesize=function(a){var b,c,d,e,f,g,h,i;if(d=0,e="b",a>0){for(g=["TB","GB","MB","KB","b"],c=h=0,i=g.length;i>h;c=++h)if(f=g[c],b=Math.pow(this.options.filesizeBase,4-c)/10,a>=b){d=a/Math.pow(this.options.filesizeBase,4-c),e=f;break}d=Math.round(10*d)/10}return"<strong>"+d+"</strong> "+e},c.prototype._updateMaxFilesReachedClass=function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")},c.prototype.drop=function(a){var b,c;a.dataTransfer&&(this.emit("drop",a),b=a.dataTransfer.files,this.emit("addedfiles",b),b.length&&(c=a.dataTransfer.items,c&&c.length&&null!=c[0].webkitGetAsEntry?this._addFilesFromItems(c):this.handleFiles(b)))},c.prototype.paste=function(a){var b,c;if(null!=(null!=a&&null!=(c=a.clipboardData)?c.items:void 0))return this.emit("paste",a),b=a.clipboardData.items,b.length?this._addFilesFromItems(b):void 0},c.prototype.handleFiles=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this.addFile(b));return e},c.prototype._addFilesFromItems=function(a){var b,c,d,e,f;for(f=[],d=0,e=a.length;e>d;d++)c=a[d],f.push(null!=c.webkitGetAsEntry&&(b=c.webkitGetAsEntry())?b.isFile?this.addFile(c.getAsFile()):b.isDirectory?this._addFilesFromDirectory(b,b.name):void 0:null!=c.getAsFile?null==c.kind||"file"===c.kind?this.addFile(c.getAsFile()):void 0:void 0);return f},c.prototype._addFilesFromDirectory=function(a,b){var c,d,e;return c=a.createReader(),d=function(a){return"undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log(a):void 0},(e=function(a){return function(){return c.readEntries(function(c){var d,f,g;if(c.length>0){for(f=0,g=c.length;g>f;f++)d=c[f],d.isFile?d.file(function(c){return a.options.ignoreHiddenFiles&&"."===c.name.substring(0,1)?void 0:(c.fullPath=""+b+"/"+c.name,a.addFile(c))}):d.isDirectory&&a._addFilesFromDirectory(d,""+b+"/"+d.name);e()}return null},d)}}(this))()},c.prototype.accept=function(a,b){return a.size>1024*this.options.maxFilesize*1024?b(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(a.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):c.isValidFile(a,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(b(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),this.emit("maxfilesexceeded",a)):this.options.accept.call(this,a,b):b(this.options.dictInvalidFileType)},c.prototype.addFile=function(a){return a.upload={progress:0,total:a.size,bytesSent:0},this.files.push(a),a.status=c.ADDED,this.emit("addedfile",a),this._enqueueThumbnail(a),this.accept(a,function(b){return function(c){return c?(a.accepted=!1,b._errorProcessing([a],c)):(a.accepted=!0,b.options.autoQueue&&b.enqueueFile(a)),b._updateMaxFilesReachedClass()}}(this))},c.prototype.enqueueFiles=function(a){var b,c,d;for(c=0,d=a.length;d>c;c++)b=a[c],this.enqueueFile(b);return null},c.prototype.enqueueFile=function(a){if(a.status!==c.ADDED||a.accepted!==!0)throw new Error("This file can't be queued because it has already been processed or was rejected.");return a.status=c.QUEUED,this.options.autoProcessQueue?setTimeout(function(a){return function(){return a.processQueue()}}(this),0):void 0},c.prototype._thumbnailQueue=[],c.prototype._processingThumbnail=!1,c.prototype._enqueueThumbnail=function(a){return this.options.createImageThumbnails&&a.type.match(/image.*/)&&a.size<=1024*this.options.maxThumbnailFilesize*1024?(this._thumbnailQueue.push(a),setTimeout(function(a){return function(){return a._processThumbnailQueue()}}(this),0)):void 0},c.prototype._processThumbnailQueue=function(){return this._processingThumbnail||0===this._thumbnailQueue.length?void 0:(this._processingThumbnail=!0,this.createThumbnail(this._thumbnailQueue.shift(),function(a){return function(){return a._processingThumbnail=!1,a._processThumbnailQueue()}}(this)))},c.prototype.removeFile=function(a){return a.status===c.UPLOADING&&this.cancelUpload(a),this.files=h(this.files,a),this.emit("removedfile",a),0===this.files.length?this.emit("reset"):void 0},c.prototype.removeAllFiles=function(a){var b,d,e,f;for(null==a&&(a=!1),f=this.files.slice(),d=0,e=f.length;e>d;d++)b=f[d],(b.status!==c.UPLOADING||a)&&this.removeFile(b);return null},c.prototype.createThumbnail=function(a,b){var c;return c=new FileReader,c.onload=function(d){return function(){return"image/svg+xml"===a.type?(d.emit("thumbnail",a,c.result),void(null!=b&&b())):d.createThumbnailFromUrl(a,c.result,b)}}(this),c.readAsDataURL(a)},c.prototype.createThumbnailFromUrl=function(a,b,c,d){var e;return e=document.createElement("img"),d&&(e.crossOrigin=d),e.onload=function(b){return function(){var d,g,h,i,j,k,l,m;return a.width=e.width,a.height=e.height,h=b.options.resize.call(b,a),null==h.trgWidth&&(h.trgWidth=h.optWidth),null==h.trgHeight&&(h.trgHeight=h.optHeight),d=document.createElement("canvas"),g=d.getContext("2d"),d.width=h.trgWidth,d.height=h.trgHeight,f(g,e,null!=(j=h.srcX)?j:0,null!=(k=h.srcY)?k:0,h.srcWidth,h.srcHeight,null!=(l=h.trgX)?l:0,null!=(m=h.trgY)?m:0,h.trgWidth,h.trgHeight),i=d.toDataURL("image/png"),b.emit("thumbnail",a,i),null!=c?c():void 0}}(this),null!=c&&(e.onerror=c),e.src=b},c.prototype.processQueue=function(){var a,b,c,d;if(b=this.options.parallelUploads,c=this.getUploadingFiles().length,a=c,!(c>=b)&&(d=this.getQueuedFiles(),d.length>0)){if(this.options.uploadMultiple)return this.processFiles(d.slice(0,b-c));for(;b>a;){if(!d.length)return;this.processFile(d.shift()),a++}}},c.prototype.processFile=function(a){return this.processFiles([a])},c.prototype.processFiles=function(a){var b,d,e;for(d=0,e=a.length;e>d;d++)b=a[d],b.processing=!0,b.status=c.UPLOADING,this.emit("processing",b);return this.options.uploadMultiple&&this.emit("processingmultiple",a),this.uploadFiles(a)},c.prototype._getFilesWithXhr=function(a){var b,c;return c=function(){var c,d,e,f;for(e=this.files,f=[],c=0,d=e.length;d>c;c++)b=e[c],b.xhr===a&&f.push(b);return f}.call(this)},c.prototype.cancelUpload=function(a){var b,d,e,f,g,h,i;if(a.status===c.UPLOADING){for(d=this._getFilesWithXhr(a.xhr),e=0,g=d.length;g>e;e++)b=d[e],b.status=c.CANCELED;for(a.xhr.abort(),f=0,h=d.length;h>f;f++)b=d[f],this.emit("canceled",b);this.options.uploadMultiple&&this.emit("canceledmultiple",d)}else((i=a.status)===c.ADDED||i===c.QUEUED)&&(a.status=c.CANCELED,this.emit("canceled",a),this.options.uploadMultiple&&this.emit("canceledmultiple",[a]));return this.options.autoProcessQueue?this.processQueue():void 0},e=function(){var a,b;return b=arguments[0],a=2<=arguments.length?i.call(arguments,1):[],"function"==typeof b?b.apply(this,a):b},c.prototype.uploadFile=function(a){return this.uploadFiles([a])},c.prototype.uploadFiles=function(a){var b,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L;for(w=new XMLHttpRequest,x=0,B=a.length;B>x;x++)b=a[x],b.xhr=w;p=e(this.options.method,a),u=e(this.options.url,a),w.open(p,u,!0),w.withCredentials=!!this.options.withCredentials,s=null,g=function(c){return function(){var d,e,f;for(f=[],d=0,e=a.length;e>d;d++)b=a[d],f.push(c._errorProcessing(a,s||c.options.dictResponseError.replace("{{statusCode}}",w.status),w));return f}}(this),t=function(c){return function(d){var e,f,g,h,i,j,k,l,m;if(null!=d)for(f=100*d.loaded/d.total,g=0,j=a.length;j>g;g++)b=a[g],b.upload={progress:f,total:d.total,bytesSent:d.loaded};else{for(e=!0,f=100,h=0,k=a.length;k>h;h++)b=a[h],(100!==b.upload.progress||b.upload.bytesSent!==b.upload.total)&&(e=!1),b.upload.progress=f,b.upload.bytesSent=b.upload.total;if(e)return}for(m=[],i=0,l=a.length;l>i;i++)b=a[i],m.push(c.emit("uploadprogress",b,f,b.upload.bytesSent));return m}}(this),w.onload=function(b){return function(d){var e;if(a[0].status!==c.CANCELED&&4===w.readyState){if(s=w.responseText,w.getResponseHeader("content-type")&&~w.getResponseHeader("content-type").indexOf("application/json"))try{s=JSON.parse(s)}catch(f){d=f,s="Invalid JSON response from server."}return t(),200<=(e=w.status)&&300>e?b._finished(a,s,d):g()}}}(this),w.onerror=function(){return function(){return a[0].status!==c.CANCELED?g():void 0}}(this),r=null!=(G=w.upload)?G:w,r.onprogress=t,j={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"},this.options.headers&&d(j,this.options.headers);for(h in j)i=j[h],i&&w.setRequestHeader(h,i);if(f=new FormData,this.options.params){H=this.options.params;for(o in H)v=H[o],f.append(o,v)}for(y=0,C=a.length;C>y;y++)b=a[y],this.emit("sending",b,w,f);if(this.options.uploadMultiple&&this.emit("sendingmultiple",a,w,f),"FORM"===this.element.tagName)for(I=this.element.querySelectorAll("input, textarea, select, button"),z=0,D=I.length;D>z;z++)if(l=I[z],m=l.getAttribute("name"),n=l.getAttribute("type"),"SELECT"===l.tagName&&l.hasAttribute("multiple"))for(J=l.options,A=0,E=J.length;E>A;A++)q=J[A],q.selected&&f.append(m,q.value);else(!n||"checkbox"!==(K=n.toLowerCase())&&"radio"!==K||l.checked)&&f.append(m,l.value);for(k=F=0,L=a.length-1;L>=0?L>=F:F>=L;k=L>=0?++F:--F)f.append(this._getParamName(k),a[k],this._renameFilename(a[k].name));return this.submitRequest(w,f,a)},c.prototype.submitRequest=function(a,b){return a.send(b)},c.prototype._finished=function(a,b,d){var e,f,g;for(f=0,g=a.length;g>f;f++)e=a[f],e.status=c.SUCCESS,this.emit("success",e,b,d),this.emit("complete",e);return this.options.uploadMultiple&&(this.emit("successmultiple",a,b,d),this.emit("completemultiple",a)),this.options.autoProcessQueue?this.processQueue():void 0},c.prototype._errorProcessing=function(a,b,d){var e,f,g;for(f=0,g=a.length;g>f;f++)e=a[f],e.status=c.ERROR,this.emit("error",e,b,d),this.emit("complete",e);return this.options.uploadMultiple&&(this.emit("errormultiple",a,b,d),this.emit("completemultiple",a)),this.options.autoProcessQueue?this.processQueue():void 0},c}(b),a.version="4.3.0",a.options={},a.optionsForElement=function(b){return b.getAttribute("id")?a.options[c(b.getAttribute("id"))]:void 0},a.instances=[],a.forElement=function(a){if("string"==typeof a&&(a=document.querySelector(a)),null==(null!=a?a.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");return a.dropzone},a.autoDiscover=!0,a.discover=function(){var b,c,d,e,f,g;for(document.querySelectorAll?d=document.querySelectorAll(".dropzone"):(d=[],b=function(a){var b,c,e,f;for(f=[],c=0,e=a.length;e>c;c++)b=a[c],f.push(/(^| )dropzone($| )/.test(b.className)?d.push(b):void 0);return f},b(document.getElementsByTagName("div")),b(document.getElementsByTagName("form"))),g=[],e=0,f=d.length;f>e;e++)c=d[e],g.push(a.optionsForElement(c)!==!1?new a(c):void 0);return g},a.blacklistedBrowsers=[/opera.*Macintosh.*version\/12/i],a.isBrowserSupported=function(){var b,c,d,e,f;if(b=!0,window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a"))for(f=a.blacklistedBrowsers,d=0,e=f.length;e>d;d++)c=f[d],c.test(navigator.userAgent)&&(b=!1);else b=!1;else b=!1;return b},h=function(a,b){var c,d,e,f;for(f=[],d=0,e=a.length;e>d;d++)c=a[d],c!==b&&f.push(c);return f},c=function(a){return a.replace(/[\-_](\w)/g,function(a){return a.charAt(1).toUpperCase()})},a.createElement=function(a){var b;return b=document.createElement("div"),b.innerHTML=a,b.childNodes[0]},a.elementInside=function(a,b){if(a===b)return!0;for(;a=a.parentNode;)if(a===b)return!0;return!1},a.getElement=function(a,b){var c;if("string"==typeof a?c=document.querySelector(a):null!=a.nodeType&&(c=a),null==c)throw new Error("Invalid `"+b+"` option provided. Please provide a CSS selector or a plain HTML element.");return c},a.getElements=function(a,b){var c,d,e,f,g,h,i,j;if(a instanceof Array){e=[];try{for(f=0,h=a.length;h>f;f++)d=a[f],e.push(this.getElement(d,b))}catch(k){c=k,e=null}}else if("string"==typeof a)for(e=[],j=document.querySelectorAll(a),g=0,i=j.length;i>g;g++)d=j[g],e.push(d);else null!=a.nodeType&&(e=[a]);if(null==e||!e.length)throw new Error("Invalid `"+b+"` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");return e},a.confirm=function(a,b,c){return window.confirm(a)?b():null!=c?c():void 0},a.isValidFile=function(a,b){var c,d,e,f,g;if(!b)return!0;for(b=b.split(","),d=a.type,c=d.replace(/\/.*$/,""),f=0,g=b.length;g>f;f++)if(e=b[f],e=e.trim(),"."===e.charAt(0)){if(-1!==a.name.toLowerCase().indexOf(e.toLowerCase(),a.name.length-e.length))return!0}else if(/\/\*$/.test(e)){if(c===e.replace(/\/.*$/,""))return!0
}else if(d===e)return!0;return!1},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(b){return this.each(function(){return new a(this,b)})}),"undefined"!=typeof module&&null!==module?module.exports=a:window.Dropzone=a,a.ADDED="added",a.QUEUED="queued",a.ACCEPTED=a.QUEUED,a.UPLOADING="uploading",a.PROCESSING=a.UPLOADING,a.CANCELED="canceled",a.ERROR="error",a.SUCCESS="success",e=function(a){var b,c,d,e,f,g,h,i,j,k;for(h=a.naturalWidth,g=a.naturalHeight,c=document.createElement("canvas"),c.width=1,c.height=g,d=c.getContext("2d"),d.drawImage(a,0,0),e=d.getImageData(0,0,1,g).data,k=0,f=g,i=g;i>k;)b=e[4*(i-1)+3],0===b?f=i:k=i,i=f+k>>1;return j=i/g,0===j?1:j},f=function(a,b,c,d,f,g,h,i,j,k){var l;return l=e(b),a.drawImage(b,c,d,f,g,h,i,j,k/l)},d=function(a,b){var c,d,e,f,g,h,i,j,k;if(e=!1,k=!0,d=a.document,j=d.documentElement,c=d.addEventListener?"addEventListener":"attachEvent",i=d.addEventListener?"removeEventListener":"detachEvent",h=d.addEventListener?"":"on",f=function(c){return"readystatechange"!==c.type||"complete"===d.readyState?(("load"===c.type?a:d)[i](h+c.type,f,!1),!e&&(e=!0)?b.call(a,c.type||c):void 0):void 0},g=function(){var a;try{j.doScroll("left")}catch(b){return a=b,void setTimeout(g,50)}return f("poll")},"complete"!==d.readyState){if(d.createEventObject&&j.doScroll){try{k=!a.frameElement}catch(l){}k&&g()}return d[c](h+"DOMContentLoaded",f,!1),d[c](h+"readystatechange",f,!1),a[c](h+"load",f,!1)}},a._autoDiscoverFunction=function(){return a.autoDiscover?a.discover():void 0},d(window,a._autoDiscoverFunction)}).call(this);
'use strict';

app.directive("ngActivity", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/activity/activity.html",
        link: function (scope, element, attrs) {
            scope.activity = $location.search().activity;
        }
    };
}]);
'use strict';

app.directive("adr", ["$timeout", "AddressSvc", function ($timeout, AddressSvc) {
    return {
        restrict: 'EA',
        templateUrl: "modules/adr/adr.html",
        link: function (scope, element, attrs) {

            scope.address = {};

            AddressSvc.getProvince().then(function success(data) {//页面载入时获取[{省}]数据
                /*scope.inputPickerData = {
                    tag: 'address',
                    data: data
                };*/

                scope.pickers = data;
            });

            scope.setPicker = function (picker) {//选定数据
                scope.picker = picker;

                console.log(picker);

                if (picker.name === 'province') {//监听picker控件传出的值{name<province>,value<string>}
                    scope.address.province = picker.value;
                    console.log(picker.value);
                    AddressSvc.getCity(picker.value).then(function success(data) {
                        scope.pickers = data;
                    });
                }
                if (picker.name === 'city') {//监听picker控件传出的值{name<city>,value<string>}
                    scope.address.city = picker.value;
                    AddressSvc.getDistrict(scope.address.province, picker.value).then(function success(data) {
                        scope.pickers = data;
                    });
                }
                if (picker.name === 'district') {//监听picker控件传出的值{name<district>,value<string>}
                    scope.isPickerShow = false;//隐藏picker空间
                    scope.address.district = picker.value;//设置district值
                    AddressSvc.getProvince().then(function success(data) {//初始化为[{省}]数据
                        scope.pickers = data;
                    });
                }
            };

            scope.setPickerShow = function () {//设置是否显示picker控件
                scope.isPickerShow = true;
            };

            scope.setPickerHide = function (state) {//设置隐藏显示picker状态
                scope.$root.isPickerShow = false;
            };

            /*scope.$watch('outputPickerData', function (n, o, scope) {//监听picker控件传出的值{name<string>,value<string>}
                if (n !== o && n != undefined) {

                    if (n.tag !== 'address') {
                        return false;
                    }

                    if (n.data.name === 'province') {//监听picker控件传出的值{name<province>,value<string>}
                        scope.userInfo.address.province = n.data.value;
                        AddressSvc.getCity(n.data.value).then(function success(data) {
                            scope.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                    if (n.data.name === 'city') {//监听picker控件传出的值{name<city>,value<string>}
                        scope.userInfo.address.city = n.data.value;
                        AddressSvc.getDistrict(scope.userInfo.address.province, n.data.value).then(function success(data) {
                            scope.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                    if (n.data.name === 'district') {//监听picker控件传出的值{name<district>,value<string>}
                        scope.isPickerShow = false;//隐藏picker空间
                        scope.userInfo.address.district = n.data.value;//设置district值
                        AddressSvc.getProvince().then(function success(data) {//初始化为[{省}]数据
                            scope.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                }
            }, true);*/

            /*scope.$watch('userInfo.address', function (n, o, scope) {
                $timeout(function () {
                    if (scope.newAddressForm.receiverProvince.$valid && scope.newAddressForm.receiverCity.$valid && scope.newAddressForm.receiverDistrict.$valid) {
                        scope.receiverAddress = scope.userInfo.address.province + scope.userInfo.address.city + scope.userInfo.address.district;
                    }
                });
            }, true);*/
        }
    };
}]);
'use strict';

app.directive("chooseM", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/chooseMore/chooseMore.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("chooseNumber", ["$compile", function ($compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/chooseNumber/chooseNumber.html",
        controller: "chooseNumberController",
        link: function (scope, element) {
            //scope.pageClass = "hide-checkbox";

        }
    };
}]).controller('chooseNumberController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();

    var curr;

    $scope.onclickSpan = function (parenIndex, pos) {
        $("#idNumDiv").attr("class", "tooltip bottom t-" + parenIndex + " l" + pos);
        var i, numNow, selectSpan;
        numNow = "";
        selectSpan = $("#choose-nums" + parenIndex + " li");
        curr = pos;
        selectSpan.eq(pos).nextAll().attr("class", "none");
        selectSpan.eq(pos).attr("data-value", "");
        selectSpan.eq(pos).nextAll().attr("data-value", "");
        for (i = 0; i < curr; i++) {
            numNow = numNow + selectSpan.eq(i).attr("data-value");
        }
        var jsonDs = getNumArr(numNow);
        $("#idNumDiv .numberContent ul").html("");
        if (selectSpan.eq(i - 1).attr("data-value") == "") {
            $("#idNumDiv .numberContent ul")
                .append(
                    "<li class='alert' style='background:none; color:#000; font-size:14px;'>请先选择上一位号码，谢谢：）</li>");
        } else {
            selectSpan.eq(pos).attr("class", "wnone");
            $.each(eval(jsonDs), function (v, k) {
                var el = $compile("<li ng-click='onclickLi(" + parenIndex + "," + k + ")' class='n" + k + "' value=" + k + ">" + k + "</li>")($scope);
                $("#idNumDiv .numberContent ul").append(el);
            });
            tooltipShow("#idNumDiv");
        }
        $(".i-package-info").find("hr").hide();
        $(".i-package-info").find(".more").hide();
    }

    $scope.onclickLi = function (p, k) {
        var j, numLast, number1, number2, number3;
        $("#choose-nums" + p + " li").eq(curr).attr("data-value", k);
        $("#choose-nums" + p + " li").eq(curr).attr("class", "s" + k);
        $("#idNumDiv").css("display", "none");
        $("#idNumDiv").attr("class", "tooltip bottom t-" + p + " l" + curr);
        if (curr < 10) {
            $scope.onclickSpan(p, curr + 1);
            return;
        }
        if (p == 1 && curr == 10) {
            $("#idNumDiv .tooltip-arrow").css("class", "l10");
            numLast = "";
            for (j = 0; j < 11; j++) {
                numLast = numLast + $("#choose-nums" + p + " li").eq(j).attr("data-value");
            }
            if (numLast == $("#number2").val()) {
                alert("您选择的号码重复，请重新选择！");
                $scope.onclickSpan(1,10);
            } else {
                $("#number").val(numLast);
                number1 = numLast;
            }
        }
        if (p == 2 && curr == 10) {
            $("#idNumDiv .tooltip-arrow").css("class", "l10");
            numLast = "";
            for (j = 0; j < 11; j++) {
                numLast = numLast + $("#choose-nums" + p + " li").eq(j).attr("data-value");
            }
            //console.log($("#number").val());
            if (numLast == $("#number").val()) {
                alert("您选择的号码重复，请重新选择！");
                $scope.onclickSpan(2,10);
            } else {
                $("#number2").val(numLast);
                number2 = numLast;
            }

        }
    }

}]);
'use strict';

app.directive("ngComments", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/comments/comments.html",
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
                _MEIQIA('showPanel');
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
'use strict';

app.directive("detailsTabs", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/detailsTabs/detailsTabs.html",
        link: function (scope, element, attrs) {
            //console.log("1");
            var $img = $(element).find("img");
            scope.fullDescription = scope.phone.phoneTypes[0].fullDescription;
            
            scope.getContent = function (obj){
            	var args=['_ProductDetails','_Specifications','_CommentsUser','_PurchaseNotes'];
                writebdLog(scope.category,args[obj], "渠道号", scope.gh);//商品详细
            };
        }
    };
    
}]);
'use strict';

app.directive("ngGh", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/gh/gh.html",
        link: function (scope, element, attrs) {
            scope.gh = $location.search().gh;
        }
    };
}]);
'use strict';

/*
app.directive("a", ['$location', function ($location) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var _params = $location.search();
            var _href = attrs.href;
            var _hash;
            var i = 0;

            if (_href) {
                //console.log(_href);
                $.each(_params, function (name, key) {
                    if (i == 0) {
                        //console.log(_href);
                        _hash = "?" + name + "=" + key;
                        if (_href.indexOf("?") != -1) {
                            _hash = "&" + name + "=" + key;
                        }
                    } else {
                        _hash = _hash + "&" + name + "=" + key;
                    }
                    i++;
                });
                scope.hash = _hash;
                if (_href != "javascript:;" && scope.hash != undefined && attrs.hasHash != "false") {
                    element.attr("href", _href + scope.hash);
                }
            }
        }
    };
}]);*/

'use strict';

app.directive("ngListItemBox", [function () {
    return {
        restrict: 'C',
        templateUrl: "modules/listItemBox/listItemBox.html",
        scope: {
            singlePhone: '=',
            pageType: '=',
            category: '=',
            gh: '=',
            activity: '=',
            params: '='
        },
        link: function (scope, element, attrs) {

            var imgs = scope.singlePhone.phoneTypes[0].mediaProductList;
            scope.mainColor = imgs[getIndex(imgs, 'selected', 1)];

            scope.selectedColor = function (stock, color) {
                if (stock != 1) {
                    return false;
                }
                scope.mainColor = color;
            };

            scope.writeSelectFoods = function (obj, productId, modular) {
                writebdLog(scope.category, "_ClickGoods" + productId, "渠道号", scope.gh);//选择的商品ID
            };
        }
    };
}]);
app.directive('onFinish', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
}]);
'use strict';

app.directive("owlCarousel", ['$http','$compile', function ($http,$compile) {
    return {
        restrict: 'E',
        templateUrl: "modules/owlCarousel/owlCarousel.html",
        scope : {
            imgUrls : '='
        },
        link: function (scope, element, attrs) {
        }
    };
}]).directive("carouselItem", ['$http','$compile', function ($http,$compile) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if(scope.$last){
                $(element).parent().owlCarousel({
                    navigation : true, // Show next and prev buttons
                    slideSpeed : 300,
                    paginationSpeed : 400,
                    singleItem:true,
                    autoPlay:3000
                });
            }
        }
    };
}]);
'use strict';

app.directive("phoneColors", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "modules/phoneColors/phoneColors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.colorTitle = attrs.title;
            scope.colorSubTitle = attrs.subTitle;

            scope.phone.$promise.then(function (phone) {
                $http.get('/data/phones/colors/' + scope.phone.phoneModel + '.json').success(function (colors) {
                    scope.colors = colors;
                    scope.color = colors[getIndex(colors, "selected", "curr")];
                    //console.log(getIndex(colors, "selected", "curr"));

                });
            });

            //选择手机颜色
            scope.setPhoneColor = function (event, color) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                if ($this.hasClass("disabled")) {
                    return false;
                } else {
                    $this.parent().siblings().children().removeClass('curr');
                    $this.addClass('curr');
                    scope.color = color;
                    writebdLog(scope.category, "_FuselageColor", "渠道号", scope.gh);//选择机身颜色
                }
            };

            scope.dialogShow = function (title, content) {
                //console.log("1");
                scope.$root.dialog.open(title, content);
            };

            scope.$watch('productId', function (n, o, scope) {//临时解决方案
                if (n != o && scope.colors) {
                    if (n == 256 || n==257) {
                        scope.colors[0].selected = "disabled";
                        $("#color0").removeClass("curr");
                        if (scope.color.colorName == "亮黑色") {
                            var _index = getIndex(scope.colors, "colorName", "黑色");
                            scope.color = scope.colors[_index];
                            $("#color" + _index).addClass("curr");
                            scope.dialogShow("", "'亮黑色'暂时没货，帮您换成了黑色，或者您可以重新选择");
                            //return;
                        }
                    } else {
                        scope.colors[0].selected = "";
                    }
                }
            });
        }
    };
}]);
'use strict';

app.directive("ngPhoneQuery", ["$cookieStore", function ($cookieStore) {
    return {
        restrict: 'C',
        templateUrl: "modules/phoneQuery/n.html",
        controller: "numberController",
        link: function (scope, element, attrs) {

            scope.hasSubNumber = attrs.hasSubNumber;

            var $container = $('.content-scrollable');

            scope.$root.checkMainNumber = function () {
                if (!scope.productDetailsForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    scope.mainNumberShow = true;
                    scope.subNumberShow = false;
                    return false;
                }
                return true;
            };

            scope.checkSubNumber = function () {
                if (!scope.productDetailsForm.subNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    scope.mainNumberShow = false;
                    scope.subNumberShow = true;
                    return false;
                }
                return true;
            };

            scope.setMainNumber = function (event, numberItem) {
                event.stopPropagation();
                //var $this = $(event.currentTarget);

                if (checkSameNumber(numberItem.n, scope.subNumber)) {
                    scope.mainNumber = numberItem.n;
                    scope.mainNumberShow = false;
                    writebdLog(scope.category, "_mainSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }
            };

            scope.setSubNumber = function (event, numberItem) {
                event.stopPropagation();
                //var $this = $(event.currentTarget);

                if (checkSameNumber(scope.mainNumber, numberItem.n)) {
                    scope.subNumber = numberItem.n;
                    scope.subNumberShow = false;
                    writebdLog(scope.category, "_subSelectNumber", "渠道号", scope.gh);//选择号码
                } else {
                    scope.$root.dialog.open('系统提示', '您选择的主卡号码和副卡号码相同，请重新选择');
                }
            };

            scope.showMNumberPn = function (event) {
                event.preventDefault();
                scope.mainNumberShow = true;
                scope.subNumberShow = false;
                writebdLog(scope.category, "_mainCuteNumber", "渠道号", scope.gh);//选择主卡靓号
            };

            scope.showSNumberPn = function (event) {
                event.preventDefault();
                scope.subNumberShow = true;
                scope.mainNumberShow = false;
                writebdLog(scope.category, "_subCuteNumber", "渠道号", scope.gh);//选择副卡靓号
            };

            scope.miniTabClose = function (event) {
                if (event) {
                    event.preventDefault();
                }
                $(".mini-tab").removeClass("hover");
                //$(".list-item.s").removeClass("curr");
            }
            
            scope.filterN = function (e) {
                e.s <= 800;
            }
        }
    };
}]).controller('numberController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();
    $scope.phoneSubData = new Array();

    $scope.phoneMainFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterData = _data;
        } else {
            $scope.filterData = $scope.phoneData;
        }
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.phoneSubFilter = function (query) {//查询包含query的手机号码;
        var _data = new Array();
        if (query != "") {
            $.each($scope.phoneSubData, function (i, k) {
                if ((k.n).indexOf(query) >= 0) {
                    _data.push(k);
                }
            });
            $scope.filterSubData = _data;
        } else {
            $scope.filterSubData = $scope.phoneSubData;
        }
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();
    };

    $scope.inputNumber = function (query, type) {//输入查询的号码
        if (query == "") return;
        writebdLog($scope.category, '_' + type + 'InputNumber', "渠道号", $scope.gh);//输入查询号码
    };

    $http.jsonp('http://m.gd189fq.com/wap/taokafanghaoNew/fetchLuckNumber.html?callback=JSON_CALLBACK').success(function (data, status, headers, config) {//获取所有的手机号码

        data = data.sort(function (a, b) {
            return b.s - a.s;
        });

        $.each(eval(data), function (i, k) {
            if(k.s <= 800){
                $scope.phoneData.push(k);
                if (k.t == 0) {
                    $scope.phoneSubData.push(k);
                }
            }
        });

        $scope.dataInit = function () {
            $scope.selPage = 1;
            $scope.selSubPage = 1;
            $scope.pageList = [];
            $scope.pages = Math.ceil($scope.filterData.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        };

        $scope.filterData = $scope.phoneData;
        $scope.filterSubData = $scope.phoneSubData;
        $scope.pageSize = 12;

        //设置数据源(分页)
        $scope.setData = function (type) {
            if (type == "main") {
                $scope.mainItems = $scope.filterData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }
            else {
                $scope.subItems = $scope.filterSubData.slice(($scope.pageSize * ($scope.selSubPage - 1)), ($scope.selSubPage * $scope.pageSize));
            }
        };

        //初始化数据
        $scope.mainItems = $scope.filterData.slice(0, $scope.pageSize);
        $scope.subItems = $scope.filterSubData.slice(0, $scope.pageSize);

        $scope.dataInit();

        $scope.selectPage = function (page, type) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }

            if (type == 'main') {
                $scope.selPage = page;
            } else {
                $scope.selSubPage = page;
            }
            $scope.setData(type);
            $scope.isActivePage(page);
            //console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
            return $scope.selSubPage == page;
        };
        //上一页
        $scope.Previous = function (type) {
            if (type == 'main') {
                $scope.selectPage($scope.selPage - 1, type);
            } else {
                $scope.selectPage($scope.selSubPage - 1, type);
            }
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);
        };
        //下一页
        $scope.Next = function (type) {
            if (type == 'main') {
                $scope.selectPage($scope.selPage + 1, type);
            } else {
                $scope.selectPage($scope.selSubPage + 1, type);
            }
            writebdLog($scope.category, "_" + type + "ChangeALot", "渠道号", $scope.gh);
        };

    }).error(function (data, status, headers, config) {
        console.log(status);
        //deferred.reject(status)
    });

}]);
'use strict';

app.directive("ngRushBack", ['$location', '$http', '$cookieStore', function ($location, $http, $cookieStore) {
    return {
        restrict: 'C',
        templateUrl: "modules/rush/rush.html",
        link: function (scope, element, attrs) {
            scope.getActiveProList = function (activeDate) {
                scope.activeDate = activeDate;
            };

            scope.dayTag = "today";

            scope.rushPrev = function (event) {
                if (scope.dayTag == "today") {
                    scope.dayTag = "before";
                }
                if (scope.dayTag == "before") {
                    scope.dayTag = "before"
                }
                if (scope.dayTag == "after") {
                    scope.dayTag = "today";
                }
            };

            scope.rushNext = function (event) {
                if (scope.dayTag == "today") {
                    scope.dayTag = "after";
                }
                if (scope.dayTag == "before") {
                    scope.dayTag = "today";
                }
                if (scope.dayTag == "after") {
                    scope.dayTag = "after";
                }
            };

            scope.isDisabled = function (event,dayTag) {
                if(dayTag == 'before'){
                    event.preventDefault();
                }
            };

            $http.jsonp(apiBaseUrl + '/product/getActiveProList.html?activeTag=xsqg&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {

                scope.nowDate = data[0].nowDate;
                scope.todayD = data[0].nowDate.split(" ")[0];

                scope.rushPhones = data[0].productList;

                var _today = new Date(data[0].nowDate.split(" ")[0].replace(/-/g, "/") + " 00:00:00");
                var _beforeDay = new Date(data[0].nowDate.split(" ")[0].replace(/-/g, "/") + " 00:00:00");
                var _afterDay = new Date(data[0].nowDate.split(" ")[0].replace(/-/g, "/") + " 00:00:00");

                _today.setTime(_today.getTime());
                _beforeDay.setTime(_beforeDay.getTime() - 24 * 60 * 60 * 1000);
                _afterDay.setTime(_afterDay.getTime() + 24 * 60 * 60 * 1000);

                scope.todayT = _today.getFullYear() + "-" + (_today.getMonth() + 1) + "-" + _today.getDate();
                scope.todayB = _beforeDay.getFullYear() + "-" + (_beforeDay.getMonth() + 1) + "-" + _beforeDay.getDate();
                scope.todayA = _afterDay.getFullYear() + "-" + (_afterDay.getMonth() + 1) + "-" + _afterDay.getDate();

                //判断当前时间段
                if((scope.nowDate.split(" ")[1]).split(":")[0] <= 11){
                    scope.activeDate = scope.todayD + " 10";
                }else if((scope.nowDate.split(" ")[1]).split(":")[0] >= 13){
                    scope.activeDate = scope.todayD + " 15";
                }else {
                    scope.activeDate = scope.todayD + " 12";
                }

            }).error(function (data, status, headers, config) {
                console.log(status);
                //deferred.reject(status)
            });

            scope.$watch('dayTag', function (n, o, scope) {
                if (n != o) {
                    $http.jsonp(apiBaseUrl + "/product/getActiveProList.html?activeTag=xsqg&activeTime=" + scope.dayTag + "&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
                        scope.rushPhones = data[0].productList;

                        if (scope.dayTag == "today") {
                            scope.activeDate = scope.todayT + " 10";
                        }
                        if (scope.dayTag == "before") {
                            scope.activeDate = scope.todayB + " 10";
                        }
                        if (scope.dayTag == "after") {
                            scope.activeDate = scope.todayA + " 10";
                        }

                    }).error(function (data, status, headers, config) {
                        console.log(status);
                    });
                }
            });
            scope.$watch('activeDate', function (n, o, scope) {
                if (n != o) {
                    $cookieStore.put("rashActiveDate",n + ":00:00");
                }
            });
        }
    };
}]);
'use strict';

app.directive("ngStar", [function () {
    return {
        restrict: 'C',
        replace: true,
        scope: {
            ratting: "="
        },
        templateUrl: "modules/star/star.html",
        link: function (scope, element, attrs) {

            scope.$watch('ratting', function (n, o, scope) {//临时解决方案
                var rate = (parseInt(scope.ratting[0]) + parseInt(scope.ratting[1]) + parseInt(scope.ratting[2])) / 3;
                var $i = $(element).find(".stars-content").find("i");
                for (var i = 0; i < 5; i++) {
                    if (i < rate) {
                        if (i < Math.round(rate)) {
                            $i.eq(i).addClass("on");
                        }else {
                            $i.eq(i).attr('class','fa fa-star-half on');
                        }
                    }
                }
            });

        }
    };
}]);
'use strict';

app.directive("ngTimer", ['$location', '$interval', function ($location, $interval) {
    return {
        restrict: 'C',
        scope: {
            dateDay: "="
        },
        templateUrl: "modules/timer/timer.html",
        link: function (scope, element, attrs) {
            scope.dateTag = attrs.dateTag;
            scope.startT = (scope.dateDay + " " + attrs.startTime).replace(/-/g, "/");
            scope.endT = (scope.dateDay + " " + attrs.endTime).replace(/-/g, "/");
            scope.nowT = (attrs.nowTime).replace(/-/g, "/");
            scope.startTitle = attrs.startTitle;

            //距离活动开始
            var st = new Date(scope.startT) - new Date(scope.nowT);

            //距离活动结束
            var et = new Date(scope.endT) - new Date(scope.nowT);

            var timer = $interval(function () {
                st = st - 1000;
                et = et - 1000;

                var sh = Math.floor(st / 1000 / 60 / 60 % 48);
                var sm = Math.floor(st / 1000 / 60 % 60);
                var ss = Math.floor(st / 1000 % 60);

                var eh = Math.floor(et / 1000 / 60 / 60 % 48);
                var em = Math.floor(et / 1000 / 60 % 60);
                var es = Math.floor(et / 1000 % 60);

                scope.timerS = "<i>" + sh + "</i>" + "<sub> : </sub>" + "<i>" + sm + "</i>" + "<sub> : </sub>" + "<i>" + ss + "</i>";
                scope.timerE = "<i>" + eh + "</i>" + "<sub> : </sub>" + "<i>" + em + "</i>" + "<sub> : </sub>" + "<i>" + es + "</i>";
                //console.log(scope.timerL);
            }, 1000);

            scope.$watch('dateDay', function (n, o, scope) {
                if (n != o) {

                }
            });
        }
    };
}]);
'use strict';

app.directive("userTrack", ['$location', function ($location) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?bf6b21f0333ca2693c4bc666d044360e";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        }
    };
}]);
"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/yfq/:pageType/abs', { //app首页
                templateUrl: 'pages/aboutUs/index.html',
                controller: "aboutUsController"
            }
        );
}]).controller('aboutUsController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.$root.pageType = $routeParams.pageType;
    $scope.$root.params = window.location.search;
}]);
"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/error/:status', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/error/error.html";
            },
            controller: "errorStateController"
        });
}]).controller('errorStateController', ['$scope', '$location', '$cookieStore', 'MarketSvc', '$routeParams', 'OrderSvc', function ($scope, $location, $cookieStore, MarketSvc, $routeParams, OrderSvc) {
    $scope.errorStatus = $routeParams.status;

    if ($location.search()) {
        $scope.errorData = $location.search();
    }

    $scope.getContent = function () {
        getMeiqia();
        //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
        _MEIQIA('showPanel');
    };

}]);
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

"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/form/resume', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/form/form.html";
            },
            controller: "resumeController"
        });
}]).controller('resumeController', ['$scope', function ($scope) {


}]);

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
'use strict';

app.directive("mainNumber", ["$compile", function ($compile) {
    return {
        restrict: 'C',
        templateUrl: "modules/chooseNumber/mainNumber/number.html",
        controller: "chooseNumberController",
        link: function (scope, element, attrs) {
            //scope.pageClass = "hide-checkbox";
            scope.$root.checkMainNumber = function () {
                if (!scope.productDetailsForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    scope.onclickSpan(1, 3);
                    return false;
                }
                return true;
            };
        }
    };
}]).controller('chooseNumberController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http, $compile) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();

    var curr;

    $scope.onclickSpan = function (parenIndex, pos) {
        $("#idNumDiv").attr("class", "tooltip bottom t-" + parenIndex + " l" + pos);
        var i, numNow, selectSpan;
        numNow = "";
        selectSpan = $("#choose-nums" + parenIndex + " li");
        curr = pos;
        selectSpan.eq(pos).nextAll().attr("class", "none");
        selectSpan.eq(pos).attr("data-value", "");
        selectSpan.eq(pos).nextAll().attr("data-value", "");
        for (i = 0; i < curr; i++) {
            numNow = numNow + selectSpan.eq(i).attr("data-value");
        }
        var jsonDs = getNumArr(numNow);
        $("#idNumDiv .numberContent ul").html("");
        if (selectSpan.eq(i - 1).attr("data-value") == "") {
            $("#idNumDiv .numberContent ul")
                .append(
                    "<li class='alert' style='background:none; color:#000; font-size:14px;'>请先选择上一位号码，谢谢：）</li>");
        } else {
            selectSpan.eq(pos).attr("class", "wnone");
            $.each(eval(jsonDs), function (v, k) {
                var el = $compile("<li ng-click='onclickLi(" + parenIndex + "," + k + ")' class='n" + k + "' value=" + k + ">" + k + "</li>")($scope);
                $("#idNumDiv .numberContent ul").append(el);
            });
            tooltipShow("#idNumDiv");
        }
        $(".i-package-info").find("hr").hide();
        $(".i-package-info").find(".more").hide();
    };

    $scope.onclickLi = function (p, k) {
        var j, numLast, number1, number2, number3;
        $("#choose-nums" + p + " li").eq(curr).attr("data-value", k);
        $("#choose-nums" + p + " li").eq(curr).attr("class", "s" + k);
        $("#idNumDiv").css("display", "none");
        $("#idNumDiv").attr("class", "tooltip bottom t-" + p + " l" + curr);
        if (curr < 10) {
            $scope.onclickSpan(p, curr + 1);
            return;
        }
        if (p == 1 && curr == 10) {
            $("#idNumDiv .tooltip-arrow").css("class", "l10");
            numLast = "";
            for (j = 0; j < 11; j++) {
                numLast = numLast + $("#choose-nums" + p + " li").eq(j).attr("data-value");
            }
            if (numLast == $("#number2").val()) {
                alert("您选择的号码重复，请重新选择！");
                $scope.onclickSpan(1, 10);
            } else {
                $scope.mainNumber = numLast;
            }
        }
        if (p == 2 && curr == 10) {
            $("#idNumDiv .tooltip-arrow").css("class", "l10");
            numLast = "";
            for (j = 0; j < 11; j++) {
                numLast = numLast + $("#choose-nums" + p + " li").eq(j).attr("data-value");
            }
            //console.log($("#number").val());
            if (numLast == $scope.mainNumber) {
                alert("您选择的号码重复，请重新选择！");
                $scope.onclickSpan(2, 3);
            } else {
                $scope.subNumber = numLast;
            }

        }

        if($("#idNumDiv").is(':visible')) return;
        if(p==2)
            writebdLog($scope.category, "_subSelectNumber", "渠道号", $scope.gh);//副卡选择号码
        else
        	writebdLog($scope.category, "_mainSelectNumber", "渠道号", $scope.gh);//主卡选择号码
    }

}]);
'use strict';

app.directive("subNumber", ["$compile", function ($compile) {
    return {
        restrict: 'C',
        templateUrl: "modules/chooseNumber/subNumber/number.html",
        controller: "chooseNumberController",
        link: function (scope, element) {
            //scope.pageClass = "hide-checkbox";
        }
    };
}]);
'use strict';

app.directive("headerLogo", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/header/logo/logo.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("headerTop", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/header/top/top.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("mainColors", ['$http', '$q', '$timeout', '$location', function ($http, $q, $timeout, $location) {
    return {
        restrict: 'C',
        templateUrl: "modules/phoneColors/mainColors/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.mainColorTitle = attrs.title;
            scope.mainColorSubTitle = attrs.subTitle;

            if (!!$location.search().colorTag) {

                scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'name', $location.search().colorTag);

                if (scope.mainColorIndex == undefined || scope.phone.phoneTypes[0].mediaProductList[scope.mainColorIndex].stock == 0) {//如果没有红色，或者红色无货
                    scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'selected', 1);
                }


            } else {
                scope.mainColorIndex = getIndex(scope.phone.phoneTypes[0].mediaProductList, 'selected', 1);
            }

            scope.$root.mainColor = scope.phone.phoneTypes[0].mediaProductList[scope.mainColorIndex];

            //选择手机颜色
            scope.$root.setMainPhoneColor = function (color, isSoldOut) {

                if (isSoldOut) {
                    return false
                }
                //console.log($this);
                scope.$root.mainColor = color;
                writebdLog(scope.category, "_mainFuselageColor", "渠道号", scope.gh);//选择机身颜色
            };
        }
    };
}]);
'use strict';

app.directive("subColors", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {
        restrict: 'C',
        templateUrl: "modules/phoneColors/subColors/colors.html",
        link: function (scope, element, attrs) {

            //模块标题
            scope.subColorTitle = attrs.title;
            scope.subColorSubTitle = attrs.subTitle;

            scope.subColor = scope.phone.phoneTypes[1].mediaProductList[0];

            //选择手机颜色
            scope.setSubPhoneColor = function (event, color) {
                event.preventDefault();
                scope.subColor = color;
                writebdLog(scope.category, "_subFuselageColor", "渠道号", scope.gh);//选择机身颜色
            };
        }
    };
}]);
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

    $http.jsonp(cfApi.apiHost + "/product/getProDetial.ht?productId=" + $routeParams.phoneId + "&activeTag=ljzma&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
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

        $scope.successUrl = "http://mall.yfq.cn/payState/B/phone";

        /*$scope.$watch('payType', function (n, o, $scope) {
            if (n !== o) {
                if (n == 0) {//一次性
                    $scope.successUrl = "http://app.yfq.cn/payState/11";
                }
                if (n == 1) {//货到付款
                    $scope.successUrl = "http://app.yfq.cn/payState/12";
                }
                if (n == 2) {//分期
                    $scope.successUrl = "http://app.yfq.cn/payState/10";
                }
            }
        });*/

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

    $http.jsonp(cfApi.apiHost + '/product/getProList.ht?activeTag=ljzma&s=wap&callback=JSON_CALLBACK').success(function (data, status, headers, config) {
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
            $http.jsonp(cfApi.apiHost + "/product/getProDetial.ht?productId=" + n + "&activeTag=ljzma&s=wap&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
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
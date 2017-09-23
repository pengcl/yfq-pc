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
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
                    if (k.ifSellOut == 0) {
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
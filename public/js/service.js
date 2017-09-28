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
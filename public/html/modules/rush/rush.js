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
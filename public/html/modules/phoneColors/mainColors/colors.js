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
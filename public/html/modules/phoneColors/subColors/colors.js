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
'use strict';

app.directive("headerLogo", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/header/logo/logo.html",
        link: function (scope, element, attrs) {
        	scope.writeClick = function (value) {
                writebdLog(scope.category, "_" + value, "渠道号", scope.gh);//记录点击事件
            };
        }
    };
}]);
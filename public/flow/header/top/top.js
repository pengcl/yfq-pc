'use strict';

app.directive("headerTop", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "flow/header/top/top.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
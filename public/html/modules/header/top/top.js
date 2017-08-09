'use strict';

app.directive("headerTop", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/header/top/top.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
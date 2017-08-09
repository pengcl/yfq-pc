'use strict';

app.directive("headerLogo", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/header/logo/logo.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("subNumber", ["$compile", function ($compile) {
    return {
        restrict: 'C',
        templateUrl: "modules/chooseNumber/subNumber/number.html",
        controller: "chooseNumberController",
        link: function (scope, element) {
            //scope.pageClass = "hide-checkbox";
        }
    };
}]);
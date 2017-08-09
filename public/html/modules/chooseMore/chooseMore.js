'use strict';

app.directive("chooseM", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/chooseMore/chooseMore.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
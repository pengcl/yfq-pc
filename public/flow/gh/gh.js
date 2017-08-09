'use strict';

app.directive("ngGh", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/gh/gh.html",
        link: function (scope, element, attrs) {
            scope.gh = $location.search().gh;
        }
    };
}]);
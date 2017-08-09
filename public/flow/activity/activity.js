'use strict';

app.directive("ngActivity", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/activity/activity.html",
        link: function (scope, element, attrs) {
            scope.activity = $location.search().activity;
        }
    };
}]);
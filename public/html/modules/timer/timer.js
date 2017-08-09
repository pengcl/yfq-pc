'use strict';

app.directive("ngTimer", ['$location', '$interval', function ($location, $interval) {
    return {
        restrict: 'C',
        scope: {
            dateDay: "="
        },
        templateUrl: "modules/timer/timer.html",
        link: function (scope, element, attrs) {
            scope.dateTag = attrs.dateTag;
            scope.startT = (scope.dateDay + " " + attrs.startTime).replace(/-/g, "/");
            scope.endT = (scope.dateDay + " " + attrs.endTime).replace(/-/g, "/");
            scope.nowT = (attrs.nowTime).replace(/-/g, "/");
            scope.startTitle = attrs.startTitle;

            //距离活动开始
            var st = new Date(scope.startT) - new Date(scope.nowT);

            //距离活动结束
            var et = new Date(scope.endT) - new Date(scope.nowT);

            var timer = $interval(function () {
                st = st - 1000;
                et = et - 1000;

                var sh = Math.floor(st / 1000 / 60 / 60 % 48);
                var sm = Math.floor(st / 1000 / 60 % 60);
                var ss = Math.floor(st / 1000 % 60);

                var eh = Math.floor(et / 1000 / 60 / 60 % 48);
                var em = Math.floor(et / 1000 / 60 % 60);
                var es = Math.floor(et / 1000 % 60);

                scope.timerS = "<i>" + sh + "</i>" + "<sub> : </sub>" + "<i>" + sm + "</i>" + "<sub> : </sub>" + "<i>" + ss + "</i>";
                scope.timerE = "<i>" + eh + "</i>" + "<sub> : </sub>" + "<i>" + em + "</i>" + "<sub> : </sub>" + "<i>" + es + "</i>";
                //console.log(scope.timerL);
            }, 1000);

            scope.$watch('dateDay', function (n, o, scope) {
                if (n != o) {

                }
            });
        }
    };
}]);
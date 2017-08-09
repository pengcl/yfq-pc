'use strict';

app.directive("userTrack", ['$location', function ($location) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?bf6b21f0333ca2693c4bc666d044360e";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        }
    };
}]);
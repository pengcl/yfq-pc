var app = angular.module('app', ['ngCookies']);
app.config(['$sceProvider', function ($sceProvider) {
    //For sport ie7
    $sceProvider.enabled(false);
}]);

app.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

app.controller('appController', ['$scope', '$q', '$location', '$cookieStore', '$filter', '$timeout', function ($scope, $q, $location, $cookieStore, $filter, $timeout) {
    $scope.$root.pageTitle = '365领流量';
    $scope.$root.pageName = 'flow';

    $scope.turntableNum = 1;
    $scope.award = false;

    if ($cookieStore.get('turntableNum') == 0) {
        $scope.turntableNum = $cookieStore.get('turntableNum');
        $scope.award = true;
    }

    var count = 0;//转的圈数
    var index = 0;
    var prizeNum = 4;

    function rouletteAni(index) {
        $(".item-box").removeClass("curr");
        $("#roulette-" + index).addClass("curr");
    }

    function rouletteEnd() {
        if (index <= prizeNum) {
            rouletteAni(index);
            index = index + 1;
        } else {
            $timeout(function () {
                $scope.award = true;
            }, 500);
            count = 0;
            return false;
        }
        $timeout(function () {
            rouletteEnd();
        }, 200);
    }

    function rouletteStart() {
        if (index <= 7) {
            rouletteAni(index);
            index = index + 1;
        } else if (index == 8 && count < 5) {
            index = 0;
            rouletteAni(index);
            count = count + 1;
        } else {
            index = 0;
            rouletteEnd();
            return false;
        }
        $timeout(function () {
            rouletteStart();
        }, 60);
    }

    $scope.close = function () {
        $scope.award = false;
    };

    $scope.start = function () {//开始抽奖
        if ($scope.turntableNum > 0) {
            rouletteStart();
            $scope.turntableNum = 0;
            $cookieStore.put('turntableNum', 0)
        } else {
            console.log('转盘次数已用完。成功邀请好友关注可获得转盘次数，快去邀请好友吧！');
        }
    };
}]);
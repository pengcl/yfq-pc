"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/error/:status', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/error/error.html";
            },
            controller: "errorStateController"
        });
}]).controller('errorStateController', ['$scope', '$location', '$cookieStore', 'MarketSvc', '$routeParams', 'OrderSvc', function ($scope, $location, $cookieStore, MarketSvc, $routeParams, OrderSvc) {
    $scope.errorStatus = $routeParams.status;

    if ($location.search()) {
        $scope.errorData = $location.search();
    }

    $scope.getContent = function () {
        getMeiqia();
        //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
        _MEIQIA('showPanel');
    };

}]);
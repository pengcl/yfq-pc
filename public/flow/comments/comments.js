'use strict';

app.directive("ngComments", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/comments/comments.html",
        link: function (scope, element, attrs) {
            var $commentsTips = $(".comments-tips");
            var $showQrCodeTips = $(".qrcode-tips");

            scope.scrollTo = function (event, index, className) {
                scope.navSortIndex = index;
                $("html,body").animate({
                    scrollTop: 0
                }, 500, 'swing');
            };

            scope.getComments = function (event) {
                event.preventDefault();
                getMeiqia();
                //scope.$root.dialog.open("","咨询请关注微信公众号<br><em>“翼分期商城”</em>");
                _MEIQIA('showPanel', {
                    groupToken: '5fcb8fc3c4aae224a01be2eaff210f1c'
                });
                
                writebdLog(scope.category, "_CustConsult", "渠道号", scope.gh);//客服咨询
            };
            scope.showComments = function (event) {
                event.preventDefault();
                $commentsTips.show();
            };
            scope.hideComments = function (event) {
                event.preventDefault();
                $commentsTips.hide();
            };
            scope.addFavorite = function (event) {
                event.preventDefault();
                addFavorite();
            };
            scope.showQrCode = function (event) {
                event.preventDefault();
                $showQrCodeTips.show();
            };
            scope.hideQrCode = function (event) {
                event.preventDefault();
                $showQrCodeTips.hide();
            }
        }
    };
}]);
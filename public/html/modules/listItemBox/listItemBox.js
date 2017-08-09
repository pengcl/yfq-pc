'use strict';

app.directive("ngListItemBox", [function () {
    return {
        restrict: 'C',
        templateUrl: "modules/listItemBox/listItemBox.html",
        scope: {
            singlePhone: '=',
            pageType: '=',
            category: '=',
            gh: '=',
            activity: '=',
            params: '='
        },
        link: function (scope, element, attrs) {

            var imgs = scope.singlePhone.phoneTypes[0].mediaProductList;
            scope.mainColor = imgs[getIndex(imgs, 'selected', 1)];

            scope.selectedColor = function (stock, color) {
                if (stock != 1) {
                    return false;
                }
                scope.mainColor = color;
            };

            scope.writeSelectFoods = function (obj, productId, modular) {
                writebdLog(scope.category, "_ClickGoods" + productId, "渠道号", scope.gh);//选择的商品ID
            };
        }
    };
}]);
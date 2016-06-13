/**
 * Created by 50683 on 2016/6/13.
 */
var travelFilterModule = angular.module('travelFilterModule', [])

travelFilterModule.filter('trustHtml',[ '$sce',function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
}]);
/**
 * Created by 50683 on 2016/6/8.
 */
var travelListModule = angular.module('travelListModule', ['travelServiceModule']);

travelListModule.controller('travelIndexListCtrl', ['$scope', '$state', 'travelIndexListService', 'pageJumpService', function ($scope, $state, travelIndexListService, pageJumpService) {
    $scope.tab = 1;

    travelIndexListService.traveListGet().success(function (data, header, config, status) {
        $scope.traveListData = data.data;
    }).error(function (data, header, config, status) {

    });


    $scope.statego = function (url, id) {
        pageJumpService.statego(url, id);
    }

}]);
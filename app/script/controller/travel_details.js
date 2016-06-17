/**
 * Created by 50683 on 2016/6/13.
 */
var travelDetailsModule = angular.module('travelDetailsModule', ['travelServiceModule','travelFilterModule']);

travelDetailsModule.controller('travelDetailsCtrl', ['$scope','$state' ,'$stateParams','travelDetailsService','pageJumpService', function ($scope,$state,$stateParams, travelDetailsService,pageJumpService) {

     travelDetailsService.traveDetailsGet($stateParams.uuid).success(function (data, header, config, status) {
         $scope.travleDetailsData=data.data;
    });

    $scope.statego=function(url,id){
        pageJumpService.statego(url,id);
    }
}])
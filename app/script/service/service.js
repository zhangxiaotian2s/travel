/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelServiceModule = angular.module('travelServiceModule', [])

/*
* 获取旅游列表
* */
travelServiceModule.service('travelIndexListService', function ($http) {
    var self=this
    this.index_list_api='http://192.168.3.130:9393/v10/tourism/travels/show.json?uuid='
    this.traveListGet = function (uuid) {
      return  $http({
            url: self.index_list_api+uuid,
            method: 'GET'
        })
    }
})
/**
 * 旅游详情内容
 */

travelServiceModule.service('travelDetailsService', function ($http) {
    var self=this
    this.travel_details_api='http://192.168.3.130:9393/v10/tourism/travels/show.json?uuid='
    this.traveListGet = function (uuid) {
        return  $http({
            url: self.travel_details_api+uuid,
            method: 'GET'
        })
    }
})
/*
* 订单创建
 */
travelServiceModule.service('orderCreatService', function ($http) {

})

/*
* 页面跳转
* */
travelServiceModule.service('pageJumpService',['$state',function ($state) {

    this.statego=function(url,id){
        $state.go(url, {
            uuid: id
        })
    };
}])





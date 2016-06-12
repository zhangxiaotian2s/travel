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

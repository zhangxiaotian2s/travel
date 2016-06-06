/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelServiceModule = angular.module('travelServiceModule', [])

/*
* 获取旅游列表
* */
travelServiceModule.service('travelListService', function ($http) {
    this.traveListGet = function (uuid) {
      return  $http({
            url: 'http://api.mastergolf.cn/v1/news/articles/list.json?channel_uuid='+uuid,
            method: 'GET'
        })
    }
})
/*
 * 详情
 * */
travelServiceModule.service('travelDetailService', function () {
    this.travelDetailGet= function (uuid) {
        return $http({
            url:'http://api.development.mastergolf.cn/v1/news/articles/comments_count.json?uuid='+uuid,
            method:'GET'
        })
    }
})

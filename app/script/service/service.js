/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelServiceModule = angular.module('travelServiceModule', []);

/*
* 获取旅游列表
* */
travelServiceModule.service('travelIndexListService', function ($http) {
    var self=this;
    var index_list_api='http://api.development.mastergolf.cn/v10/tourism/travels.json';
    this.traveListGet = function () {
      return  $http({
            url: index_list_api,
            method: 'GET'
        })
    }
});
/**
 * 旅游详情内容
 */

travelServiceModule.service('travelDetailsService', function ($http) {
    var self=this;
    var travel_details_api='http://api.development.mastergolf.cn/v10/tourism/travels/show.json?uuid='
    this.traveDetailsGet = function (uuid) {
        return  $http({
            url: travel_details_api+uuid,
            method: 'GET'
        })
    }
});
/*
* 订单创建
 */

travelServiceModule.service('orderCreatService', function ($http) {
    var ajax_submit_url='http://api.development.mastergolf.cn/v10/tourism/orders/create.json'
    this.ajaxSubmit= function (data) {
        return  $http({
            method  : 'POST',
            url : ajax_submit_url,
            data  : data
        })
    }
});

/*
* 页面跳转
* */
travelServiceModule.service('pageJumpService',['$state',function ($state) {

    this.statego=function(url,id){
        $state.go(url, {
            uuid: id
        })
    };
}]);

/*
* 表单验证
* */
travelServiceModule.factory('orderValidateService', ['$http',function ($http) {

    var validate= {
        name: function (str) {
            return  /^[\u4E00-\u9FA5A-Za-z]+$/.test(str);
        },
        phone: function (str) {
            return /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/.test(str);
        }

    };
    return validate
}]);

/*
* 信息提示
* */
travelServiceModule.service('promptService', ['$timeout',function ($timeout) {
    this.promit=function() {
        var _html = '<p class="pf" style="top:0px">xxxxxx</p>';
         document.body.innerHTML+=_html;
    }


}]);







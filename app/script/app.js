/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelApp = angular.module('travelApp', ['ui.router', 'ngTouch','ngAnimate','travelListModule','travelServiceModule','travelDirectiveModule','travelDetailsModule','travelFilterModule'])
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 */
travelApp.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.tab=1;

})
travelApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index')
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/travel_index_list.html',
            controller:'travelIndexListCtrl'
        })
        .state('details', {
            url: '/details/:uuid',
            templateUrl: 'views/travel_details.html',
            controller: 'travelDetailsCtrl'


        })
})

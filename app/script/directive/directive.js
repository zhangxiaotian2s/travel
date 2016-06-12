/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelDirceitve = angular.module('travelDirectiveModule', ['travelListModule']);

travelDirceitve.directive("imglazyload", function () {
    return {
        restrict: 'A',
        replace: false,
        scope:{

        },
        //template: '<img ng-src={{travellist.image}}   class="lazyimg img-responsive" >',
        link: function (scope, element, attrs) {
         var lazyimg=angular.element(element)

            //for(var i=0;i<lazyimg.length;i++){
                lazyimg.attr('src',attrs.datalazysrc)
            //}
            console.log(attrs.datalazysrc)
        }
    }
})
'use strict';

angular.module('cookorico')
	.directive('comments',function(){
		return {
        templateUrl:'scripts/directives/sidenav/comments/comments.html?v='+window.app_version,
        restrict: 'E',
        replace: true,
    	}
	});



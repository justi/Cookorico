'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('cookorico')
  .controller('LoginCtrl', function($scope, $location) {



    $scope.submit = function() {

      $location.path('/dashboard');

      return false;
    }

  });

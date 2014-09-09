'use strict';
angular.module('cbDemo', ['cb']);

angular.module('cbDemo').controller('MainCtrl',
  function($scope, $interval) {
    function getRandomArbitary(min, max) {
      return (Math.random() * (max - min) + min).toFixed(3);
    }
    $scope.number = getRandomArbitary(0, 3);

    $interval(function() {
      $scope.number = getRandomArbitary(0, 3);
    }, 3000);
  }
);

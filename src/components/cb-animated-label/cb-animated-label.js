'use strict';

/**
 * @ngdoc directive
 * @name cb.animatedLabel:cbAnimatedLabel
 * @restrict E
 * @scope
 *
 * @description
 * Allows you to animate integers, decimals, commas, and dollar signs (0-9.,$)
 * between different values.
 *
 * @example
     <doc:example>
       <doc:source>
        <cb-animated-label target="{{number}}"></cb-animated-label>
       </doc:source>
     </doc:example>
 *
 * @param {expression} value What numerical value to show.
 */
angular.module('cb.components.cbAnimatedLabel', [
  'cb.services.cbComponents'
]).directive('cbAnimatedLabel',
  ['cbComponents',
  function(cbComponents) {

    return {
      restrict: 'E',
      templateUrl: cbComponents.getTemplateUrl('cb-animated-label.html'),
      scope: {
        value: '@target'
      },
      link: function($scope) {
        $scope.values = [];

        $scope.$watch('value', function(val) {
          if (val === undefined) {
            val = 0;
          }

          $scope.values.length = 0;
          $scope.values = $scope.values.concat(val.split(''));
        });
      }
    };
  }]
);

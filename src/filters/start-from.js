'use strict';
/**
 *
 * @fileoverview
 * Takes an array or a string and returns the input starting from the start
 * point. Useful for automatically slicing out the beginning of a string or for
 * paginating ng-repeats.
 *
 * @example
 *  {{cbTestString | startFrom:2}} will output 'TestString'
 *
 *  <li ng-repeat="item in items | startFrom:10>
 *  will start the repeat at the 10th item in the list.
 *
 * @param {Array|String} input The input to start from
 * @param {Number} start The location to start from
 * @return {Array|String} The input starting from the start location
 */
angular.module('cb.filters.startFrom', [
]).filter('startFrom',
  [
  function() {
    return function(input, start) {
      if (angular.isUndefined(input)) {
        return;
      }

      if (angular.isUndefined(start) || start === null) {
        return input;
      }

      return input.slice(start);
    };
  }
]);
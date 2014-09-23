'use strict';

angular.module('cb.filters.formatNumber', [
  'cb.services.cbUtils'
]).filter('formatNumber',
  ['$filter',
  function($filter) {

    // Cache values here so we don't
    // have to redefine them upon every filter use.
    var minutesPerYear = 525600; // 24 * 365 * 60
    var minutesPerMonth = 43200; // 24 * 30 * 60
    var minutesPerWeek = 10080; // 24 * 7 * 60
    var minutesPerDay = 1440; // 24 * 60
    var minutesPerHour = 60; // DUH

    /**
     * Takes in an input and a format type.
     * @param  {String} input The string to format
     * @param  {String} type  The type of formatting to apply.
     * @return {String} The string in a formatted version.
     */
    return function(input, type) {
      if (input === undefined) {
        input = 0;
      }

      /**
       * Plurizes a given piece of text.
       * @param  {String} text           String to [maybe] pluralize
       * @param  {String} val            The value to base pluralization off of.
       * @param  {Boolean} pluralWhenZero Do we plurize if the number is zero?
       * @param  {String} delimeter      What delimeter are we using after the word?
       * @return {String}                MAYBE a pluralized string.
       */
      var pluralize = function(text, val, pluralWhenZero, delimeter) {
        if ((val === 0 && pluralWhenZero) || val > 1) {
          return $filter('number')(val) + ' ' + text + 's' + delimeter;
        } else if (val === 0) {
          return '';
        } else {
          return $filter('number')(val) + ' ' + text + delimeter;
        }
      };

      var fixedNumber;
      switch (type) {
      case 'round':
        var factor = arguments[2];
        return $filter('number')(Math.round(input / factor) * factor);

      case 'floor':
        return Math.floor(input);

        /**
         * Formats seconds from integer to string, e.g. 105083 to 105,083s
         */
      case 'seconds':
        return $filter('number')(Math.round(input)) + 's';

      case 'fixed':
        fixedNumber = angular.isDefined(arguments[2]) ?
          (typeof(arguments[2]) === 'string' && arguments[2].length === 0 ? 1 : arguments[2]) : 1;
        return input ? Number(input).toFixed(fixedNumber) : 0;

      case 'time':
        var leadingZeroes = angular.isDefined(arguments[2]) ? arguments[2] : true;
        // Round input initially to show correct input
        // So we can handle case when input is something like 59.86
        // so the output isn't 0:60
        input = Math.round(input);
        var minutes = Math.floor(input / 60);
        var seconds = Math.round(input - (minutes * 60));

        if (minutes < 10 && leadingZeroes) {
          minutes = '0' + minutes;
        }

        if (seconds < 10) {
          seconds = '0' + seconds;
        }

        return minutes + ':' + seconds;

        /**
         * Takes in a number (input) and formats it in english.
         * Note: the input should be in seconds.
         * Examples:
         * 432000 -> 5 days
         * 455500 -> 5 days, 6 hours
         */
      case 'time_en':
        // Convert to minutes
        input /= 60;

        var years = Math.floor(input / minutesPerYear);
        input -= (years * minutesPerYear);

        var months = Math.floor(input / minutesPerMonth);
        input -= (months * minutesPerMonth);

        var weeks = Math.floor(input / minutesPerWeek);
        input -= (weeks * minutesPerWeek);

        var days = Math.floor(input / minutesPerDay);
        input -= (days * minutesPerDay);

        var hours = Math.floor(input / minutesPerHour);

        return pluralize('year', years, false, ', ') +
          pluralize('month', months, years > 0, ', ') +
          pluralize('week', weeks, months > 0, ', ') +
          pluralize('day', days, weeks > 0, ', ') +
          pluralize('hour', hours, days > 0, '');

        /**
         * Takes in a number (input) and formats it in english.
         * Note: the input should be in seconds.
         * Examples:
         * 432000 -> 5 days
         * 455500 -> 5 days, 6 hours
         */
      case 'time_in_days':
        // Convert to minutes
        input /= 60;

        // Convert to days, rounding down.
        var d = Math.floor(input / minutesPerDay);
        // Remove days from total so we don't over count
        input -= (d * minutesPerDay);

        // Convert remaining time to hours
        var hrs = Math.floor(input / minutesPerHour);

        var resp = '';

        // If we have days then display
        if (d > 0) {
          resp += pluralize('day', d, true, ', ');
        }

        // If we have more than 0 hours show that
        // Otherwise we have less than hours so just
        // show minutes.
        if (hrs > 0) {
          resp += pluralize('hour', hrs, d > 0, '');
        } else {
          input = Math.round(input);
          resp += pluralize('minute', input, input > 0, '');
        }
        return resp;


        /**
         * This takes in a number (input) and formats it to end in an
         * abbreviated post-fix.
         * Examples:
         * 1000 -> 1k
         * 1500 -> 1.5k
         * 1000000 -> 1M
         * 1500000 -> 1.5M
         *
         * Additional args:
         * @param {Number} places How many decimal places to round to
         * @param {Number} start  Number of digits to abbreviate to
         * @param {boolean} fullWord Whether to show the full abbreviation text.
         *                           i.e. show 'million' instead of 'm'.
         */
      case 'number_abbrev':
        var num = input;
        var placesArg = angular.isDefined(arguments[2]) ? arguments[2] : 1;
        // 2 decimal places => 100, 3 => 1000, etc
        var places = Math.pow(10, placesArg);

        // Starting point (number of digits to abbrev)
        var start = angular.isDefined(arguments[3]) ? arguments[3] : 3;

        if (num <= Math.pow(10, start)) {
          return $filter('number')(num);
        }

        var abbreviations = {
          'short': ['K', 'M', 'b', 't'],
          'full': [' thousand', ' million', ' billion', ' trillion']
        };

        // Enumerate number abbreviations
        var abbrev = angular.isDefined(arguments[4]) && arguments[4] === true ? abbreviations['full'] : abbreviations['short'];

        // Go through the array backwards, so we do the largest first
        for (var i = abbrev.length - 1; i >= 0; i--) {
          // Convert array index to "1000", "1000000", etc
          var size = Math.pow(10, (i + 1) * 3);

          // If the number is bigger or equal do the abbreviation
          if (size <= num) {
            // Here, we multiply by places, round, and then divide by places.
            // This gives us nice rounding to a particular decimal place.
            num = Math.round(num * places / size) / places;

            // Handle special case where we round up to the next abbreviation
            if ((num === 1000) && (i < abbrev.length - 1)) {
              num = 1;
              i++;
            }

            // Handle special case when we requested 1 decimal place
            // and after rounding up we bumped to the next digit
            if (placesArg === 1 && num.toString().length === 1) {
              num += '.0';
            }

            // Add the letter for the abbreviation
            num += abbrev[i];
            // We are done... stop
            break;
          }
        }
        return num;

      case 'round_with_abbrev':
        fixedNumber = angular.isDefined(arguments[2]) ? arguments[2] : 0;
        // returns input rounded with a letter
        // i.e. 3000 => 3k, 8000000 => 8m
        if (input > 1000000) {
          return (input / 1000000).toFixed(fixedNumber) + 'm';
        } else if (input > 1000) {
          return (input / 1000).toFixed(fixedNumber) + 'k';
        }
        return input;

      case 'percent':
        // returns input as a percentage
        // i.e. .05 => 5%
        fixedNumber = angular.isDefined(arguments[2]) ? arguments[2] : 0;
        return (input * 100).toFixed(fixedNumber) + '%';

      default:
        return input;
      }
    };
  }
]);
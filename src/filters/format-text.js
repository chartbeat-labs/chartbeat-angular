'use strict';

angular.module('cb.filters.formatText', [
]).filter('formatText',
  [
  function() {
    // Used for title case.
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;

    /**
     * Takes in an input and a format type.
     * @param  {String} input The string to format
     * @param  {String} type  The type of formatting to apply.
     * @return {String} The string in a formatted version.
     */
    return function(input, type) {
      if (!angular.isDefined(input)) {
        return '';
      }

      switch (type) {
        // Removes all non-alphanumeric characters from text
        // Returns empty string for non-string entries.
        case 'alphanumeric':
          if (!angular.isString(input)){
            return '';
          } else {
            return input.replace(/[^a-zA-Z0-9]/g, '');
          }
          break;

        // Turns a string into title case.
        // Note: Title case was taken from here:
        // https://github.com/gouch/to-title-case/blob/master/to-title-case.js
        case 'title':
          return input.replace(/([^\W_]+[^\s-]*) */g, function(match, p1, index, title) {
            if (index > 0 && index + p1.length !== title.length &&
              p1.search(smallWords) > -1 && title.charAt(index - 2) !== ':' &&
              title.charAt(index - 1).search(/[^\s-]/) < 0) {
              return match.toLowerCase();
            }

            if (p1.substr(1).search(/[A-Z]|\../) > -1) {
              return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
          });

          // Takes in an array an serializes it into a comma separated list of values
          // without a trailing comma.
        case 'csv':
          if (angular.isArray(input) === false) {
            throw new TypeError('input is expected to be an array');
          }
          return input.join(', ');

          // Returns a string with the first letter of each "word" capitalized, as
          // in a name.
        case 'capitalize':
          return input
            .trim() // Trim whitespace
            .split(/\s+/) // Collapse multiple spaces to one space
            .map(function(word) {
              return word.charAt(0).toUpperCase() + word.substr(1);
            })
            .join(' ')
            .split('-') // Capitalize each name in a hyphenated name
            .map(function(word) {
              return word.charAt(0).toUpperCase() + word.substr(1);
            })
            .join('-');

          // Use this filter to ensure that there is always a text value if the text
          // is blank or null. Accepts a parameter to replace the text.
        case 'defaultValue':
          if (input === '' || input === null) {
            var fillValue = angular.isDefined(arguments[2]) ? arguments[2] : 'null';
            return fillValue;
          }
          return input;

      }
    };
  }
]);

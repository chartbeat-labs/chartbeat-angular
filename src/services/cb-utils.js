'use strict';

angular.module('cb.services.cbUtils', [
]).service('cbUtils',
  [
  function() {
    /**
     * One day in milliseconds.
     * @type {Number}
     */
    var ONE_DAY = 1000 * 60 * 60 * 24;

    /**
     * Given a JS object this will return
     * a serialized object that is suitable for use
     * when making a POST request with mime type of 'application/x-www-form-urlencoded'.
     *
     * @example
     *   Given an object like:
     *      {foo: 'bar', apple: 'sauce'}
     *   This will return:
     *     foo=bar&apple=sauce
     * @param  {Object} obj
     * @return {String}
     */
    this.serializeObject = function(obj) {
      var str = [];
      var encodeObject = function(key, value) {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      };
      angular.forEach(obj, function(value, key) {
        if (angular.isObject(value) || angular.isArray(value)) {
          angular.forEach(value, function(val) {
            encodeObject(key, val);
          });
        } else {
          encodeObject(key, value);
        }
      });
      return str.join('&');
    };

    /**
     * Capitalizes only the first letter in a string.
     * @example
     *   input: the quick brown fox ate a rock
     *   output: The quick brown fox ate a rock
     * @param  {String} str
     * @return {String}
     */
    this.capitalizeFirstLetter = function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    /**
     * Calculates how far we are from a given end date.
     *
     * Return value is a negative integer if we have passed
     * the end date.
     *
     * @param  {String} date Given in the format of "YYYY-MM-DD".
     * @return {Number}
     */
    this.calculateTimeFromDate = function(date) {
      var now = new Date();
      date = new Date(date);

      return Math.ceil((date.getTime() - now.getTime()) / ONE_DAY);
    };

    /**
     * Gets the offset of a given element, much like
     * jquery's version of $.offset().
     * @param  {HTMLElement} element The element to calculate the offset for.
     * @return {Object} Top and left of the object. (Also includes width and height)
     */
    this.getElOffset = function(element) {
      var documentElem;
      var doc = element && element.ownerDocument;
      var box = { top: 0, left: 0 };

      if (!doc) {
        return;
      }

      documentElem = doc.documentElement;

      if (typeof element.getBoundingClientRect !== undefined) {
        box = element.getBoundingClientRect();
      }

      return {
        top: box.top + (window.pageYOffset || documentElem.scrollTop) - (documentElem.clientTop || 0),
        left: box.left + (window.pageXOffset || documentElem.scrollLeft) - (documentElem.clientLeft || 0),
        width: box.width,
        height: box.height
      };
    };

    /**
     * Switches a class on an element from one to another. If there is more than
     * one instance of the fromClass, all instances will be removed and replaced
     * by only one instance of the toClass.
     * If the fromClass isn't removed, the toClass won't be added.
     *
     * @example
     *   Given an element like:
     *     <div class='foo'></div>
     *   Calling swapClass(element, 'foo', 'bar') will modify the elements classes:
     *     <div class='bar'></div>
     * @param {Node} element DOM node to swap classes on.
     * @param {string} fromClass Class to remove.
     * @param {string} toClass Class to add.
     * @return {boolean} Whether classes were switched.
     */
    this.swapClass = function(element, fromClass, toClass) {
      var classes = element.classList;

      if (classes.length === null) {
        return false;
      }

      var removed = false;
      for (var i = 0, len = classes.length; i < len; i++) {
        if (classes[i] === fromClass) {
          classes.remove(fromClass);
          removed = true;
        }
      }

      if (removed) {
        classes.add(toClass);
      }

      return removed;
    };

    /**
     * Inherit the prototype methods from one constructor into another.
     * Inspired from Google Closure.
     * @param {Function} childCtor Child class.
     * @param {Function} parentCtor Parent class.
     */
    this.inherits = function(childCtor, parentCtor) {
      // Set the prototype chain to inherit from `parent`, without calling
      // `parent`'s constructor function.
      function TempCtor() {}
      TempCtor.prototype = parentCtor.prototype;
      childCtor.prototype = new TempCtor();

      // correct the constructor pointer
      childCtor.prototype.constructor = childCtor;
    };

  }
]);
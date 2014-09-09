'use strict';

describe('Filter: startFrom', function() {
  var startFromFilter;
  var randomArray;
  var RAND_LENGTH = 20;

  beforeEach(module('cb.filters.startFrom'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($filter) {
    startFromFilter = $filter('startFrom');
  }));

  describe('A spec(setup)', function() {
    // generate a random array fixed length
    beforeEach(function() {
      randomArray = [];
      for (var i = 0; i < RAND_LENGTH; i++) {
        randomArray.push(Math.round(Math.random() * RAND_LENGTH));
      }
    });
    it('should attach an object of model to the scope', function() {
      expect(startFromFilter).toBeDefined();

      expect(typeof startFromFilter).toBe('function');
    });

    it('should create an array of random numbers of length ' + RAND_LENGTH, function() {
      expect(randomArray).toBeDefined();
      expect(Object.prototype.toString.call(randomArray)).toBe('[object Array]');
      expect(randomArray.length).toBe(RAND_LENGTH);
    });
  });

  describe('A spec', function() {
    it('should return the input if start is undefined or null', function() {
      expect(startFromFilter(randomArray, null)).toBe(randomArray);
      expect(startFromFilter(randomArray, undefined)).toBe(randomArray);
      expect(startFromFilter('foo', undefined)).toBe('foo');
    });

    it('should return the input starting at the start point', function() {
      expect(startFromFilter(randomArray, 1).length).toBe(randomArray.length - 1);
      expect(startFromFilter(randomArray, 10).length).toBe(randomArray.length - 10);
      expect(startFromFilter('foo', 2)).toBe('o');
      expect(startFromFilter('foobar', 3)).not.toBe('foobar');
    });
  });
});
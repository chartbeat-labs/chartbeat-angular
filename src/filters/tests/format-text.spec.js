'use strict';

describe('Filter: formatText', function() {
  var formatText;

  beforeEach(module('cb.filters.formatText'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($filter) {
    formatText = $filter('formatText');
  }));

  describe('A spec(setup)', function() {
    it('should attach an object of model to the scope', function() {
      expect(formatText).toBeDefined();
      expect(typeof formatText).toBe('function');
    });
  });

  it('should return an empty string on invalid input', function() {
    expect(formatText(undefined)).toEqual('');
    expect(formatText('test')).not.toEqual('');
  });

  describe('title', function() {
    it('should turn a string into title case', function() {
      expect(formatText('test', 'title')).toEqual('Test');

      expect(formatText('test', 'title')).not.toEqual('test');

      expect(formatText('a', 'title')).toEqual('A');

      expect(formatText('a b', 'title')).toEqual('A B');

      expect(formatText('this is a test', 'title')).toEqual('This Is a Test');

      expect(formatText('   this is a test   ', 'title')).toEqual('   This Is a Test   ');

      expect(formatText('this is a test', 'title')).not.toEqual('This Is A Test');

      expect(formatText('12345', 'title')).toEqual('12345');

      expect(formatText('Hello Rob-van-der-a-pool that is you', 'title')).toEqual('Hello Rob-Van-Der-a-Pool That Is You');
    });
  });

  describe('capitalize', function() {
    it('should turn a string into capitalize case', function() {
      expect(formatText('test', 'capitalize')).toEqual('Test');

      expect(formatText('test', 'capitalize')).not.toEqual('test');

      expect(formatText('a', 'capitalize')).toEqual('A');

      expect(formatText('a b', 'capitalize')).toEqual('A B');

      expect(formatText('   this is a  test   ', 'capitalize')).toEqual('This Is A Test');

      expect(formatText('this is a test', 'capitalize')).toEqual('This Is A Test');

      expect(formatText('this is a test', 'capitalize')).not.toEqual('This Is a Test');

      expect(formatText('12345', 'capitalize')).toEqual('12345');

      expect(formatText('Hello Rob-van-der-a-pool that is you', 'capitalize')).toEqual('Hello Rob-Van-Der-A-Pool That Is You');
    });
  });

  describe('csv', function() {
    it('should accept an array and return a list of comma separated values', function() {
      var testArr = ['one', 'two', 'three', 'four', 'five'];
      var f = function(a, b) {
        formatText(a, b);
      };

      expect(formatText([], 'csv')).toEqual('');

      expect(f.bind(this, {}, 'csv')).toThrow(new TypeError('input is expected to be an array'));

      expect(formatText(testArr, 'csv')).toEqual('one, two, three, four, five');

      expect(formatText(testArr, 'csv')).not.toEqual('one, two, three, four, five,');
    });
  });

});
'use strict';

describe('Filter: formatNumber', function() {
  var formatNumber;

  beforeEach(module(
    'cb.services.cbUtils',
    'cb.filters.formatNumber'
  ));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($filter) {
    formatNumber = $filter('formatNumber');
  }));

  it('should return 0 if input is undefined', function() {
    expect(formatNumber(undefined)).toEqual(0);
  });

  describe('round', function() {
    it('should add proper commas', function() {
      expect(formatNumber(1200, 'round', 1)).toEqual('1,200');
    });
  });

  describe('fixed', function() {
    it('should add proper fix decimal places', function() {
      expect(formatNumber(12000, 'fixed')).toEqual('12000.0');

      expect(formatNumber(12000, 'fixed', '')).toEqual('12000.0');

      expect(formatNumber(12000, 'fixed', 0)).toEqual('12000');
      expect(formatNumber(12000, 'fixed', '0')).toEqual('12000');

      expect(formatNumber(12000, 'fixed', 1)).toEqual('12000.0');
      expect(formatNumber(12000, 'fixed', '1')).toEqual('12000.0');

      expect(formatNumber(12000, 'fixed', 2)).toEqual('12000.00');
      expect(formatNumber(12000, 'fixed', '2')).toEqual('12000.00');
    });
  });

  describe('time', function() {
    it('should properly format time with no arguments', function() {
      expect(formatNumber(3*60, 'time')).toEqual('03:00');
      expect(formatNumber(3.5*60, 'time')).toEqual('03:30');
    });

    it('should properly format time with arguments', function() {
      expect(formatNumber(3*60, 'time', false)).toEqual('3:00');
      expect(formatNumber(3.5*60, 'time', false)).toEqual('3:30');

      expect(formatNumber(3.5*60, 'time', '')).toEqual('3:30');
    });
  });

  describe('time_en', function() {
    it('should properly format time with no arguments', function() {
      expect(formatNumber(3*60*60, 'time_en')).toEqual('3 hours');
      expect(formatNumber(3.5*60*60, 'time_en')).toEqual('3 hours');

      expect(formatNumber(12*60*60, 'time_en')).toEqual('12 hours');
      // expect(formatNumber(24*60*60, 'time_en')).toEqual('1 day'); // need to fix
    });
  });
});

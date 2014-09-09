'use strict';

describe('Service: cbUtils', function() {

  beforeEach(module('cb.services.cbUtils'));

  var cbUtils;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    cbUtils = $injector.get('cbUtils');
  }));

  describe('serializeObject', function() {
    it('should serialize an object', function() {
      expect(cbUtils.serializeObject({foo: 'bar', apple: 'sauce'})).toEqual('foo=bar&apple=sauce');
    });
  });

  describe('capitalizeFirstLetter', function() {
    it('should capitlize the first letter', function() {
      expect(cbUtils.capitalizeFirstLetter('hello bob')).toEqual('Hello bob');
    });
  });

  describe('swapClass', function() {
    it('should switch a class on an element from one to the other', function() {
      // create a new dom element
      var el = document.createElement('div');
      // make sure element was created correctly
      expect(el.classList.length).toEqual(0);

      el.classList.add('classOne');
      el.classList.add('classTwo');
      el.classList.add('classThree');
      expect(el.classList.length).toEqual(3);
      expect(el.classList[0]).toEqual('classOne');

      expect(cbUtils.swapClass(el, 'classOne', 'fooClass')).toEqual(true);
      expect(el.classList.length).toEqual(3);
      expect(el.classList[0]).not.toEqual('classOne');
      expect(el.classList[2]).toEqual('fooClass');
    });
  });

});

'use strict';

describe('Service: cbComponents', function() {

  beforeEach(module('cb.services.cbComponents'));

  var cbComponents;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    cbComponents = $injector.get('cbComponents');
  }));

});

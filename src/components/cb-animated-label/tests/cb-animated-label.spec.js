'use strict';

describe('Directive: cbAnimatedLabel', function() {
  var $scope;
  var $compile;
  var template;
  var templateName = 'cb-animated-label/cb-animated-label.html';
  var bodyEl = angular.element(document.getElementsByTagName('body')[0]);

  beforeEach(module(
    'ngAnimate',
    'cb.services.cbUtils',
    'cb.components.cbAnimatedLabel',
    templateName
  ));

  beforeEach(inject(function($rootScope, _$compile_) {
    $scope = $rootScope;
    $compile = _$compile_;
    compileDirective();
  }));

  afterEach(function() {
    // remove the template from the dom
    template.remove();
  });

  /**
   * Compiles the template and inserts it into the dom
   */
  var compileDirective = function() {
    // set the starting number to animate from
    $scope.number = 1111;
    // create a template that uses the directive
    template = angular.element('<cb-animated-label target="{{number}}">' +
      '</cb-animated-label>');
    // insert the template into body
    bodyEl.append(template);
    // compile the body to activate the directive
    $compile(bodyEl)($scope);
  };

  describe('animatedLabel', function() {
    var el;
    it('should create new dom elements when instantiated', function() {
      el = bodyEl.find('cb-animated-label');
      // there should be only one element in the template
      expect(el.length).toBe(1);

      // it should not have any children
      expect(el[0].childElementCount).toBe(0);

      // trigger digest cycle
      $scope.$digest();

      // it should have a child element element for each number
      expect(el[0].childElementCount).toBe($scope.number.toString().length);
    });

    it('should have a separate element per target digit', function() {
      var childElements = [];
      var uls = [];
      $scope.$digest();

      for (var i = 1; i <= 7; i+=2) {
        childElements.push(angular.element(el[0].childNodes[i]));
      }

      // there should be exactly one ul per digit.
      // we could create these in a loop but it is better to explicitly define
      // each test.
      expect(childElements[0].find('ul').length).toBe(1);
      expect(childElements[1].find('ul').length).toBe(1);
      expect(childElements[2].find('ul').length).toBe(1);
      expect(childElements[3].find('ul').length).toBe(1);

      angular.forEach(childElements, function(v, k) {
        uls.push(angular.element(childElements[k].find('ul')[0]));
      });

      expect(uls[0].attr('position')).toBe('1');
      expect(uls[1].attr('position')).toBe('1');
      expect(uls[2].attr('position')).toBe('1');
      expect(uls[3].attr('position')).toBe('1');
    });

    it('should update the elements on when the target changes', function() {
      var childElements = [];
      var uls = [];
      $scope.$digest();
      $scope.number = 2345;
      $scope.$digest();

      // update element references
      el = bodyEl.find('cb-animated-label');
      for (var i = 1; i <= 7; i+=2) {
        childElements.push(angular.element(el[0].childNodes[i]));
      }
      angular.forEach(childElements, function(v, k) {
        uls.push(angular.element(childElements[k].find('ul')[0]));
      });

      expect(uls[0].attr('position')).toBe('2');
      expect(uls[1].attr('position')).toBe('3');
      expect(uls[2].attr('position')).toBe('4');
      expect(uls[3].attr('position')).toBe('5');
    });

  });
});
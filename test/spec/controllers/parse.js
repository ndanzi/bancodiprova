'use strict';

describe('Controller: ParseCtrl', function () {

  // load the controller's module
  beforeEach(module('provaApp'));

  var ParseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParseCtrl = $controller('ParseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ParseCtrl.awesomeThings.length).toBe(3);
  });
});

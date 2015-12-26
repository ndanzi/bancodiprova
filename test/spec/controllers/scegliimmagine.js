'use strict';

describe('Controller: ScegliimmaginectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('provaApp'));

  var ScegliimmaginectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScegliimmaginectrlCtrl = $controller('ScegliimmaginectrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

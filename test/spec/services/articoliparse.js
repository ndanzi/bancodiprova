'use strict';

describe('Service: articoliParse', function () {

  // load the service's module
  beforeEach(module('provaApp'));

  // instantiate service
  var articoliParse;
  beforeEach(inject(function (_articoliParse_) {
    articoliParse = _articoliParse_;
  }));

  it('should do something', function () {
    expect(!!articoliParse).toBe(true);
  });

});

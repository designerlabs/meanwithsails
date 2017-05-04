'use strict';

describe('Service: sharedService', function () {

  // load the service's module
  beforeEach(module('yogoApp'));

  // instantiate service
  var sharedService;
  beforeEach(inject(function (_sharedService_) {
    sharedService = _sharedService_;
  }));

  it('should do something', function () {
    expect(!!sharedService).toBe(true);
  });

});

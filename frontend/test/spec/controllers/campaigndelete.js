'use strict';

describe('Controller: CampaigndeleteCtrl', function () {

  // load the controller's module
  beforeEach(module('yogoApp'));

  var CampaigndeleteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CampaigndeleteCtrl = $controller('CampaigndeleteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CampaigndeleteCtrl.awesomeThings.length).toBe(3);
  });
});

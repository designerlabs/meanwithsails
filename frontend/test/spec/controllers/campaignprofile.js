'use strict';

describe('Controller: CampaignprofileCtrl', function () {

  // load the controller's module
  beforeEach(module('yogoApp'));

  var CampaignprofileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CampaignprofileCtrl = $controller('CampaignprofileCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CampaignprofileCtrl.awesomeThings.length).toBe(3);
  });
});

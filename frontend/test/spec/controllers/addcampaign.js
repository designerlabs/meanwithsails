'use strict';

describe('Controller: AddcampaignCtrl', function () {

  // load the controller's module
  beforeEach(module('yogoApp'));

  var AddcampaignCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddcampaignCtrl = $controller('AddcampaignCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddcampaignCtrl.awesomeThings.length).toBe(3);
  });
});

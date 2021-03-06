'use strict';

describe('Service: dataSvc', function () {
  // load the controller's module
  beforeEach(module('mdmApp'));

  var dataSvc,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    dataSvc = $injector.get('dataSvc');
  }));

  it('should convert a v1 collection to v2 format', function () {
    var v1Collection = [
      {'id': 1, 'cards': 1, 'dice': 2},
      {'id': 2, 'cards': 1, 'dice': 2},
      {'id': 3, 'cards': 1, 'dice': 2},
      {'id': 4, 'cards': 1, 'dice': 2},
      {'id': 5, 'cards': 1, 'dice': 2},
      {'id': 6, 'cards': 1, 'dice': 2},
      {'id': 7, 'cards': 1, 'dice': 0},
      {'id': 8, 'cards': 1, 'dice': 0},
      {'id': 9, 'cards': 1, 'dice': 0},
      {'id': 10, 'cards': 1, 'dice': 0},
      {'id': 11, 'cards': 1, 'dice': 0},
      {'id': 12, 'cards': 1, 'dice': 0},
      {'id': 13, 'cards': 1, 'dice': 0},
      {'id': 14, 'cards': 1, 'dice': 0},
      {'id': 15, 'cards': 1, 'dice': 0},
      {'id': 16, 'cards': 1, 'dice': 0},
      {'id': 17, 'cards': 1, 'dice': 0},
      {'id': 18, 'cards': 1, 'dice': 0},
      {'id': 19, 'cards': 1, 'dice': 0},
      {'id': 20, 'cards': 1, 'dice': 0},
      {'id': 21, 'cards': 1, 'dice': 0},
      {'id': 22, 'cards': 1, 'dice': 0},
      {'id': 23, 'cards': 1, 'dice': 0},
      {'id': 24, 'cards': 1, 'dice': 0},
      {'id': 25, 'cards': 1, 'dice': 0},
      {'id': 26, 'cards': 1, 'dice': 0},
      {'id': 27, 'cards': 1, 'dice': 0},
      {'id': 28, 'cards': 1, 'dice': 0},
      {'id': 29, 'cards': 1, 'dice': 0},
      {'id': 30, 'cards': 1, 'dice': 0},
      {'id': 31, 'cards': 1, 'dice': 0},
      {'id': 32, 'cards': 1, 'dice': 0},
      {'id': 33, 'cards': 1, 'dice': 0},
      {'id': 34, 'cards': 1, 'dice': 0},
      {'id': 35, 'cards': 0, 'dice': 0},
      {'id': 36, 'cards': 0, 'dice': 0},
      {'id': 37, 'cards': 0, 'dice': 0},
      {'id': 38, 'cards': 0, 'dice': 0},
      {'id': 39, 'cards': 0, 'dice': 0},
      {'id': 40, 'cards': 0, 'dice': 0},
      {'id': 41, 'cards': 0, 'dice': 0},
      {'id': 42, 'cards': 0, 'dice': 0},
      {'id': 43, 'cards': 0, 'dice': 0},
      {'id': 44, 'cards': 0, 'dice': 0},
      {'id': 45, 'cards': 0, 'dice': 0},
      {'id': 46, 'cards': 0, 'dice': 0},
      {'id': 47, 'cards': 0, 'dice': 0},
      {'id': 48, 'cards': 0, 'dice': 0},
      {'id': 49, 'cards': 0, 'dice': 0},
      {'id': 50, 'cards': 0, 'dice': 0},
      {'id': 51, 'cards': 0, 'dice': 0},
      {'id': 52, 'cards': 0, 'dice': 0},
      {'id': 53, 'cards': 0, 'dice': 0},
      {'id': 54, 'cards': 0, 'dice': 0},
      {'id': 55, 'cards': 0, 'dice': 0},
      {'id': 56, 'cards': 0, 'dice': 0},
      {'id': 57, 'cards': 0, 'dice': 0},
      {'id': 58, 'cards': 0, 'dice': 0},
      {'id': 59, 'cards': 0, 'dice': 0},
      {'id': 60, 'cards': 0, 'dice': 0},
      {'id': 61, 'cards': 0, 'dice': 0},
      {'id': 62, 'cards': 0, 'dice': 0},
      {'id': 63, 'cards': 0, 'dice': 0},
      {'id': 64, 'cards': 0, 'dice': 0},
      {'id': 65, 'cards': 0, 'dice': 0},
      {'id': 66, 'cards': 0, 'dice': 0},
      {'id': 67, 'cards': 0, 'dice': 0},
      {'id': 68, 'cards': 0, 'dice': 0},
      {'id': 69, 'cards': 0, 'dice': 0},
      {'id': 70, 'cards': 0, 'dice': 0},
      {'id': 71, 'cards': 0, 'dice': 0},
      {'id': 72, 'cards': 0, 'dice': 0},
      {'id': 73, 'cards': 0, 'dice': 0},
      {'id': 74, 'cards': 0, 'dice': 0},
      {'id': 75, 'cards': 0, 'dice': 0},
      {'id': 76, 'cards': 0, 'dice': 0},
      {'id': 77, 'cards': 0, 'dice': 0},
      {'id': 78, 'cards': 0, 'dice': 0},
      {'id': 79, 'cards': 0, 'dice': 0},
      {'id': 80, 'cards': 0, 'dice': 0},
      {'id': 81, 'cards': 0, 'dice': 0},
      {'id': 82, 'cards': 0, 'dice': 0},
      {'id': 83, 'cards': 0, 'dice': 0},
      {'id': 84, 'cards': 0, 'dice': 0},
      {'id': 85, 'cards': 0, 'dice': 0},
      {'id': 86, 'cards': 0, 'dice': 0},
      {'id': 87, 'cards': 0, 'dice': 0},
      {'id': 88, 'cards': 0, 'dice': 0},
      {'id': 89, 'cards': 0, 'dice': 0},
      {'id': 90, 'cards': 0, 'dice': 0},
      {'id': 91, 'cards': 0, 'dice': 0},
      {'id': 92, 'cards': 0, 'dice': 0},
      {'id': 93, 'cards': 0, 'dice': 0},
      {'id': 94, 'cards': 0, 'dice': 0},
      {'id': 95, 'cards': 0, 'dice': 0},
      {'id': 96, 'cards': 0, 'dice': 0},
      {'id': 97, 'cards': 0, 'dice': 0},
      {'id': 98, 'cards': 0, 'dice': 0},
      {'id': 99, 'cards': 0, 'dice': 0},
      {'id': 100, 'cards': 0, 'dice': 0},
      {'id': 101, 'cards': 0, 'dice': 0},
      {'id': 102, 'cards': 0, 'dice': 0},
      {'id': 103, 'cards': 0, 'dice': 0},
      {'id': 104, 'cards': 0, 'dice': 0},
      {'id': 105, 'cards': 0, 'dice': 0},
      {'id': 106, 'cards': 0, 'dice': 0},
      {'id': 107, 'cards': 0, 'dice': 0},
      {'id': 108, 'cards': 0, 'dice': 0},
      {'id': 109, 'cards': 0, 'dice': 0},
      {'id': 110, 'cards': 0, 'dice': 0},
      {'id': 111, 'cards': 0, 'dice': 0},
      {'id': 112, 'cards': 0, 'dice': 0},
      {'id': 113, 'cards': 0, 'dice': 0},
      {'id': 114, 'cards': 0, 'dice': 0},
      {'id': 115, 'cards': 0, 'dice': 0},
      {'id': 116, 'cards': 0, 'dice': 0},
      {'id': 117, 'cards': 0, 'dice': 0},
      {'id': 118, 'cards': 0, 'dice': 0},
      {'id': 119, 'cards': 0, 'dice': 0},
      {'id': 120, 'cards': 0, 'dice': 0},
      {'id': 121, 'cards': 0, 'dice': 0},
      {'id': 122, 'cards': 0, 'dice': 0},
      {'id': 123, 'cards': 0, 'dice': 0},
      {'id': 124, 'cards': 0, 'dice': 0},
      {'id': 125, 'cards': 0, 'dice': 0},
      {'id': 126, 'cards': 0, 'dice': 0},
      {'id': 127, 'cards': 0, 'dice': 0},
      {'id': 128, 'cards': 0, 'dice': 0},
      {'id': 129, 'cards': 0, 'dice': 0},
      {'id': 130, 'cards': 0, 'dice': 0},
      {'id': 131, 'cards': 0, 'dice': 1},
      {'id': 132, 'cards': 0, 'dice': 0}
    ];

    var v2Collection = {
      name: 'My Collection',
      version: 2,
      cards: [
        {'id': 1, 'count': 1},
        {'id': 2, 'count': 1},
        {'id': 3, 'count': 1},
        {'id': 4, 'count': 1},
        {'id': 5, 'count': 1},
        {'id': 6, 'count': 1},
        {'id': 7, 'count': 1},
        {'id': 8, 'count': 1},
        {'id': 9, 'count': 1},
        {'id': 10, 'count': 1},
        {'id': 11, 'count': 1},
        {'id': 12, 'count': 1},
        {'id': 13, 'count': 1},
        {'id': 14, 'count': 1},
        {'id': 15, 'count': 1},
        {'id': 16, 'count': 1},
        {'id': 17, 'count': 1},
        {'id': 18, 'count': 1},
        {'id': 19, 'count': 1},
        {'id': 20, 'count': 1},
        {'id': 21, 'count': 1},
        {'id': 22, 'count': 1},
        {'id': 23, 'count': 1},
        {'id': 24, 'count': 1},
        {'id': 25, 'count': 1},
        {'id': 26, 'count': 1},
        {'id': 27, 'count': 1},
        {'id': 28, 'count': 1},
        {'id': 29, 'count': 1},
        {'id': 30, 'count': 1},
        {'id': 31, 'count': 1},
        {'id': 32, 'count': 1},
        {'id': 33, 'count': 1},
        {'id': 34, 'count': 1}
      ],
      dice: [
        {'id': 1, 'count': 2},
        {'id': 2, 'count': 2},
        {'id': 24, 'count': 1}
      ],
      slug: 'My-Collection'
    };

    var updatedCollection = dataSvc._updateTeam(v1Collection);

    expect(updatedCollection).toEqual(v2Collection);
  });
});

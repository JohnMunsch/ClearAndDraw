angular.module('mdmApp')
  .controller('MainCtrl', function ($scope, dataSvc) {
    'use strict';

    // Parts of the filter.
    $scope.cardOwned = dataSvc.cardOwned;
    $scope.cardUnowned = dataSvc.cardUnowned;

    $scope.filters = dataSvc.filters;
    $scope.sets = dataSvc.sets;
    $scope.affiliations = dataSvc.affiliations;
    $scope.types = dataSvc.types;
    $scope.costs = dataSvc.costs;
    $scope.rarities = dataSvc.rarities;
    $scope.dieLimits = dataSvc.dieLimits;

    // Passed through service functions.
    $scope.selectAll = dataSvc.selectAll;
    $scope.selectNone = dataSvc.selectNone;
    $scope.invertSelection = dataSvc.invertSelection;

    $scope.addCardToSelected = dataSvc.addCardToSelected;
    $scope.removeCardFromSelected = dataSvc.removeCardFromSelected;

    $scope.addDieToSelected = dataSvc.addDieToSelected;
    $scope.removeDieFromSelected = dataSvc.removeDieFromSelected;

    $scope.allCards = dataSvc.allCards;
    $scope.myCollection = dataSvc.myCollection;
  	$scope.filteredCards = dataSvc.filteredCards;

    $scope.numCards = dataSvc.numCards;
    $scope.numDice = dataSvc.numDice;

    $scope.setName = dataSvc.setName;
  });

angular.module('mdmApp')
  .controller('CardCtrl', function ($scope, $routeParams, dataSvc) {
    'use strict';

    $scope.card = dataSvc.findCardBySlug($routeParams.slug);
    $scope.die = dataSvc.findDieById($scope.card.dieId);

    $scope.myCollection = dataSvc.myCollection;

    $scope.numCards = dataSvc.numCards;
    $scope.numDice = dataSvc.numDice;

    $scope.addCardToTeam = dataSvc.addCardToTeam;
    $scope.removeCardFromTeam = dataSvc.removeCardFromTeam;

    $scope.addDieToTeam = dataSvc.addDieToTeam;
    $scope.removeDieFromTeam = dataSvc.removeDieFromTeam;
  });

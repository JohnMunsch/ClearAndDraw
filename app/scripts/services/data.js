angular.module('mdmApp')
    .service('dataSvc', function ($log, $localStorage) {
      $localStorage.$default({
        myCollection: { name: 'My Collection', version: 2, cards: [ ], dice: [ ], slug: 'My-Collection' }
      });

      var dataSvc = this;

      var myCollection = $localStorage.myCollection;

      this.filters = {
        sets: _.pluck(_.uniq(dicemastersCardData, 'setAbbr'), 'setAbbr'),
        affiliations: _.pluck(_.uniq(dicemastersCardData, 'affiliation'), 'affiliation'),
        costs: _.sortBy(_.pluck(_.uniq(dicemastersCardData, 'cost'), 'cost')),
        types: _.sortBy(_.pluck(_.uniq(dicemastersCardData, 'type'), 'type')),
        rarities: _.pluck(_.uniq(dicemastersCardData, 'rarity'), 'rarity'),
        dieLimits: _.sortBy(_.pluck(_.uniq(dicemastersCardData, 'dieLimit'), 'dieLimit'))
      };

      // These are the various filters the user may set which effect the filtering that filteredCards() does.
      this.cardOwned = false;
      this.cardUnowned = false;
      this.sets = [ ];
      this.affiliations = [ ];
      this.costs = [ ];
      this.types = [ ];
      this.rarities = [ ];
      this.dieLimits = [ ];

      // Expose the complete list of cards to consumers of the service.
      this.allCards = updateCardList(dicemastersCardData);

      // Expose the special team that represents my collection of cards and dice.
      this.myCollection = updateTeam(myCollection);

      // If we updated the collection, make sure that's the version we're keeping for the future.
      $localStorage.myCollection = this.myCollection;

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //                                                                                       Manipulate Selected Cards
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      this.selectAll = function (cardList) {
        _.each(cardList, function (card) {
          card.selected = true;
        });
      };

      this.selectNone = function (cardList) {
        _.each(cardList, function (card) {
          card.selected = false;
        });
      };

      this.invertSelection = function (cardList) {
        _.each(cardList, function (card) {
          card.selected = !card.selected;
        })
      };

      this.addCardToSelected = function (cardList, team) {
        _.each(selectedCards(cardList), function (card) {
          dataSvc.addCardToTeam(card.id, team);
        });
      };

      this.removeCardFromSelected = function (cardList, team) {
        _.each(selectedCards(cardList), function (card) {
          dataSvc.removeCardFromTeam(card.id, team);
        });
      };

      this.addDieToSelected = function (cardList, team) {
        // Get a list of all the unique dice represented by the selected cards. Find them within the team (or add
        // records if needed) and increment the count.
        _.each(_.uniq(_.pluck(selectedCards(cardList), 'dieId')), function (dieId) {
          dataSvc.addDieToTeam(dieId, team);
        });
      };

      this.removeDieFromSelected = function (cardList, team) {
        // Get a list of all the unique dice represented by the selected cards. Find them within the team (or add
        // records if needed) and decrement the count.
        _.each(_.uniq(_.pluck(selectedCards(cardList), 'dieId')), function (dieId) {
          dataSvc.removeDieFromTeam(dieId, team);
        });
      };

      this.addCardToTeam = function (cardId, team) {
        // Find the team record for this card (or add one if needed) and increment its count.
        var teamCard = _.find(team.cards, { id: cardId });

        if (teamCard) {
          teamCard.count++;
        } else {
          team.cards.push({ id: cardId, count: 1 });
        }
      };

      this.removeCardFromTeam = function (cardId, team) {
        // Find the team record for this card (or add one if needed) and decrement its count.
        var teamCard = _.find(team.cards, { id: cardId });

        if (teamCard) {
          if (teamCard.count > 0) {
            teamCard.count--;
          }
        } else {
          team.cards.push({ id: cardId, count: 0 });
        }
      };

      this.addDieToTeam = function (dieId, team) {
        // Find the team record for this die (if any).
        var teamDie = _.find(team.dice, { id: dieId });

        // If we did find a record, increment it, otherwise add a new record and give it an initial value (already
        // incremented.
        if (teamDie) {
          teamDie.count++;
        } else {
          team.dice.push({ id: dieId, count: 1 });
        }
      };

      this.removeDieFromTeam = function (dieId, team) {
        // Find the team record for this die (if any).
        var teamDie = _.find(team.dice, { id: dieId });

        if (teamDie) {
          if (teamDie.count > 0) {
            teamDie.count--;
          }
        } else {
          team.dice.push({ id: dieId, count: 0 });
        }
      };

      function selectedCards(cardList) {
        return _.filter(cardList, { selected: true });
      }

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //                                                                                   Get Card Data (Based On Team)
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      this.numCards = function(cardId, team) {
        var teamCardRecord = _.find(team.cards, { id: cardId });

        if (teamCardRecord) {
          return teamCardRecord.count;
        } else {
          return 0;
        }
      };

      this.numDice = function (cardId, team) {
        var teamCardRecord = _.find(dataSvc.allCards, { id: cardId });

        if (teamCardRecord) {
          var teamDiceRecord = _.find(team.dice, { id: teamCardRecord.dieId });

          if (teamDiceRecord) {
            return teamDiceRecord.count;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      };

      this.filteredCards = function (cardList, team) {
        var setsList = _.compact(this.sets);
        var affiliationsList = _.compact(this.affiliations);
        var costsList = _.compact(_.map(this.costs, function (cost) { return parseInt(cost); }));
        var typesList = _.compact(this.types);
        var raritiesList = _.compact(this.rarities);
        var dieLimitsList = _.compact(_.map(this.dieLimits, function (dieLimit) { return parseInt(dieLimit); }));

        return _.filter(cardList, function (card) {
          if (setsList.length > 0) {
            if (!_.contains(setsList, card.setAbbr)) {
              return false;
            }
          }

          // If an affiliation is selected, see if the affiliate for this card matches any of the selected affiliates.
          if (affiliationsList.length > 0) {
            if (!_.contains(affiliationsList, card.affiliation)) {
              return false;
            }
          }

          // If a cost is selected, see if the cost for this card matches any of the selected costs.
          if (costsList.length > 0) {
            if (!_.contains(costsList, card.cost)) {
              return false;
            }
          }

          // If a type is selected, see if the type for this card matches any of the selected types.
          if (typesList.length > 0) {
            if (!_.contains(typesList, card.type)) {
              return false;
            }
          }

          // If a rarity is selected, see if the rarity for this card matches any of the selected rarities.
          if (raritiesList.length > 0) {
            if (!_.contains(raritiesList, card.rarity)) {
              return false;
            }
          }

          // If a dieLimit is selected, see if the dieLimit for this card matches any of the selected dieLimits.
          if (dieLimitsList.length > 0) {
            if (!_.contains(dieLimitsList, card.dieLimit)) {
              return false;
            }
          }

          // If they want both owned and unowned cards, that's all cards. We don't even have to do a test. If they don't
          // care about either, again, that's all cards.
          if ((this.cardOwned || this.cardUnowned) && !(this.cardOwned && this.cardUnowned)) {
            // Not having any cards when they want owned ones fails the card in question (at least for this team or
            // collection.
            if (this.cardOwned && this.numCards(card.id, team) === 0) {
              return false;
            }

            // Also, wanting only unowned cards and finding they have one or more excludes this card.
            if (this.cardUnowned && this.numCards(card.id, team) > 0) {
              return false;
            }
          }

          return true;
        }, this);
      };

      this.findCardBySlug = function (slug) {
        return (_.find(this.allCards, { slug: slug }));
      };

      this.findDieById = function (dieId, setAbbr) {
        return (_.find(dicemastersDieData, { id: dieId, setAbbr: setAbbr }));
      };

      this.setName = function (setAbbreviation) {
        switch (setAbbreviation) {
          case 'AVX':
            return 'Avengers vs. X-Men';
          case 'UX':
            return 'Uncanny X-Men';
          default:
            return 'Unknown';
        }
      };

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //                                                                                                         Helpers
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /**
       * Make sure that the user's collection has a count of cards and dice owned for every card available. Since new
       * cards/dice will be released over time, this collection should update automatically when new ones become
       * available.
       *
       * @param team
       */
      function updateTeam(team) {
        if (team.version === undefined) {
          // Upgrade the collection from version 1 to version 2.
          var newTeam = { name: 'My Collection', version: 2, cards: [ ], dice: [ ], slug: 'My-Collection' };

          // Add a record to the dice array for every card for which they said they own dice.
          var cardsWithDice = _.filter(team, function (card) {
            return (card.dice > 0);
          });
          var dieList = _.groupBy(cardsWithDice, function (card) {
            return _.find(dataSvc.allCards, { id: card.id }).dieId;
          });
          newTeam.dice = _.map(dieList, function (cardList, dieId) {
            return ({ id: parseInt(dieId, 10), count: _.max(_.pluck(cardList, 'dice')) });
          });

          // Add a record to the cards array for every card they said they owned before.
          _.each(team, function (card) {
            if (card.cards > 0) {
              newTeam.cards.push({ id : card.id, count: card.cards });
            }
          });

          return newTeam;
        }

        return team;
      }

      function updateCardList(cardList) {
        _.each(cardList, function (card) {
          // Generate a URL friendly slug and add it to the card.
          card.slug = generateSlug(card);
        }, this);

        return cardList;
      }

      function generateSlug(card) {
        var sluggedName = card.name.replace(/\s/g, '-').replace(/[^A-Za-z0-9\-]/g, '');
        var sluggedSubtitle = card.subtitle.replace(/\s/g, '-').replace(/[^A-Za-z0-9\-]/g, '');

        return (sluggedName + '-' + sluggedSubtitle);
      }

      // Expose the function externally for testing.
      this._updateTeam = updateTeam;
    });

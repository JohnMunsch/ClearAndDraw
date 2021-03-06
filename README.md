# ClearAndDraw README

[![Code Climate](https://codeclimate.com/github/JohnMunsch/ClearAndDraw/badges/gpa.svg)](https://codeclimate.com/github/JohnMunsch/ClearAndDraw) [![Test Coverage](https://codeclimate.com/github/JohnMunsch/ClearAndDraw/badges/coverage.svg)](https://codeclimate.com/github/JohnMunsch/ClearAndDraw)

## Introduction

ClearAndDraw is a little AngularJS application I whipped up in a few evenings because I happen to like the card and dice game _Marvel Dicemasters: Avengers vs. X-Men_. As you enter in information about the cards and dice you have, it saves it in the browser's localStorage.

It needs a ton more features to be useful, including a central server to which you could save your catalog of info and the ability to create teams of cards and dice for play. But even without that it can prove an interesting example JavaScript or AngularJS project from which you can learn or even lift some code.

## Installation

You don't really have to "install" anything to look at or use the code. But if you want to see it run locally or run the unit tests you'll need to do a few things. First off, make sure you've installed [Node.js](http://nodejs.org) so you can run the Node Package Manager (npm). Then make sure you've installed both Grunt and Bower. I'm not going to tell you how to do all of that, but instead I'll just direct you to the [Yeoman project](http://yeoman.io) where they tell you about installing all of these great JavaScript tools. Fortunately, npm makes it all pretty darn easy and installing Node.js is easy too.

With all the software you need installed, you can run a couple of commands in the root of the airquotes project to get installed what you need to run or test it locally:

`bower install`

`npm install`

## Running

Then use Grunt to run a server and launch the web page in a browser where you can explore the working UI:

`grunt serve`

## Testing

Or run the unit tests with:

`grunt test`

Look for the code coverage reports as index.html files under the "coverage" directory; there will be one for each browser under which the tests were run.

## To-Do List

* Re-layout of the card page
* Get a list of all teams
* Create a new named team
* Edit/view a team
* Add a mailing list signup (for release news)
* Print collection or teams
* Evaluate teams as they are built for conformance to tournament rules (# of cards, # of dice, dice less than max for card, cards must be different names, basic action cards)
* Save collection and teams to the cloud
* Support buying, selling, and trading
* Promote the site on Reddit
* Support drafting
* API access
* Share your teams for review and commentary
* Collect links for the site
* Take a picture for the site
* Add tags to the cards
* Filter based on tags (for example, show me only cards with global effects or those which do direct damage)
* Add triggers as tags to the cards (for example, [trigger - when damaged] or [trigger - when fielded])

"use strict";

import {addCoins, addJoy, addCJ, next, setActive, adopt} from './encounterFuncs'
import {chooseWeighted, check, randInt} from 'utils'

function Encounter(mainText, choices, weight, requirementCheck) {
  this.mainText = mainText;
  this.choices = choices;
  this.weight = weight;
  this.requirementCheck = requirementCheck;
  this.generateMainText = function (state) {
    if (typeof this.mainText === 'function') {
      return this.mainText(state);
    } else {
      return this.mainText;
    }
  }
  this.generateMainText = function (state) {
    if (typeof this.mainText === 'function') {
      return this.mainText(state);
    } else {
      return this.mainText;
    }
  };
}

function Choice(choiceText, outcomes) {
  this.choiceText = choiceText;
  this.outcomes = outcomes;
}

function Outcome(result, text, weight) {
  this.result = result;
  this.text = text;
  this.weight = weight;
  this.generateResultText = function (state) {
    if (typeof this.text === 'function') {
      return this.text(state);
    } else {
      return this.text;
    }
  };
}

function Companion(name, species, str, spd, cha) {
  this.name = name;
  this.species = species;
  this.str = str;
  this.spd = spd;
  this.cha = cha;
}

var stockCompanions = [
  new Companion("Tori", "chirling", randInt(10), randInt(10), randInt(10)),
  new Companion("Wulfo", "arko", randInt(10), randInt(10), randInt(10)),
  new Companion("Golp", "gorbin", randInt(10), randInt(10), randInt(10)),
];

var encounters = {
  start: new Encounter("Choose your companion!",
    (() => {
      let compChoices = [];
      for (let i = 0; i < stockCompanions.length; i++) {
        compChoices.push(
          new Choice(stockCompanions[i].name + " the " + stockCompanions[i].species, [
            new Outcome(adopt(stockCompanions[i]), stockCompanions[i].name + " joins you on your journey."),
          ])
        )
      }
      return compChoices;
    })()
  ),
  findCoins: new Encounter("You found some coins!",
    [
      new Choice("Money!", [
        new Outcome(addCoins(10), "You carefully put the coins into your bag."),
      ]),
    ],
    3
  ),
  singAlong: new Encounter((state) => {
          return "A chirling sings in the distance. " + state.activeCompanion.name + " wants to sing along."
        },
    [
      new Choice("Sure!", [
        new Outcome(addJoy(5), "They make beautiful music together."),
      ]),
    ],
    1,
    (state) => {
      return state.activeCompanion.species !== "chirling";
    }
  ),
  boxi: new Encounter((state) => {
          return "You hear a snarling, suddenly a loxi appears! \"Hey, I'm Boxi the loxi! Mind if I join you?\""
        },
    [
      new Choice("Sure!", [
        new Outcome(adopt(new Companion("Boxi", "loxi", randInt(10), randInt(10), randInt(10))), "Boxi joins your party."),
      ]),
      new Choice("Sorry Boxi...", [
        new Outcome(addJoy(1), "Boxi smiles. \"It was nice meeting you! Good luck on your journey!\""),
      ]),
    ],
  ),
  fountain: new Encounter((state) => {
          return "You find a beautiful fountain. " + state.activeCompanion.name + " wants to throw in a coin."
        },
    [
      new Choice("Sure!", [
        new Outcome(addCJ(-1, 10),(state) => {
          return "You toss a coin into the fountain. " + state.activeCompanion.name + " looks very happy.";
        }),
      ]),
      new Choice("Sorry...", [
        new Outcome(addJoy(-10),(state) => {
          return state.activeCompanion.name + " looks at you sadly.";
        }),
      ]),
    ]
  ),
  end: new Encounter("You've completed your journey!", []
  ),
}

var randomEncounters = [encounters.boxi, encounters.findCoins, encounters.fountain, encounters.singAlong];

export {encounters, randomEncounters, Companion};
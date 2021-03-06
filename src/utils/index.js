import moment from 'moment';

// Return a random integer from min (inclusive) to max (inclusive)
export function randomInt(max, min) {
  min = min || 0;
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

export function randomSeed() {
  return Math.floor(Math.random() * 10000000000);
}

export function randomChoice(choices) {
  return choices[randomInt(choices.length - 1)];
}

export function chooseWeighted(options) {
  let total = 0;
  for (let i = 0; i < options.length; i++) {
    total += options[i].weight || 1;
  }
  let target = Math.floor((Math.random() * total) + 1);
  let index = 0;
  target -= options[0].weight || 1;
  while (target > 0) {
    index += 1;
    target -= options[index].weight || 1;
  }
  return options[index].value || options[index];
}

export function canonize(name) {
  name = name.replace(/(\s|\W)+/, '_');
  return name.toLowerCase();
}

export function isSameDay(date, otherDate) {
  return date.getFullYear() === otherDate.getFullYear() &&
    date.getMonth() === otherDate.getMonth() &&
    date.getDate() === otherDate.getDate();
}

// Get unix time in seconds rather than milliseconds.
export function getUnixTime(date) {
  date = date || new Date();
  return Math.floor(date.getTime() / 1000);
}

export function plainDate(time) {
  time = moment(time);
  return `${time.format('MMM DD, Y')} SMT`;
}

export function datetime(time) {
  time = moment(time);
  return `${time.format('MMM DD, Y hh:mm A')} SMT`;
}

export function expandedRelativeTime(time) {
  time = moment(time);
  return `${datetime(time)} (${time.fromNow()})`;
}

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export function formatNumber(n) {
  return n.toLocaleString('en-US');
}

// http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
export function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function startsWithVowel(string) {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(string.toLowerCase()) === 0;
}

export function addArticle(singularNoun) {
  if (startsWithVowel(singularNoun)) {
    return `an ${singularNoun}`;
  }
  return `a ${singularNoun}`;
}

export function pluralize(count, singularNoun, pluralNoun) {
  if (!pluralNoun) {
    pluralNoun = `${singularNoun}s`;
  }
  if (count === 1) {
    return `${formatNumber(count)} ${singularNoun}`;
  }
  return `${formatNumber(count)} ${pluralNoun}`;
}

export function sRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// max exclusive, optional min inclusive
export function sRandomInt(seed, max, min) {
  seed = seed || randomSeed();
  min = min || 0;
  return min + Math.floor(sRandom(seed) * (max - min));
}

export function seedShuffle(seed, arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = sRandomInt(seed + i, i + 1);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export function seedChoiceMany(seed, choices, num) {
  choices = seedShuffle(seed, Object.assign([], choices));
  return choices.splice(0, num);
}

export function seedChoice(seed, choices) {
  return choices[sRandomInt(seed, choices.length)];
}

export function seedChoiceWeighted(seed, options) {
  let total = 0;
  for (let i = 0; i < options.length; i++) {
    total += options[i].weight || 1;
  }
  let target = sRandomInt(seed, total + 1);
  let index = 0;
  target -= options[0].weight || 1;
  while (target > 0) {
    index += 1;
    target -= options[index].weight || 1;
  }
  return options[index].value || options[index];
}

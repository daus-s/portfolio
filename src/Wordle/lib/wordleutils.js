function letterValuePair(string, index) {
  if (
    typeof string !== "string" ||
    (typeof index === number && !isNaN(index) && index % 1 === 0)
  ) {
    const message =
      "function letterValuePair requires a string and an int\n" +
      (typeof string !== "string"
        ? `string expected \'String\', got ${typeof string}`
        : "") +
      (typeof index === number && !isNaN(index) && index % 1 === 0
        ? `index expected \'Int\', got ${typeof string} (or number doesn't match)`
        : "");
    throw new Error(message);
  }
  if (string.length <= index + 5) {
    throw new Error("string not long enough");
  }

  return [string.charAt(index), string.charAt(index + 5)];
}

async function words() {
  const file = await fetch(
    "https://raw.githubusercontent.com/daus-s/wordle/main/sgb-words.txt"
  );
  const wordlist = [];
  for (const line of (await file.text()).split("\n")) {
    if (line.length === 5) {
      wordlist.push(line);
    }
  }
  return wordlist;
}

async function accepted() {
  const file = await fetch(
    "https://raw.githubusercontent.com/daus-s/wordle/main/all-words.txt"
  );
  const wordlist = [];
  for (const line of (await file.text()).split("\n")) {
    if (line.length === 5) {
      wordlist.push(line);
    }
  }
  return wordlist;
}

function calculateRemaining(word, value, words) {
  if (
    !Array.isArray(words) ||
    typeof word !== "string" ||
    typeof value !== "string"
  ) {
    throw new Error("calculateRemaining needs these conditions");
  }

  const allowed = [alphaset(), alphaset(), alphaset(), alphaset(), alphaset()];
  for (let i = 0; i < 5; ++i) {
    if (value[i] === "g") {
      allowed[i] = new Set([word[i]]);
    }
    if (value[i] === "b") {
      allowed[i].delete(word[i]);
    }
    if (value[i] === "y") {
      allowed[i].delete(word[i]);
    }
  }
  const freqs = {
    a: { min: 0, max: 5 },
    b: { min: 0, max: 5 },
    c: { min: 0, max: 5 },
    d: { min: 0, max: 5 },
    e: { min: 0, max: 5 },
    f: { min: 0, max: 5 },
    g: { min: 0, max: 5 },
    h: { min: 0, max: 5 },
    i: { min: 0, max: 5 },
    j: { min: 0, max: 5 },
    k: { min: 0, max: 5 },
    l: { min: 0, max: 5 },
    m: { min: 0, max: 5 },
    n: { min: 0, max: 5 },
    o: { min: 0, max: 5 },
    p: { min: 0, max: 5 },
    q: { min: 0, max: 5 },
    r: { min: 0, max: 5 },
    s: { min: 0, max: 5 },
    t: { min: 0, max: 5 },
    u: { min: 0, max: 5 },
    v: { min: 0, max: 5 },
    w: { min: 0, max: 5 },
    x: { min: 0, max: 5 },
    y: { min: 0, max: 5 },
    z: { min: 0, max: 5 },
  };

  for (let i = 0; i < 5; ++i) {
    if (value[i] === "g") {
      freqs[word[i]].min++;
    }
  }

  for (let i = 0; i < 5; ++i) {
    if (value[i] === "y") {
      freqs[word[i]].min++;
    }
  }

  for (let i = 0; i < 5; ++i) {
    if (value[i] === "b") {
      freqs[word[i]].max = freqs[word[i]].min;
    }
  }

  const complexWordleFilter = (s) => {
    for (let i = 0; i < 5; ++i) {
      if (!allowed[i].has(s[i])) {
        return false;
      }
    }
    //match letter count
    for (const letter of Array.from("abcdefghijklmnopqrstuvwxyz")) {
      if (!bounded(count(s, letter), freqs[letter])) {
        return false;
      }
    }
    return true;
  };
  return words.filter((s) => complexWordleFilter(s));
}

function generateColors(word, answer) {
  if (
    typeof word !== "string" ||
    word.length !== 5 ||
    typeof answer !== "string" ||
    answer.length !== 5
  ) {
    const message =
      "Error: generateColors\nword and answer must be 5 character strings" +
      (typeof word !== "string"
        ? `\nword expected type string, got ${typeof word}`
        : word.length !== 5
        ? `\nword expected length 5, got length ${word.length}`
        : "") +
      (typeof answer !== "string"
        ? `\nanswer expected type string, got ${typeof answer}`
        : answer.length !== 5
        ? `\nanswer expected length 5, got length ${answer.length}`
        : "");
    throw new Error(message);
  }
  let res = "bbbbb";
  const map = {};
  for (let i = 0; i < 5; ++i) {
    if (map[answer[i]] === undefined) {
      map[answer[i]] = 1;
    } else {
      map[answer[i]]++;
    }
  }

  for (let i = 0; i < 5; ++i) {
    if (answer[i] === word[i]) {
      res = set(res, "g", i);
      map[answer[i]]--;
    }
  }

  for (let i = 0; i < 5; ++i) {
    if (res[i] !== "g") {
      if (map[word[i]]) {
        res = set(res, "y", i);
        map[word[i]]--;
        if (map[word[i]] === 0) {
          delete map[word[i]];
        }
      }
    }
  }
  return res;
}

function set(str, char, i) {
  return str.substring(0, i) + char + str.substring(i + 1);
}

function count(str, char) {
  return str.split(char).length - 1;
}

function bounded(int, bounds) {
  if (
    typeof int !== "number" ||
    !bounds ||
    typeof bounds.min !== "number" ||
    typeof bounds.max !== "number"
  ) {
    const message =
      "Function expected the following conditions:\n" +
      (typeof int !== "number"
        ? "  • int expected 'number', got " + typeof int + "\n"
        : "") +
      (bounds
        ? ""
        : "  • bounds object is required, but got " + typeof bounds + "\n") +
      (typeof bounds.min !== "number"
        ? "  • bounds.min expected 'number', got " + typeof bounds.min + "\n"
        : "") +
      (typeof bounds.max !== "number"
        ? "  • bounds.max expected 'number', got " + typeof bounds.max
        : "");

    throw new Error(message);
  }
  return int <= bounds.max && int >= bounds.min;
}

function alphaset() {
  return new Set([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]);
}

function filterWords(cstr, remaining) {
  const entries = parseCombinedString(cstr);
  for (const e of entries) {
    remaining = calculateRemaining(
      e.word.toLowerCase(),
      e.gyb.toLowerCase(),
      remaining
    );
  }
  return remaining;
}

function parseCombinedString(str) {
  const order = [];
  for (let i = 0; i < str.length; i += 10) {
    order[i / 10] = {
      word: str.substring(i, i + 5),
      gyb: str.substring(i + 5, i + 10),
    };
  }
  return order;
}

async function getScore(guess, remaining) {
  //this algorithm is in quadratic time it should be OK
  const lengthB4 = remaining.length;
  let removed = 0;
  for (const answer of remaining) {
    const gyb = generateColors(guess, answer);
    const lengthAf = calculateRemaining(guess, gyb, remaining).length;
    removed += lengthB4 - lengthAf;
  }
  return { word: guess, avgRemoved: removed / lengthB4 };
}

function winCondition(w) {
  const pairs = parseCombinedString(w);
  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].gyb === "GGGGG") {
      return i + 1;
    }
  }
  return 0;
}

function winningWord(w) {
  const pairs = parseCombinedString(w);
  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].gyb === "GGGGG") {
      return pairs[i].word;
    }
  }
  return null;
}

function turns(w) {
  return parseCombinedString(w).length;
}

export {
  generateColors,
  letterValuePair,
  parseCombinedString,
  calculateRemaining,
  words,
  accepted,
  filterWords,
  getScore,
  winCondition,
  turns,
  winningWord,
};

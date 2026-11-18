export const CONTENTS = ['water', 'wine', 'oil', 'honey', 'poison'] as const;
export type Content = (typeof CONTENTS)[number];

export type Clue =
  | { kind: 'holds'; flask: number; content: Content }
  | { kind: 'rightOf'; left: Content; right: Content }
  | { kind: 'contentParity'; content: Content; even: boolean }
  | { kind: 'notFlask'; content: Content; flask: number };

export type CavePuzzle = {
  day: string;
  clues: Clue[];
  solution: Content[];
};

export const FLASKS = 5;

export const dayKeyUTC = (now: Date = new Date()): string => now.toISOString().slice(0, 10);

export const dailySeed = (day: string): number => {
  let hash = 2166136261;
  const input = 'cave:' + day;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const clueHolds = (clue: Clue, assignment: Content[]): boolean => {
  const flaskOf = (content: Content): number => assignment.indexOf(content);
  switch (clue.kind) {
    case 'holds':
      return assignment[clue.flask] === clue.content;
    case 'rightOf':
      return flaskOf(clue.right) === flaskOf(clue.left) + 1;
    case 'contentParity':
      return flaskOf(clue.content) % 2 === (clue.even ? 0 : 1);
    case 'notFlask':
      return assignment[clue.flask] !== clue.content;
  }
};

export const countSolutions = (clues: Clue[]): number => {
  let total = 0;
  const assignment: Content[] = [...CONTENTS];
  const walk = (depth: number): void => {
    if (depth === FLASKS) {
      if (clues.every((clue) => clueHolds(clue, assignment))) total++;
      return;
    }
    for (let i = depth; i < CONTENTS.length; i++) {
      const picked = assignment[depth] ?? 'water';
      assignment[depth] = assignment[i] ?? 'water';
      assignment[i] = picked;
      walk(depth + 1);
      const back = assignment[depth] ?? 'water';
      assignment[depth] = assignment[i] ?? 'water';
      assignment[i] = back;
    }
  };
  walk(0);
  return total;
};

const randomClue = (rand: () => number, solution: Content[]): Clue => {
  const flask = Math.floor(rand() * FLASKS);
  const content = CONTENTS[Math.floor(rand() * CONTENTS.length)] ?? 'water';
  const other = CONTENTS[Math.floor(rand() * CONTENTS.length)] ?? 'wine';
  const kind = Math.floor(rand() * 4);
  if (kind === 0) {
    const held = solution[flask] ?? 'water';
    return { kind: 'holds', flask, content: held };
  }
  if (kind === 1) {
    const rightIdx = solution.indexOf(other);
    const leftIdx = rightIdx > 0 ? rightIdx - 1 : rightIdx + 1;
    const left = solution[leftIdx] ?? 'water';
    const right = solution[rightIdx] ?? 'wine';
    return { kind: 'rightOf', left, right };
  }
  if (kind === 2) {
    const idx = solution.indexOf(content);
    return { kind: 'contentParity', content, even: idx % 2 === 0 };
  }
  return { kind: 'notFlask', content: solution[flask] ?? 'poison', flask };
};

export const generateCave = (day: string): CavePuzzle => {
  const rand = mulberry32(dailySeed(day));
  const solution = [...CONTENTS].sort(() => rand() - 0.5);
  const clues: Clue[] = [];
  let count = countSolutions(clues);
  for (let round = 0; round < 60 && count > 1; round++) {
    let best: Clue | null = null;
    let bestCount = count;
    for (let trial = 0; trial < 10; trial++) {
      const candidate = randomClue(rand, solution);
      if (!clueHolds(candidate, solution)) continue;
      if (clues.some((clue) => JSON.stringify(clue) === JSON.stringify(candidate))) continue;
      const next = countSolutions([...clues, candidate]);
      if (next >= 1 && next < bestCount) {
        best = candidate;
        bestCount = next;
        if (next === 1) break;
      }
    }
    if (!best) break;
    clues.push(best);
    count = bestCount;
  }
  return { day, clues, solution };
};

export const isCorrectCave = (puzzle: CavePuzzle, assignment: Content[]): boolean =>
  puzzle.solution.every((content, i) => assignment[i] === content);

export const clueText = (clue: Clue): string => {
  switch (clue.kind) {
    case 'holds':
      return `Flask ${clue.flask + 1} holds the ${clue.content}.`;
    case 'rightOf':
      return `The ${clue.right} sits immediately right of the ${clue.left}.`;
    case 'contentParity':
      return `The ${clue.content} sits in an ${clue.even ? 'even' : 'odd'} flask.`;
    case 'notFlask':
      return `The ${clue.content} is not in flask ${clue.flask + 1}.`;
  }
};

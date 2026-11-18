import assert from 'node:assert/strict';
import { test } from 'node:test';

import { clueText, countSolutions, dailySeed, generateCave, isCorrectCave } from './puzzle.ts';

test('seed deterministe', () => {
  assert.equal(dailySeed('2026-12-01'), dailySeed('2026-12-01'));
});

test('la cave du jour est deterministe et unique', () => {
  const a = generateCave('2026-12-01');
  const b = generateCave('2026-12-01');
  assert.deepEqual(a.solution, b.solution);
  assert.deepEqual(a.clues, b.clues);
  assert.equal(countSolutions(a.clues), 1);
});

test('la solution verifie tous les indices', () => {
  for (const day of ['2026-12-01', '2026-12-07', '2026-12-09']) {
    const puzzle = generateCave(day);
    assert.ok(isCorrectCave(puzzle, puzzle.solution), day);
    assert.equal(countSolutions(puzzle.clues), 1, day);
  }
});

test('un melange errone est rejete', () => {
  const puzzle = generateCave('2026-12-01');
  const wrong = [...puzzle.solution];
  wrong[0] = puzzle.solution[1] ?? 'water';
  wrong[1] = puzzle.solution[0] ?? 'wine';
  assert.equal(isCorrectCave(puzzle, wrong), false);
});

test('les indices sont lisibles', () => {
  const puzzle = generateCave('2026-12-01');
  assert.match(clueText(puzzle.clues[0] ?? { kind: 'holds', flask: 0, content: 'water' }), /Flask|The/);
});

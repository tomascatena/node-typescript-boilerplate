import { add, subtract } from './math';

describe('Math functions', () => {
  test('add', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 2)).toBe(1);
  });

  test('subtract', () => {
    expect(subtract(3, 2)).toBe(1);
    expect(subtract(2, 3)).toBe(-1);
  });
});

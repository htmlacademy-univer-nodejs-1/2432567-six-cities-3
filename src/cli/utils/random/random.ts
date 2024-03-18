export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[], exactCount?: number): T[] {
  const count = exactCount || generateRandomValue(1, items.length);
  const startPosition = generateRandomValue(0, items.length - count);
  const endPosition = startPosition + count;
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

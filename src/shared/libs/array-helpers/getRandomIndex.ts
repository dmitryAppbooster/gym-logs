export const getRandomIndex = (arr: ReadonlyArray<string>): number => {
  return Math.floor(Math.random() * arr.length);
};

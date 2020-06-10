export const delay = (ms: number): Promise<never> =>
  new Promise((r) => setTimeout(r, ms));

export const diffArrayObject = (oldArray: any[], newArray: any[]): any[] => {
  const diffedArray = [];
  const len = oldArray.length;
  for (let i = 0; i < len; i++) {
    const a = JSON.stringify(oldArray[i]);
    const b = JSON.stringify(newArray[i]);

    if (a != b) diffedArray.push(newArray[i]);
  }
  if (newArray.length > oldArray.length)
    diffedArray.push(...newArray.slice(len));
  return diffedArray;
};

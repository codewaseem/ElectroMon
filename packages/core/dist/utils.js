"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffArrayObject = exports.delay = void 0;
exports.delay = (ms) => new Promise((r) => setTimeout(r, ms));
exports.diffArrayObject = (oldArray, newArray) => {
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
//# sourceMappingURL=utils.js.map

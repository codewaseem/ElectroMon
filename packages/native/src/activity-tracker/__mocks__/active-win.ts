import { LogInputData } from "../__testdata__/test.data";

let index = -1;

export default jest.fn().mockImplementation(() => {
  const data = LogInputData[index++] || LogInputData[0];

  return new Promise((res) => res(data));
});

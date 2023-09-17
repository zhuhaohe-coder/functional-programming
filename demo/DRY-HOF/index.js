const myArr = [1, 2, 3];

const arrAdd1 = (arr) => {
  return arr.map((x) => x + 1);
};

const arrMult3 = (arr) => {
  return arr.map((x) => x * 3);
};

const arrDivide2 = (arr) => {
  return arr.map((x) => x / 2);
};

console.log(arrAdd1(myArr));
console.log(arrMult3(myArr));
console.log(arrDivide2(myArr));

//使用HOF高阶函数
const arrComputed = (arr, fn) => {
  return arr.map(fn);
};
const add1 = (x) => x + 1;
const mult3 = (x) => x * 3;
const divide2 = (x) => x / 2;
console.log(arrComputed(myArr, add1));
console.log(arrComputed(myArr, mult3));
console.log(arrComputed(myArr, divide2));

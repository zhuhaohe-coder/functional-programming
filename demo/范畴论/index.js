function add4(num) {
  return num + 4;
}

function multiply3(num) {
  return num * 3;
}

function divide2(num) {
  return num / 2;
}

const Box = (x) => ({
  map: (f) => Box(f(x)),
  valueOf: () => x,
});

// 值为 21
const computeBox = Box(10).map(add4).map(multiply3).map(divide2).valueOf();
console.log(computeBox);

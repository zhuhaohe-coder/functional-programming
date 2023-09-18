function pipe(...funcs) {
  function callback(input, func) {
    return func(input);
  }
  return function (param) {
    return funcs.reduce(callback, param);
  };
}
function add4(num) {
  return num + 4;
}

function multiply3(num) {
  return num * 3;
}

function divide2(num) {
  return num / 2;
}
const computed = pipe(add4, multiply3, divide2);
console.log(computed(10));

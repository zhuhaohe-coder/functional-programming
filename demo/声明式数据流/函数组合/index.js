function add4(num) {
  return num + 4;
}

function multiply3(num) {
  return num * 3;
}

function divide2(num) {
  return num / 2;
}
//如何基于这些独立函数，构建一个多个函数串行执行的工作流？

// 1.套娃--反复去嵌套各种回调函数  回调地狱
const res = add4(multiply3(divide2(10)));
console.log(res);

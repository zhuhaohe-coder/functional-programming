//柯里化
function addThreeNum(a, b, c) {
  return a + b + c;
}
//把调用姿势改造为 addThreeNum(1)(2)(3)。
// 定义高阶函数 curry
function curry(addThreeNum) {
  // 返回一个嵌套了三层的函数
  return function addA(a) {
    // 第一层“记住”参数a
    return function addB(b) {
      // 第二层“记住”参数b
      return function addC(c) {
        // 第三层直接调用现有函数 addThreeNum
        return addThreeNum(a, b, c);
      };
    };
  };
}
// 借助 curry 函数将 add
const curriedAddThreeNum = curry(addThreeNum);
// 输出6，输出结果符合预期
console.log(curriedAddThreeNum(1)(2)(3));

//偏函数
function mutiply(a, b) {
  return a * b;
}
function wrapFunc(fn, fixedValue) {
  return (input) => {
    return fn(fixedValue, input);
  };
}
const mutiply3 = wrapFunc(mutiply, 3);
console.log(mutiply3(2));

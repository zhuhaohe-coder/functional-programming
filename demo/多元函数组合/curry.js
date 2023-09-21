function curry(func, arity = func.length) {
  //定义一个递归式generateCurried
  function generateCurried(prevArgs) {
    // generateCurried 函数必定返回一层嵌套
    return function curried(nexArg) {
      // 统计目前“已记忆”+“未记忆”的参数
      const args = [...prevArgs, nexArg];
      // 若 “已记忆”+“未记忆”的参数数量 >= 回调函数元数，则认为已经记忆了所有的参数
      if (args.length >= arity) {
        // 触碰递归边界，传入所有参数，调用回调函数
        return func(...args);
      } else {
        // 未触碰递归边界，则递归调用 generateCurried 自身，创造新一层的嵌套
        return generateCurried(args);
      }
    };
  }
  // 调用 generateCurried，起始传参为空数组，表示“目前还没有记住任何参数”
  return generateCurried([]);
}
//pipe函数
function pipe(...funcs) {
  function callback(input, func) {
    return func(input);
  }
  return function (param) {
    return funcs.reduce(callback, param);
  };
}
//计算函数
function add(a, b) {
  return a + b;
}

function multiply(a, b, c) {
  return a * b * c;
}

function addMore(a, b, c, d) {
  return a + b + c + d;
}

function divide(a, b) {
  return a / b;
}
//一元化处理
const curriedAdd = curry(add);
const curriedMultiply = curry(multiply);
const curriedAddMore = curry(addMore);
const curriedDivide = curry(divide);

const compute = pipe(
  curriedAdd(1),
  curriedMultiply(2)(3),
  curriedAddMore(1)(2)(3),
  curriedDivide(300)
);

console.log(compute(3)); //10

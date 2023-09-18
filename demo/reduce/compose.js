function compose(...funcs) {
  function callback(input, func) {
    return func(input);
  }

  return function (param) {
    return funcs.reduceRight(callback, param);
  };
}

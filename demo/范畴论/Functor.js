//Identity Functor
const identityFunctor = (x) => ({
  map: (f) => identityFunctor(f(x)),
  valueOf: () => x,
});
//恒等性
const arr = [1, 2, 3];
const identity = (x) => x;
const identityArr = identityFunctor(arr).map(identity).valueOf();
console.log(identityArr); // [1,2,3]
//可组合性
const initNum = 0;
function add4(x) {
  return x + 4;
}
function divide2(x) {
  return x - 2;
}
const compose = function (g, f) {
  return function (x) {
    return g(f(x));
  };
};
const identityNum = identityFunctor(initNum).map(add4).map(divide2).valueOf();
const composeNum = identityFunctor(initNum)
  .map(compose(add4, divide2))
  .valueOf();
console.log(identityNum === composeNum); //true

//Maybe Functor
const isEmpty = (x) => x === undefined || x === null;
const Maybe = (x) => ({
  map: (f) => (isEmpty(x) ? Maybe(null) : Maybe(f(x))),
  valueOf: () => x,
  inspect: () => `Maybe {${x}}`,
});

//使用reduce推导map
const reduceToMap = (arr, fn) => {
  return arr.reduce((pre, cur) => {
    pre.push(fn(cur));
    return pre;
  }, []);
};

const map = reduceToMap([1, 2, 3], (item) => item * 2);
console.log(map);

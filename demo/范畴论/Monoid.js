// 定义一个类型为 Add 的 Semigroup 盒子
const Add = (value) => ({
  value,
  // concat 接收一个类型为 Add 的 Semigroup 盒子作为入参
  concat: (box) => Add(value + box.value),
});
// 这个 empty() 函数就是加法运算的单位元
Add.empty = () => Add(0);

const res = Add(1).concat(Add(2)).concat(Add(3)).concat(Add(4));

// 输出 10
console.log(res.value);

//Monoid + reduce
const result = [1, 2, 3, 4].reduce(
  (monid, num) => monid.concat(Add(num)),
  Add.empty()
);
// 输出 10
console.log(result.value);

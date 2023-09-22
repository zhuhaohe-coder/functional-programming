// 定义一个类型为 Add 的 Semigroup 盒子
const Add = (value) => ({
  value,
  // concat 接收一个类型为 Add 的 Semigroup 盒子作为入参
  concat: (box) => Add(value + box.value),
});
// 输出一个 value=6 的 Add 盒子
console.log(Add(1).concat(Add(2)).concat(Add(3)));

const Multi = (value) => ({
  value,
  concat: (box) => Multi(value * box.value),
});
// 输出一个 value=60 的 Multi 盒子
console.log(Multi(3).concat(Multi(4)).concat(Multi(5)));

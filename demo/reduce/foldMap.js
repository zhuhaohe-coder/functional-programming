//concat() + reduce() 推导 foldMap()
// 定义一个类型为 Multi 的 Monoid 盒子
const Multi = (value) => ({
  value,
  // concat 接收一个类型为 Multi Monoid 盒子作为入参
  concat: (box) => Multi(value * box.value),
});
Multi.empty = () => Multi(1);

const foldMap = (Monoid, arr) =>
  arr
    .map(Monoid)
    .reduce(
      (prevMonoid, currentMonoid) => prevMonoid.concat(currentMonoid),
      Monoid.empty()
    );

const arr = [1, 2, 3, 4];
const res = foldMap(Multi, arr);
console.log(res.value); //24

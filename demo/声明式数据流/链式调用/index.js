const arr = [1, 2, 3, 4, 5, 6, 7, 8];
/*
筛选出 arr 里大于 2 的数字
将步骤1中筛选出的这些数字逐个乘以 2
对步骤 2 中的偶数数组做一次求和
*/
const arrMoreThan2 = arr.filter((item) => item > 2);
const arrMutile2 = arrMoreThan2.map((item) => item * 2);
const arrSum = arrMutile2.reduce((pre, cur) => {
  return pre + cur;
}, 0);
console.log(arrSum);

//code review
/*
 1.简洁性:
 冗余常量arrMoreThan2,arrMutile2(计算中间态)
 拉垮了代码的可读性

 2.安全性:
 arrMoreThan2,arrMutile2作为引用类型,完全有可能在运行过程中被修改
 不要抱计算中间态暴露出去
*/
//优化
const biggerThan2 = (num) => num > 2;
const mutile2 = (num) => num * 2;
const add = (a, b) => a + b;
const sum = arr.filter(biggerThan2).map(mutile2).reduce(add, 0);
console.log(sum);

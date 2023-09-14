//不可变的值
let a = 1;
let b = a;
console.log(a === b); //true
b = 2;
console.log(a === b); //false
//可变的引用内容
const c = {
  name: "xiuyan",
  age: 30,
};
const d = c;
console.log(c === d); //true
c.name = "youhu";
console.log(c === d); //false

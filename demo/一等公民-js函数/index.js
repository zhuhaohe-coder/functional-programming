//1. JS 函数可以被赋值给一个变量
let callMe = () => {
  console.log("Hello World！");
};
console.log(callMe);
//2. JS 函数可以作为参数传递
setTimeout(callMe, 2000);
//3. JS 函数可以作为另一个函数的返回值--闭包
function baseAdd(a) {
  return (b) => {
    return a + b;
  };
}
const addWithOne = baseAdd(1);
console.log(addWithOne);
const result = addWithOne(2);
console.log(result);

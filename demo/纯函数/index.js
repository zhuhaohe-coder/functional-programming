/*
    1.对于相同的输入，总是会得到相同的输出
    2.在执行过程中没有语义上可观察的副作用。
 */
//case #1
/*
//“输入”指的是函数的入参。
// 对于 add() 函数来说，它的输入其实是一直都是 void。不符合第一条
let a = 10;
let b = 20;
function add() {
  return a + b;
}
*/
//修改后
function add(a, b) {
  return a + b;
}

//case #2
/*
//存在副作用 console.log
function processName(firstName, secondName) {
  const fullName = `${firstName}·${secondName}`;
  console.log(`I am ${fullName}`);
  return fullName;
}
processName("约瑟翰", "庞麦郎");
*/
function processName(firstName, secondName) {
  const fullName = `${firstName}·${secondName}`;
  return fullName;
}
console.log(processName("约瑟翰", "庞麦郎"));

//case #3
/*
//一个引入了网络请求的函数，从原则上来说是纯不起来的。
//1.对于相同的输入，服务端未必能够给到相同的输出
//2.请求可能出错,未经捕获的 Error 本身就是一种副作用
function getData(url) {
  const response = await fetch(url)
  const { data } = response   
  return data
}
*/

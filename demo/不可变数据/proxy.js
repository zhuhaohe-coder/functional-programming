// 定义一个 programmer 对象
const programmer = {
  name: "xiuyan",
  age: 30,
};

// 定义这个对象的拦截逻辑
const proxyHandler = {
  // obj 是目标对象， key 是被访问的键名
  get(obj, key) {
    if (key === "age") return 100;
    return obj[key];
  },
};

// 借助 Proxy，将这个对象使用拦截逻辑包起来
const wrappedProgrammer = new Proxy(programmer, proxyHandler);

console.log(wrappedProgrammer.name); //xiuyan
console.log(wrappedProgrammer.age); //100

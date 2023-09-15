import { Map } from "immutable";

const originData = Map({ name: "xiuyan", hobby: "coding", age: 666 });

// 使用 immutable 暴露的 Api 来修改 baseMap 的内容
const mutatedData = originData.set("age", 66);

// 我们会发现修改 baseMap 后将会返回一个新的对象，这个对象的引用和 baseMap 是不同的
console.log(mutatedData === originData); //false
console.log(mutatedData.get("age"), originData.get("age"));

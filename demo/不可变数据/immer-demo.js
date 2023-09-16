import { produce } from "immer";
// 源数据
const baseState = [
  {
    name: "修言",
    age: 99,
  },
  {
    name: "秀妍",
    age: 100,
  },
];
// 定义数据的写逻辑
const recipe = (draft) => {
  draft.push({ name: "xiuyan", age: 101 });
  draft[1].age = 102;
};
// 借助 produce，执行数据的写逻辑
const nextState = produce(baseState, recipe);

console.log(baseState, nextState);

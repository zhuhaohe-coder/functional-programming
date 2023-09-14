//员工信息筛选工作流
/*
    我们有一个员工信息数据库。
    现在为了对年龄大于等于 24 岁的员工做生涯指导，需要拉出一张满足条件的员工信息清单，
    要求清单中每一条信息中间用逗号分隔，并按照年龄升序展示。
*/
//mock数据
const peopleList = [
  {
    name: "John Lee",
    age: 24,
    career: "engineer",
  },
  {
    name: "Bob Chen",
    age: 22,
    career: "engineer",
  },
  {
    name: "Lucy Liu",
    age: 28,
    career: "PM",
  },
  {
    name: "Jack Zhang",
    age: 26,
    career: "PM",
  },
  {
    name: "Yan Xiu",
    age: 30,
    career: "engineer",
  },
];
/*
    命令式:
    1.筛选出大于24岁的员工
    2.排序
    3.针对该列表中的每一条员工数据历史，保存到 logText 中
*/
let imperativeLogText = "";
//筛选
const peopleAgeMoreThan24 = peopleList.filter((item) => item.age > 24);
//排序
const sortedPeopleList = peopleAgeMoreThan24.sort((a, b) => {
  return a.age - b.age;
});
const len = sortedPeopleList.length;
//信息提取
sortedPeopleList.forEach((item, i) => {
  const itemLogText = `${item.name}'s age is ${item.age}`;
  if (len !== i) {
    imperativeLogText += `${itemLogText},`;
  } else {
    imperativeLogText += itemLogText;
  }
});
console.log(imperativeLogText);

/*
    函数式:
    1.定义筛选逻辑
    2.定义排序逻辑
    3.定义信息提取逻辑
*/
//1.定义筛选逻辑
const ageMoreThan24 = (person) => person.age > 24;
//2.定义排序逻辑
const smallAtFirst = (a, b) => a.age - b.age;
//3.定义信息提取逻辑
const generateLogText = (person) => `${person.name}'s age is ${person.age}`;

const functionalLogText = peopleList
  .filter(ageMoreThan24)
  .sort(smallAtFirst)
  .map(generateLogText)
  .join(",");
console.log(functionalLogText);

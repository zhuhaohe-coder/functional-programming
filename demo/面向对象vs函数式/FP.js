/*
为网课平台增加一个“一键注册我所喜欢的课程”功能：
“注册”意味着用户加入了某个课程，
“喜欢”则是一个类似于收藏的功能。
用户在“喜欢”了一些课程之后，执行“注册”即可成为这些课程的学员；
“注册”执行完毕后，需要及时地从用户的喜欢列表中清除这些课程；
在清除完成后，还需要及时检查这个用户的注册课程总数，若总数超过10门课，则标识该用户为 VIP 客户。
*/
/*
分析:
用户 -> 喜欢课程 -> 注册课程 -> 清除喜欢列表 -> 检查是否 VIP -> 结束
*/
import { user, myLessons } from "./data.js";
//"喜欢课程"功能函数
function likedLessons(user, lessons) {
  const updateLikeLessons = user.likedLessons.concat(lessons);
  return Object.assign({}, user, { likedLessons: updateLikeLessons });
}
//"注册课程"功能函数
function registerLessons(user) {
  return {
    ...user,
    registerLessons: user.likedLessons,
  };
}
//"清除喜欢列表"功能函数
function emptyUserLiked(user) {
  return {
    ...user,
    likedLessons: [],
  };
}
//"检查是否是VIP"功能函数
function isVIP(user) {
  let isVIP = false;
  if (user.registerLessons > 10) {
    isVIP = true;
  }
  return {
    ...user,
    isVIP,
  };
}
/*
//pipe #1
const pipe = (...funcs) => {
  function callback(input, fn) {
    return fn(input);
  }
  return function (param) {
    return funcs.reduce(callback, param);
  };
};
*/
//pipe #2
const pipe = (...funcs) =>
  // 同样是基于 reduce 实现，主要的区别在于对组合链入参的处理不同
  funcs.reduce(
    (f, g) =>
      (...args) =>
        g(f(...args))
  );

console.log(
  pipe(likedLessons, registerLessons, emptyUserLiked, isVIP)(user, myLessons)
);

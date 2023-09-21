const isExisted = (id) => id % 3 === 0;
/*
用于检查该用户是否在用户列表中。
如果是，则取 id 的前三位作为用户的默认昵称，并将昵称和id一起返回；
否则，视为异常。
*/
const getUser = (id) => {
  if (isExisted(id)) {
    return {
      id,
      nickName: String(id).slice(0, 3),
    };
  } else {
    throw new Error("User not found");
  }
};

//Maybe Functor
const isEmpty = (x) => x === undefined || x === null;
const Maybe = (x) => ({
  map: (f) => (isEmpty(x) ? Maybe(null) : Maybe(f(x))),
  valueOf: () => x,
  inspect: () => `Maybe {${x}}`,
});

const getUserSafely = (id) => {
  try {
    const userInfo = getUser(id);
    return Maybe(userInfo);
  } catch {
    return Maybe(null);
  }
};

const res = getUserSafely(1110021);
console.log(res.valueOf()); //{ id: 1110021, nickName: '111' }
console.log(res.inspect()); //Maybe {[object Object]}

const targetUser = {
  id: 1100013,
  credits: 2000,
  level: 20,
};
const userContainer = Maybe(targetUser);
const extractUserId = (user) => user && user.id;
const userInfo = userContainer.map(extractUserId).map(getUserSafely);
console.log(userInfo.valueOf().valueOf());

//解决方案
const Monad = (x) => ({
  map: (f) => Monad(f(x)),
  // flatMap 直接返回 f(x) 的执行结果
  flatMap: (f) => f(x),

  valueOf: () => x,
  inspect: () => `Monad {${x}}`,
});
const userContainer2 = Monad(targetUser);
const userInfo2 = userContainer2.map(extractUserId).flatMap(getUserSafely);
console.log(userInfo2.valueOf());

# 编程范式

> 编程范式可以理解为编程的风格/方式，它决定了我们将以一种什么样的方法和规范去组织自己的代码，是一门研究“如何写代码”的学问。

**JS是多范式的语言**

- 命令式编程
- 面向对象式编程
- 函数式编程

> 函数式编程是一种==强调以函数使用为主==的软件开发风格。 ——[美]路易斯·阿泰西奥

## 函数式编程三大特征

- 拥抱纯函数, 隔离副作用
- 函数是"一等公民"
- 避免对状态的改变(不可变值)

# 纯函数与副作用

## 纯函数

同时满足以下两个特征的函数，我们就认为是纯函数：

- 对于相同的输入，总是会得到相同的输出
- 在执行过程中没有语义上可观察的副作用。

## 副作用

> 在计算机科学中，**函数副作用**指当调用函数时，除了返回可能的函数值之外，还对主调用函数产生附加的影响。 ——维基百科

简单地讲：对函数来说，它的正常工作任务就是【**计算**】，除了计算之外，它不应该搞别的。

**如果一个函数除了计算之外，还对它的执行上下文、执行宿主等外部环境造成了一些其它的影响，那么这些影响就是所谓的”副作用”。**

## 纯与不纯的本质

**“纯”的本质——有且仅有【显式数据流】**

> 纯函数（Pure Function）——输入输出数据流全是**显式**（Explicit）的函数。
> —— 维基百科

数据以入参形式传入，这叫【显式输入数据流】。

数据以返回值形式输出，这叫【显式输出数据流】。

> 纯函数——**输入只能够以参数形式传入，输出只能够以返回值形式传递，除了入参和返回值之外，==不以任何其它形式和外界进行数据交换==的函数**。

**“不纯”的元凶——隐式数据流**

一个纯函数在执行过程中应该只有横向数据流，而不应该有纵向数据流。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5d19c82dfb446abbfd66ef8bc71376d~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92c0e99785844984a87b5bb50e382609~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

# 函数是一等公民

> 当一门编程语言的函数可以被当作变量一样用时，则称这门语言拥有**头等函数**。例如，在这门语言中，函数可以被当作参数传递给其他函数，可以作为另一个函数的返回值，还可以被赋值给一个变量。 ——MDN Web Docs

头等函数的核心特征是“**可以被当做变量一样用**”。

它意味着：

1. 可以被当做参数传递给其他函数
2. 可以作为另一个函数的返回值
3. 可以被赋值给一个变量

## “一等公民”的本质

为什么 JS 中的函数这么牛x，可以为所欲为呢？

本质上是因为**它不仅仅是个函数，它还是个(可执行的)对象**。

```js
const func = ()=>{}
undefined
func instanceof Function
true
func instanceof Object
true
Function instanceof Object
true
```

JavaScript 有且仅有以下 8 种数据类型：

基本类型:**大小固定、体积轻量、相对简单。**

- Undefined 类型
- Null 类型
- Boolean 类型
- Number 类型
- String 类型
- Symbol 类型
- BigInt类型

引用类型:**复杂、占用空间较大、且大小不定。**

- Object 类型

这两类数据之间最大的区别，在于**变量保存了数据之后，我们还能对这个数据做什么**。

> **并没有一种数据类型叫 Function**，Function 和 Array、Date 这些 built-in Class 一样，都属于对象类型。
>
> 既然函数也是对象，那么对象能干的事，函数也能干。

# 不可变数据

> “不可变数据”正如一顶牢牢扣在我们程序员脑袋上的**安全帽**，它从实践的角度，对我们的编码行为作出了更加具体的约束，确保我们能够最大限度地输出纯净、安全的代码。

## 不可变的值

**值类型的数据无法被修改**，当我们修改值类型变量的时候，本质上会创建一个新的值。

```js
let a = 1
let b = a

// true
a === b

b = 2

// false
a === b
```

**像数字类型这样，自创建起就无法再被修改的数据，我们称其为“不可变数据**”。

## 可变的引用内容

**在引用本身不变的情况下，引用所指向的内容是可以发生改变的。**

```js
const a = {
  name: 'xiuyan',
  age: 30
}

const b = a


// true 
a === b 

b.name = 'youhu'   
 
// true
a === b 
```

**像这种创建后仍然可以被修改的数据，我们称其为“可变数据”。**

## 为什么函数式编程不喜欢可变数据

### 可变数据使函数行为变得难以预测

可变数据会使数据的变化变得隐蔽，进而使函数的行为变得难以预测。

在函数式编程这种范式下，我们校验一个函数有效性的关键依据，永远是“**针对已知的输入，能否给出符合预期的输出**”，这样的校验非常清晰、且容易实现。

而可变数据的出现则将会使函数的作用边界变得模糊，进而导致使用者、甚至开发者自身都难以预测它的行为最终会指向什么样的结果。

### 可变数据使函数复用成本变高

可变数据的存在，要求我们不得不在调用一个函数之前，先去了解它的逻辑细节、定位它对外部数据的依赖情况和影响情况，由此来确保调用动作的安全性。

但很多情况下，当我们使用某一个函数的时候，我们会默认它是一个黑盒——无论是我今天去 npm 上拉下来一个第三方包，还是说我去其他业务的文件夹下借隔壁老王写的函数来用，我们关注的都是这个**函数的效用、函数的输入与输出，而不会去关注它的实现细节**。

就好像我们使用酸奶机之前，最多读一下说明书，而不会拆开它的壳子研究一下它装了几根电阻丝一样。

因此，我们有必要确保，这个黑盒是可靠的、受控的。

**一个可靠、受控的黑盒，应该总是将变化控制在盒子的内部，而不去改变盒子外面的任何东西**。
这就像我们往酸奶机里倒入了酵母和牛奶，只期望它能产出酸奶，而不希望它引燃旁边的烤箱一样。

要想做到这一点，就必须**把可变数据从我们的函数代码里铲除干净。**

## 实践原则: 拷贝,而不是修改

### 拷贝的目的：确保外部数据的只读性

对于函数式编程来说，**函数的外部数据是只读的，函数的内部数据则是可写的**。

对于一个函数来说，”外部数据“可以包括全局变量、文件系统数据、数据库数据、网络层数据等。有且仅有这些**外部数据**，存在【只读】的必要。

> 注：由于纯函数只能通过参数获取数据，因此如果需要使用外部数据，就必须将其作为参数传递给函数。

### 拷贝不是万能解药

当**数据规模大、数据拷贝行为频繁**时，拷贝将会给我们的应用性能带来巨大的挑战。

拷贝出来的冗余数据将盘踞大量的内存，挤占其它任务的生存**空间**；此外，拷贝行为本身也是需要吃 CPU 的，持续而频繁的拷贝动作，无疑将拖慢应用程序的反应**速度**。

因此，对于**状态简单、逻辑轻量**的应用来说，拷贝确实是一剂维持数据不可变性的良药。

但是对于**数据规模巨大、数据变化频繁**的应用来说，拷贝意味着一场性能灾难。

## 持久化数据结构

### Immutable.js

> ImmutableJS 是对“不可变值”这一思想的贯彻实践。它在 2014 年被 Facebook 团队推出，Facebook 给它的定位是“实现持久化数据结构的库”。

mmutable.js 提供了一系列的 Api，这些 Api 将帮助我们确保数据的不可变性。

从代码上来看，它省掉了我们手动拷贝的麻烦。

从效率上来说，它在**底层应用了持久化数据结构，解决了暴力拷贝带来的各种问题**。

### Git “快照”是如何工作的

在创建 commit 时，git 会对整个项目的所有文件做一个“快照”。

“快照”记录的并不是文件的内容，而是**文件的索引**。

当 commit 发生时， git 会保存当前版本所有文件的索引。

**对于那些没有发生变化的文件，git 保存他们原有的索引；对于那些已经发生变化的文件，git 会保存变化后的文件的索引。**

假设一个项目中有 A、B 两个文件，其中 A 文件被修改了，而 B 文件保持不变。

我们将修改后的新的 A 文件的索引记为 A'

在变化发生后，A 和 A' 是共存的，变化前的那一次快照指向 A，变化后的这一次快照指向 A'。

而未被修改到的 B 文件，将会原封不动地呆在原地，被新版本的快照所复用，如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68bd7ddec61a48aa8ba293694f5707cc~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

**快照的本质是对索引的记录。**

### 理解“数据共享”：从“快照”到“安全帽”

和 git “快照”一样，持久化数据结构的精髓同样在于“**数据共享**”。

数据共享意味着将“变与不变”分离，确保**只有变化的部分被处理，而不变的部分则将继续留在原地、被新的数据结构所复用。**

## Immer.js

Immer.js 实现 Immutability 的姿势非常有趣——它使用 Proxy，对目标对象的行为进行“元编程”。

所谓“元编程”，指的是对编程语言进行再定义。

### 回顾Proxy

> Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。 ——MDN

借助 Proxy，我们可以给目标对象创建一个代理（拦截）层、拦截原生对象的某些默认行为，进而实现对目标行为的自定义。

### Produce 工作原理：将拷贝操作精准化

`produce` 可以像 Immutable.js 一样，精准打击那些需要执行写操作的数据。**将“变与不变”分离，确保只有变化的部分被处理，而不变的部分则将继续留在原地。**

但 `produce` 并没有像 Immutable.js 一样打数据结构的主意，而是将火力集中对准了“拷贝”这个动作。

它严格地控制了“拷贝”发生的时机：**当且仅当写操作确实发生时，拷贝动作才会被执行。**

```js
const baseHandler = {
  set(obj, key, value) {
    // 先检查 copy 是否存在，如果不存在，创建 copy
    if (!copy) {
      copy = { ...base }
    }
    // 如果 copy 存在，修改 copy，而不是 base
    copy[key] = value
    return true
  }
}
```

在我们的极简版 `produce` 里，着重突出了 `setter` 函数的写逻辑，也就是对“拷贝时机”的描述，淡化了其它执行层面的细节。

而在 Immer.js 中，完整版 `produce` 的浅拷贝其实是**可递归**的。

`produce` **不仅会拦截** `setter` **，也会拦截** `getter`。

通过对 `getter` 的拦截，`produce` 能够按需地对被访问到的属性进行“懒代理”：你访问得有多深，代理逻辑就能走多深；而所有被代理的属性，都会具备新的 `setter` 方法。

当写操作发生时，`setter` 方法就会被逐层触发，呈现“逐层浅拷贝”的效果。

**“逐层浅拷贝”是 Immer 实现数据共享的关键。**

假设我的对象嵌套层级为 10 层，而我对它的属性修改只会触达第 2 层，“逐层的浅拷贝”就能够帮我们确保拷贝只会进行到第 2 层。

“逐层的浅拷贝”如果递归到最后一层，就会变成深拷贝。

对于引用类型数据来说，“暴力拷贝”指的也就是深拷贝。

“暴力拷贝”之所以会带来大量的时间空间上的浪费，本质上是因为它在拷贝的过程中不能够“**知其所止**”。

而“逐层的浅拷贝”之所以能够实现数据共享，正是因为它借助 Proxy 做到了“**知其所止**”。

### “知其所止”的软件设计表达

无论是“精准拷贝”、“修改时拷贝”，还是“逐层拷贝”，其背后体现的都是同一个思想——“按需”。

“知其所止”的软件设计表达，就是“按需”。

对于 Immutable.js 来说，它通过构建一套原生 JS 无法支持的 Trie 数据结构，最终实现了树节点的按需创建。

对于 Immer.js 来说，它借助 Proxy 的 getter 函数实现了按需代理，借助 Proxy 的 setter 函数实现了对象属性的按需拷贝。

可见，想要实现高效的 Immutability，“按需变化”是一个不错的切入点。

## Immutability 的实践演进

对于 JS 来说，Immutability 实践的直接目的是什么？

简单来说，是为了解决**数据内容变化与数据引用变化不同步的问题**。

我拿到一个引用类型数据（`A`)，修改了其中的一个 `a` 属性，然后所有依赖 `A.a` 进行计算的函数逻辑全炸了，牵一发而动全身，这不是我们想要的结局。

我们希望一旦引用类型数据（`A`）的内容改变了，我们就能获取到一个新的引用，这个引用指向一套已经发生改变的数据（`A'`)， `A` 和 `A'` 应该是泾渭分明的。

**暴力拷贝，可以做到“泾渭分明”，但是对于规模较大的数据来说，它太低效了**。

于是，社区的 Immutability 解决方案百花齐放，Immer.js 和 Immutable.js 就是其中的佼佼者。

**Immutable.js 底层是持久化数据结构，而 Immer.js 的底层是 Proxy 代理模式。**

两者虽然在具体的工作原理上大相径庭，但最终指向的目的却是一致的：**使数据的引用与数据内容的变化同步发生；并且在这个过程中，按需处理具体的变化点，提升不可变数据的执行效率。**

# 因为DRY,所以HOF

> DRY(Don't Repeat Yourself) 是一种软件设计原则，HOF(High Order Function)指高阶函数。

**高阶函数，指的就是接收函数作为入参，或者将函数作为出参返回的函数。**

## WHY HOF

- 更简洁的代码,方便读写
- 更小的编码负担
- 更好的可读性
- 代码可复用, 利人利己
- 清晰的逻辑边界, 更少的测试工作

# "万金油"Reduce

> `reduce()`**是函数式语言的万金油；函数式语言不能失去** `reduce()`**，就像西方不能失去耶路撒冷。**

**在 JS 中，基于 reduce()，我们不仅能够推导出其它数组方法，更能够推导出经典的函数组合过程。**

## 使用reduce推导map

```js
const reduceToMap = (arr, fn) => {
  return arr.reduce((pre, cur) => {
    pre.push(fn(cur));
    return pre;
  }, []);
};
```

`map()` 过程可以看作是 `reduce()` 过程的一种特殊的应用。

也就是说，在数组方法里，`reduce()` 处在逻辑链相对底层的位置，这一点毋庸置疑。

`reduce()`**真正的威力，在于它对函数组合思想的映射。**

## `reduce()` 映射了函数组合思想

`reduce()` 的工作流：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd3b69f006824035ac674303fe2c0feb~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

通过观察这个工作流，我们可以发现这样两个特征：

- `reduce()` 的回调函数在做参数组合
- `reduce()` 过程构建了一个函数 pipeline

### `reduce()` 的回调函数在做参数组合

首先，就 reduce() 过程中的单个步骤来说，每一次回调执行，都会吃进 2 个参数，吐出 1 个结果。

我们可以把每一次的调用看做是把 2 个入参被【**组合**】进了 callback 函数里，最后转化出 1 个出参的过程。

我们把数组中的 n 个元素看做 n 个参数，那么 `reduce()` 的过程，就是一个把 n 个参数逐步【**组合**】到一起，最终吐出 1 个结果的过程。

reduce，动词，意为减少。这个【减少】可以理解为是参数个数的减少。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccc3554f1f1245c5bdaa8d3647411b90~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

如上图所示，reduce 方法把多个入参，reduce（减少）为一个出参 。

### `reduce()` 过程是一个函数 pipeline

`reduce()` 函数发起的工作流，可以看作是一个函数 pipeline。

尽管每次调用的都是同一个函数，但**上一个函数的输出，总是会成为下一个函数的输入。**

同时，`reduce()` pipeline 里的每一个任务都是一样的，仅仅是入参不同，**这极大地约束了 pipeline 的能力**。

我们把 `reduce()` 的这两个特征放在一起来看：**参数组合+函数pipeline**。

咱就是说，有没有可能，有没有可能咱们把 pipeline 里的每一个函数也弄成不一样的呢？

更直白地说，你`reduce()`既然都能组合参数了，你能不能帮我的 pipeline 组合一下函数呢？

毕竟，**JS 的函数是可以作为参数传递**的嘛！

答案是肯定的——可能，可太能了！

`reduce()` 之所以能够作为函数式编程的“万金油”存在，本质上就是因为它映射了函数组合的思想。

而函数组合，恰恰是函数式编程中最特别、最关键的实践方法，是核心中的核心，堪称“核中核”。

### 借助reduce推导函数组合

一旦我们可以把 reduce pipeline 里的最小计算单元修改成任意不同的函数，那么`reduce`的工作流就会变成下面这样了

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d0eed4a85a54046b0c8ee9e7ef679ed~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

只要我们能够想办法**让 reduce 工作流里的计算单元从一个函数转变为 N 个函数**，我们**就可以达到函数组合的目的**。

在整个 reduce 的工作流中，callback 是锁死的，但每次调用 callback 时传入的参数是动态可变的（如下图）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad5509a0c9e04d8f8cc7a417ccb19ccc~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

我们把**待组合的函数放进一个数组里，然后调用这个函数数组的 reduce 方法**，就可以创建一个多个函数组成的工作流。

而这，正是市面上主流的函数式库实现 compose/pipe 函数的思路。

### 借助reduce推导pipe

```js
const funcs = [func1, func2, func3]
```

我们假设三个 func 均是用于数学计算的函数，整个工作流的任务就是吃进一个数字 0 作为入参、吐出一个计算结果作为出参。

我想要逐步地组合调用 funcs 数组里的函数，得到一个这样的声明式数据流：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae9a8c25da8e44fcab4ab393e40a6a49~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

如果我借助了 reduce，我得到的数据流乍一看和楼上是有出入的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc6e25ab292b433389d99280058d169b~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

如何通过调整 reduce 的调用，使它的工作流和声明式数据流看齐呢？

首先是入参的对齐，这个比较简单，我们只需要把 initialValue 设定为 0 就可以了。

入参明确后，我的 reduce 调用长这样：

```js
const funcs = [func1, func2, func3]  

funcs.reduce(callback, 0)
```

接下来重点在于 callback 怎么实现

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71658f7803864aa999f8e33370b5e93f~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

想要让上下两个流程等价，我们只需要确保红蓝两个圈圈的工作内容总是等价就可以了。

从第一对红蓝圈圈开始看起，蓝色圈圈的工作内容是 func1(0)，红色圈圈的工作内容是 callback(0, func1)。

两者等价，意味着 callback(0, func1) = func1(0)。

同理，我们可以逐步推导出第二个、第三个红色圈圈的工作内容，分别应该满足：

callback(value1, func2) = func2(value1)

callback(value2, func3) = func3(value2)

以此类推，对于任意的入参 (input, func），callback 都应该满足：

callback(input, func) = func(input)

```js
function callback(input, func) {
  func(input)
}  

funcs.reduce(callback,0)
```

再稍微包装一下，给这坨逻辑起一个新名字：

```js
function pipe(...funcs) {
  function callback(input, func) {
    return func(input)
  }  

  return function(param) {
    ret urn funcs.reduce(callback,param)
  }
}
```

我们就得到了一个经典的 pipe 函数。

## compose : 倒序的pipe

pipe 用于创建一个正序的函数传送带，而 compose 则用于创建一个倒序的函数传送带。

我们把 pipe 函数里的 reduce 替换为 reduceRight，就能够得到一个compose：

```js
function compose(...funcs) {
  function callback(input, func) {
    return func(input)
  }  

  return function(param) {
    return funcs.reduceRight(callback,param)
  }
}
```

**正序是 pipe，倒序是 compose。**

# 声明式数据流

## 借助链式调用构建声明式数据流

```js
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
console.log(arrSum);//66

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
console.log(sum);//66
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22e1de59b45848e0982ba71d67c99de3~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

**借助链式调用，足以完美地规避掉那些尴尬的“中间态”，从而确保我们的代码简洁安全。**

过去，我有三行代码，我需要逐行阅读、理解计算中间态和主流程之间的逻辑关系，才能够推导出程序的意图。**这样的代码，是命令式的。**

现在，我只需要观察一个函数调用链，这个调用链如同一条传送带一般，用函数名标注了每道工序的行为。即便不清楚数据到底是如何在“传送带”上流转的，我们也能够通过函数名去理解程序的意图。

**这样的代码，是声明式的。** 基于此构建出的数据流，就是**声明式的数据流**。

**实现声明式的数据流，除了借助链式调用，还可以借助函数组合。**

### 链式调用的前提

map()、reduce()、filter() 这些方法之间，之所以能够进行链式调用，是因为：

1. 它们都**挂载在 Array 原型的 Array.prototype** 上
2. 它们在计算结束后都会 return 一个新的 Array
3. 既然 return 出来的也是 Array，那么自然可以继续访问原型 **Array.prototype** 上的方法

链式调用的本质 **，是通过在方法中==返回对象实例本身的 this/ 与实例 this 相同类型的对象==，达到多次调用其原型（链）上方法的目的。**

要对函数执行链式调用，**前提是==函数挂载在一个靠谱的宿主 Object 上==。**

## 独立函数的组合姿势

```js
function add4(num) {
  return num + 4;
}

function multiply3(num) {
  return num * 3;
}

function divide2(num) {
  return num / 2;
}
//如何基于这些独立函数，构建一个多个函数串行执行的工作流？
```

### 组合，但是回调地狱版

```js
// 1.套娃--反复去嵌套各种回调函数  回调地狱
const res = add4(multiply3(divide2(10)));
console.log(res);
```

### 使用reduce构建的pipe函数

```js
function pipe(...funcs) {
  function callback(input, func) {
    return func(input);
  }
  return function (param) {
    return funcs.reduce(callback, param);
  };
}
function add4(num) {
  return num + 4;
}

function multiply3(num) {
  return num * 3;
}

function divide2(num) {
  return num / 2;
}
const computed = pipe(add4, multiply3, divide2);
console.log(computed(10));
```

## Why Compose?

面向对象的核心在于继承，而**函数式编程的核心则在于组合**。

我们常说函数式编程就像一个乐高游戏：那一个个独立内聚的函数就像一堆乐高积木方块儿。它们看似渺小到无足轻重，却可以在**组合**后变幻出千百种形态、最终呈现出复杂而强大的功能。

组合这个动词，赋予了函数式编程无限的想象力和可能性。

在函数式编程的实践中，我们正是**借助 compose 来组合多个函数的功能**，它**是函数式编程中最有代表性的一个工具函数**，所以它才会成为面试题中的常客。

# 多元函数解决方案:从编码工具视角看待偏函数&柯里化

偏函数和柯里化解决的最核心的问题有两个，分别是：

- 函数组合链中的多元参数问题
- 函数逻辑复用的问题

## 函数组合链中的多元参数问题

### 理解函数中的"元数(Arity)"

函数参数里的“元数”，指的其实就是函数参数的数量。

### 函数组合链中的参数对齐问题

函数组合虽好，但各种限制少不了。

上一节中的pipe函数中, 调用链的三个函数齐刷刷都是一元函数,这个属于是理想情况了。有的时候，一个调用链中的函数彼此之间可能并没有这么和谐。

对于函数组合链来说，它总是预期链上的函数是一元函数：函数吃进一个入参，吐出一个出参，然后这个出参又会作为下一个一元函数的入参......参数个数的对齐，是组合链能够运转的前提。

**一旦链上乱入了多元函数，那么多元函数的入参数量就无法和上一个函数的出参数量对齐，进而导致执行错误。**

> tips：==函数组合链上的函数总是一元函数==，这是一个通用且广泛的约定，但并不是一个“死规矩”。
> 有时候，我们可以通过适当的改造，使组合链接受多元函数。比如 ramda.js 中的 pipe 函数，就允许链上的第一个函数有任意多个参数（注意，仅仅是第一个函数有此“特权”，其余函数仍然必须是一元函数）。

**任何时候，只要我们想要对函数的入参数量进行改造，必须先想到偏函数&柯里化。**

## 求解多元参数问题

### 柯里化的概念与实现

> 在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

具体一点，就是说柯里化是一个把 `fn(a, b, c)`转化为`fn(a)(b)(c)`的过程。

举个例子，我有一个函数，可以将任意三个数相加：

```js
function addThreeNum(a, b, c) {
  return a+b+c
}
```

正常调用的话就是 `addThreeNum(1, 2, 3)` 这样的。

但是通过柯里化，我可以把调用姿势改造为 `addThreeNum(1)(2)(3)`。

有没有什么姿势，可以允许我在**保留原有函数的基础上，单纯通过增量代码来实现柯里化**呢？

当然有啦！高阶函数不就是干这个的么！

下面我就针对加法这个场景，创建了一个名为 curry 的高阶函数（解析在注释里）：

```js
// 定义高阶函数 curry
function curry(addThreeNum) {
  // 返回一个嵌套了三层的函数
  return function addA(a) {
    // 第一层“记住”参数a
    return function addB(b) {
      // 第二层“记住”参数b
      return function addC(c) {
        // 第三层直接调用现有函数 addThreeNum
        return addThreeNum(a, b, c)
      }
    }
  }
}

// 借助 curry 函数将 add
const curriedAddThreeNum = curry(addThreeNum)
// 输出6，输出结果符合预期
curriedAddThreeNum(1)(2)(3)
```

### 偏函数 VS 柯里化

> 在计算机科学中，**部分应用**（或部分函数应用）指的是将一些参数固定在一个函数上，产生另一个较小元的函数的过程。

> tips: 偏函数英文是 partial application， 直译过来就是“部分应用”。

偏函数是指通过**固定函数的一部分参数**，生成一个**参数数量更少的函数**的过程。

柯里化说的是一个 n 元函数变成 n 个一元函数。

偏函数说的是一个 n 元函数变成一个 m(m < n） 元函数。

对于柯里化来说，不仅函数的元发生了变化，函数的数量也发生了变化（1个变成n个）。

对于偏函数来说，仅有函数的元发生了变化（减少了），函数的数量是不变的。

#### 偏函数求解组合链中的参数对齐问题

```js
function mutiply(a, b) {
  return a * b;
}
function wrapFunc(fn, fixedValue) {
  return (input) => {
    return fn(fixedValue, input);
  };
}
const mutiply3 = wrapFunc(mutiply, 3);
console.log(mutiply3(2));
```

这样就成功固定了 `multiply` 函数的第一个入参 x，得到了一个一元函数 `multiply3`，这完全符合组合链对函数元的预期。

## 函数逻辑复用问题

当我们看到偏函数和柯里化的实现分别都借助了**高阶函数**后，“逻辑复用”几乎是一件不言而喻的事情了。

### 参数固定-复用存量逻辑

在 multiply3 这个例子中，偏函数除了解决了**函数的元的问题**，还充分地**对现有逻辑进行了复用**。

multiply 函数是一个存量函数，我们的目标函数 **multiply3 其实可以看作是 multiply 函数功能的一个子集**。

这种情况下，与其单独定义一个 `multiply3`，不如试着通过偏函数处理实现对存量逻辑 **`multiply`** 的定制。

`multiply3`、`multiply` 两个函数的逻辑都不算复杂，复用带来的利好体现得还不算特别明显。

但在实际的应用中，我们的存量函数逻辑可以是非常复杂的。

```js
function generateOrderData(type, area, settlement) {
  // 省略数十行难以理解的业务逻辑......
}
```

`generateOrderData` 通过读取订单类型、订单地区、订单结算信息等参数，对订单信息进行重构，最终输出一套能够供 UI 层直接消化的渲染数据。

这样一个函数的改造成本是很高的。

如果我们遇到一个场景，期望能够针对某一个特定区域、特定类型的订单数据进行计算（也就是固定 `type`、`area` 这两个参数），对应函数名为 `generateSpecOrderData(settlement)`。

相比于参考 `generateOrderData` 的具体逻辑重新写一个 `generateSpecOrderData` 出来，直接在 `generateOrderData` 的基础上做偏函数处理不仅可以帮助我们避免大量的重复代码，同时也省去了读函数、理解函数的时间成本——毕竟，**做偏函数处理只需要我们了解函数的入参规则**就可以了。

### 缩小函数的元数-减少重复传参

偏函数不仅仅可以帮我们减少定义函数时的重复代码，还可以帮我们减少调用函数时的重复传参。

在 `generateSpecOrderData` 函数被定义出来之前，我在项目里见到了大量这样的代码：

```js
// 文件 a
const res = generateOrderData('food', 'hunan', normalSettlement)

// 文件 b
const UIData = generateOrderData('food', 'hunan', orderSettlement)  

// 文件 c  
const result = generateOrderData('food', 'hunan', couponSettlement)  
```

不同的调用，重复的传参，重复的 `food` + `hunan`。

而偏函数恰恰就可以把 `food` 和 `hunan` “记忆”下来，帮助我们避免这些重复。

实际上，通用函数为了确保其自身的灵活性，往往都具备“多元参数”的特征。但在一些特定的业务场景下，真正需要动态变化的只是其中的一部分的参数。这时候函数的一部分灵活性对我们来说是多余的，我们反而希望它的功能具体一点。

比如 `generateSpecOrderData` 函数，就对 `type` 和 `area` 并不感冒，只是想动态传入 `settlement` 而已。

这种场景下，偏函数出来扛大旗就再合适不过了。

# 通用柯里化函数的实现

我们简单拆解一下这个函数的任务：

1. 获取函数参数的数量
2. 自动分层嵌套函数：有多少参数，就有多少层嵌套
3. 在嵌套的最后一层，调用回调函数，传入所有入参。

## 获取函数参数的数量

在 JS 里，函数作为一等公民，它和对象一样有许多可访问的属性。其中 Function.length 属性刚好就是用来存放函数参数个数的。

**通过访问函数的 length 属性，就可以拿到函数参数的数量**

## 自动化"套娃"

给定一个嵌套的上限，期望函数能够自动重复执行嵌套，直至达到上限。

而“**嵌套**”的逻辑，摊开来看的话无非是：

1. 判断当前层级是否已经达到了嵌套的上限
2. 若达到，则执行回调函数；否则，继续“**嵌套**”

## 递归边界的判断

curry 函数会在每次嵌套定义一个新的函数之前，先检查当前层级是否已经达到了嵌套的上限。

也就是说每一次递归，都会检查当前是否已经触碰到了递归边界。

一旦触碰到递归边界（嵌套上限），则执行递归边界逻辑（也就是回调函数）。

柯里化的过程，是层层“记忆”每个参数的过程。每一层嵌套函数，都有它需要去“记住”的参数。如果我们递归到某一层，发现此时已经没有“待记忆”的参数了，那么就可以认为，当前已经触碰到了递归边界。

## 编码实现

```js
function curry(func, arity = func.length) {
  //定义一个递归式generateCurried
  function generateCurried(prevArgs) {
    // generateCurried 函数必定返回一层嵌套
    return function curried(nexArg) {
      // 统计目前“已记忆”+“未记忆”的参数
      const args = [...prevArgs, nexArg];
      // 若 “已记忆”+“未记忆”的参数数量 >= 回调函数元数，则认为已经记忆了所有的参数
      if (args.length >= arity) {
        // 触碰递归边界，传入所有参数，调用回调函数
        return func(...args);
      } else {
        // 未触碰递归边界，则递归调用 generateCurried 自身，创造新一层的嵌套
        return generateCurried(args);
      }
    };
    // 调用 generateCurried，起始传参为空数组，表示“目前还没有记住任何参数”
    return generateCurried([]);
  }
}
```

# 范畴论启发下的函数设计模式

函数式编程是一门有着深刻数学背景的学问，这其中一个最为关键的背景就是**范畴论**。

Functor、Monad、SemiGroup、Monoid 这些看上去非常唬人的函数式编程概念，全部源于范畴论。

## 组合问题的链式解法：一个盒子的故事

**从编码的角度看，范畴论在 JS 中的应用，本质上还是为了解决函数组合的问题。**

我们看回 Composition 小节案例中的这几个待组合的函数：

```js
function add4(num) {
  return num + 4
}  

function multiply3(num) {
  return num*3
}  

function divide2(num) {
  return num/2
}
```

如果不借助 compose/pipe 函数，我们还有其它的思路构造声明式的数据流吗？

**范畴论告诉我们，有的，那就是构造一个【能够创造新盒子】盒子。**

```js
const Box = x => ({
  map: f => Box(f(x)),
  valueOf: () => x
})
```

Box 函数的关键在于 map 方法，这个方法被调用时会做两件事情：

1. 执行传入的回调函数 f ，入参为当前 Box 的参数 x
2. 将 f(x) 的计算结果放进一个新的 Box 里

这里我以 add4 为例，尝试把它作为 Box.map 的入参传入：

```js
const newBox = Box(10).map(add4)  
// 输出 14
newBox.valueOf()
```

可以看出，map 执行结束后，newBox 的函数上下文中，已经保存了新的 x 的值，x = 14。

newBox 也是一个 Box，它也是有 map 方法的。

而 map 方法又可以把新的计算结果传递给下一个 Box。

通过反复地创造 Box、反复调用 Box 上的 map 方法，我们就能得到一个声明式的函数调用链：

```js
// 值为 21
const computeBox = Box(10)
                      .map(add4)
                      .map(multiply3)
                      .map(divide2)  
                      .valueOf()
```

在这个调用链中，我们只需要关注每一次 map 调用的入参函数 f，即可得知每一步在执行什么任务。

至于每一步的计算中间态是如何在不同的函数之前流转的、map 又是如何构造新的 Box 的，这些执行细节统统都被 Box 消化掉了。

**这个盒子，其实就是范畴论在函数式编程中的一种表达。**

## 复合运算：范畴论在编程中最核心的应用

什么是范畴？

> A category consists of objects and arrows that go between them.
> 修言直译：一个范畴由一些对象以及这些对象之间的箭头组成。
> ——《Category Theory For Programmers》

我们可以用下图来示意一个范畴：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/738e5974e6b14465bb9d4e24e7d038e6~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

图中的圆圈表示“对象”，这里的“对象”是一个数学术语，我们可以简单地把它理解为程序中的“数据”。

而箭头描述的是对象与对象之间的映射，在范畴论中，它的名字叫“态射”。**“态射”，其实就是函数。**

也就是说，从程序的视角出发，范畴包括了以下两个要素：

1. 一组**数据**的集合（所谓“对象”）
2. 一些操作该数据集合的**函数**（所谓“态射”）

它们恰恰也都是函数式编程理论中的基础要素。

假设 f、g 均为一个范畴下的函数，它们之间的复合运算就可以表示为：

```scss
g(x) · f(x)
```

用 JS 代码表示为：

```js
compose(g, f)
```

注意，**在数学的“复合”中，函数的书写顺序和执行顺序是相反的**，`g · f` 表示先执行 `f` 再执行 `g`。

在我们前面学过的组合工具函数中， **compose 函数遵循的正是这个数学复合顺序，而 pipe 函数遵循的是计算机的逻辑顺序**。

此外，多个函数的复合，还必须要满足一条原则，叫做“结合律”。

这里我用代码来表示“结合律”：假设 f、g、h 均为一个范畴下的函数，它们之间应该具备这样的关系特征：

```js
compose(compose(f, g), h) = compose(f, compose(g, h))
```

**复合运算与结合律，恰恰完整地描述了我们刚学过去不久的“函数组合”思想。**

不仅如此，我甚至还在[一本范畴论专著](https://link.juejin.cn/?target=https%3A%2F%2Fbartoszmilewski.com%2F2014%2F10%2F28%2Fcategory-theory-for-programmers-the-preface%2F)中读到过这样一句话：

> **the essence of a category is composition**
> 修言直译：**范畴论的本质就是复合**

作为一个数学造诣不算很深的程序员，范畴论的本质到底是不是复合，咱也不知道，咱也不敢问，咱也不好下定论。

但是作为一个死磕过函数式编程、并且在大型项目中反复实践过函数式编程的老开发，我可以非常确信地说，**范畴论对于函数式编程最关键的影响，就在于“复合”，或者说在于“函数的组合”**。

因此，绕过范畴论来谈函数式编程，是不恰当的。

尽管形如 Functor、Monad、Semigroup 和 Monoid 这样的“怪名字”，看上去确实有些劝退。但只要我们能把握住【复合】这一本质，恰当地从工程的视角建立起数学名词与函数逻辑之间的关系，再奇葩的名词也不过是我们信手拈来的编码工具而已。

## 此盒又名 Functor（函子）

> **A functor is something that can be mapped over.**
> 修言直译：一个 Functor 就是一个能够被映射的“东西”。

这句话里有两个关键字：“**东西**” 和 “**映射**”。

在 JS 中，这个“**东西**”可以被看作一个盒子、一个容器，它本质上是一种数据结构，一种“类型”。

而“**映射**”借助的就是 map 方法了。

也就是说，**Functor 指的是一个实现了 map 方法的数据结构**。

## 盒子模式下的代码组织方式

Functor、Monad、Semigroup、Monoid......这些由范畴论推导出来的编码模式，我们可以记为“范畴论设计模式”。

在修言的感性认知里，更习惯于把它们看作是“盒子模式”。

因为这些概念的编码表达是非常相近的，它们彼此之间的差异主要在接口实现上。

但纵使你把接口玩出花来，盒子就是盒子，盒子之间必定是有一些共性的。

在深入分析具体的盒子之前，我们不妨先从整体上拿捏一下【盒子的共性】。

### 盒子的实现有哪些规律？

首先，**盒子是一个存放数据的容器**，它的内部肯定会维护一套数据。

这套数据总是以盒子入参的形式传入，总是作为我们整个组合链的起点

同时，**盒子内部可以定义一系列操作数据的函数**。

这些函数未必需要具备【**创建并返回新的盒子**】的能力，但是**关键的函数、决定盒子性质的那些函数**，往往需要具备这个能力。

以 Functor 为例，决定一个盒子能否成为 Functor 的是 map 函数，map 就是 Functor 的“关键函数”，map 必须具有【**创建并返回新的盒子**】的能力（如下图）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb7dc618cccf49b098ea5b2df36fc98b~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

### 盒子的本质是什么？

盒子的本质是一套**行为框架**。

对于盒子来说，其内部容纳的数据是动态的，而数据的**行为模式**是预定义的。

以本文的 Box 为例，Box 函数会创建一个容器，对这个容器来说，入参 x 是未知的，但是针对 x 可以执行 map 行为是确定的。

正是这个“map 行为” ，决定了 Box 容器是一个 Functor。

# Functor(函子)："盒子模式"构造函数组合链

## JS Functor 中的“顶流”——Array

按照上一节我们对 Functor 的定义，Array 其实也属于是 Functor，它也是一种实现了 map 方法的数据结构。

常见的 Array.prototype.map 调用如下：

```js
const fruits = ['apple', 'orange', 'banana', 'papaya']   

const fruitsWithSugar = fruits.map((fruit)=> `Super Sweet ${fruit}`)
```

这里我定义了一个 fruits 数组，数组这个数据结构就可以被看作是一个盒子。

就这个盒子来说，它盛放的数据是一套水果名称的集合。与此同时，它还实现了 map 方法。整体的结构如下图：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b77c699e8dd646ff9d0a592e22dc1aec~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

通过调用 map 方法，我们可以将盒子盛放的源数据映射为一套新的数据，并且新的数据也盛放在 Array 盒子里。

整个过程如下图，这同样是一个藉由 map 方法创造新“盒子”的过程。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58720708a08f494a8dbcfa647884b6cc~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

## “Box”又名 Identity Functor

在本册中，我们认识的第一个 Functor 其实是上一节中实现的 Box（代码如下），而不是 Array。

```js
const Box = x => ({
  map: f => Box(f(x)),
  valueOf: () => x
})
```

这个 Box 其实是一种最简单的 Functor 。在这个 Functor 的 map 里，除了“执行回调f”之外，没有任何其他逻辑。

它的存在有点像60年代登场的初代奥特曼，外形很朴素、招式很简单，但是具备了一个奥特曼应该有的所有要素。

后续出现的中生代。新生代奥特曼等等，都要以它为蓝本制作——它本身就可以被视作是一种“标准”。

这个 Box 还有一个学名，叫做 “Identity Functor”。

```js
const Identity = x => ({
  map: f => Identity(f(x)),
  valueOf: () => x
})
```

为了标识 Functor 的类别，我们可以给它补充一个 inspect 函数：

```js
const Identity = x => ({
  map: f => Identity(f(x)),
  valueOf: () => x,
  inspect: () => `Identity {${x}}`
})
```

没错，Functor 世界里，也是有“类别”一说的。**同一类 Functor，往往具有相同的 map 行为**。

通过往 map 行为里“加料”，我们就可以制作出不同的 Functor。

## Maybe Functor：识别空数据

### Maybe Functor 如何编码

Maybe Functor 在 Identity Functor 的基础上，增加了对空数据的校验。

在细说 Maybe Functor 之前，我们先来看它的代码：

```js
const isEmpty = x => x === undefined || x === null  

const Maybe = x => ({
  map: f => isEmpty(x) ? Maybe(null) : Maybe(f(x)),  
  valueOf: () => x,  
  inspect: () => `Maybe {${x}}`
})
```

Maybe Functor 在执行回调函数 f 之前，会先执行校验函数 isEmpty。

如果入参 x 为空（undefined 或者 null），那么 isEmpty 就会返回 true，接下来 map 方法就不会再执行 f 函数的，而是直接返回一个空的 Maybe 盒子。

对于这个空的 Maybe 盒子来说，既然它盛放的数据是 null，那么无论我以什么样的姿势调用它的 map 方法，也都只能得到一个新的 Maybe(null) 而已。

### Maybe Functor 是如何工作的

```js
function add4(x) {
  return x + 4
}  

function add8(x) {
  x + 8
}

function toString(x) {
  return x.toString()
}  

function addX(x) {
  return x + 'X'
}  

function add10(x) {
  return x + '10'
}

const res = Maybe(10)
              .map(add4)
              .map(add8)
              .map(toString)
              .map(addX)  
              .inspect()

// 输出 Maybe {null}
console.log(res)
```

其中 add8 这个函数是有问题的，我在定义它的时候，手滑了，没有写 return。

这就会导致 add8 在任何情况下都会输出 `undefined`。

也就是说，当执行到 map(add8) 这一行的时候，`Maybe(null)` 已经出现了。

而 `Maybe(null)`相当于是一个“终结者”，只要它一出现，就掐灭了后续所有 map 调用的可能性——这些 map 都只会返回 `Maybe(null)`而已。

### 为什么我们需要 Maybe Functor

试想，如果我们选择的盒子不是 Maybe Functor，而是 Identity Functor，彼时的调用链将会是一个什么样的光景呢？

这里我以身试法，让控制台来告诉大家答案：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28d50bb3f7c14fbb874c88a1d83d40dc~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

没错，报错是必然的。因为 add8 返回的 undefined 畅通无阻地走进了 toString 的逻辑里，toString 将会尝试去调用 undefined 上的 toString 方法，这显然是违法的。

在 JS 里，一旦 throw Error，就意味着整个程序 crash 了。除了当前的函数调用链被终止外，程序后续的其它逻辑也无法再运行了。

而 Maybe Functor 则能够把这个错误控制在组合链的内部。

这就好像我们开车从杭州出发，走高速去上海团建。

赶上饭点，又不想下高速，就直接在车里吃点KFC疯狂星期四解决了。

如果我把吃剩下的汉堡、饮料罐子等东西直接丢出车窗，等待我的将是交警的罚单，相当于我把“异常”丢到外面（高速上）去了，**这是对外部环境的污染，是一种副作用**。

万一我的垃圾不小心砸中了哪个司机，可能就引发连环车祸了，这条高速也就瘫痪了。

更好的做法，是我把垃圾揣到怀里，等下了高速后，找个垃圾桶“输出”一下。

Maybe 就仿佛是交警叔叔那无形的手，它能够控制乘客们把垃圾保留在车厢内部，不到行车终点，绝不乱丢垃圾。

## 拓展：Functor 的“生存法则”

一个合法的 Functor 需要满足以下条件：

1. 恒等性（Identity）
2. 可组合性（Composition）

### 恒等性

所谓“恒等性”，是说如果我们传递了一个恒等函数（Identity Function ）到盒子的 map 方法里，map 方法创建出的新盒子应该和原来的盒子等价。

“恒等函数”长这样：

```js
const identity = x => x
```

以 Array 为例，我们试着在 Array 的 map 方法里传入 identity：

```js
const originArr = [1, 2, 3]  

const identityArr = originArr.map(x=>x)  

// 输出 [1, 2, 3]  
console.log(identityArr)
```

可见，将恒等函数传入 map 后，最终的映射结果 identityArr 和源数据 originArr 是等价的。

这条规则的目的有二：

其一，是为了确保你的 map 方法具备“创造一个新的盒子（Functor）”的能力。

决定一个接口是否“配”做 map 的并不是它的名字，而是它的行为。

而 map 接口对应的行为，就应该是**映射**——把数据从一个盒子映射到另一个盒子里去

其二，是为了确保你的 map 方法足够“干净”。

说到底，map 方法只是一个行为框架，尽管不同的 Functor 会往 map 方法里加不同的料，但这些“料”都不能改变其“行为框架”的本质。

所谓“行为框架”，就意味着 map 方法的主要作用是串联不同的行为（函数），而不是编辑这些行为。

恒等性可以确保 map 方法本身是没有“小动作”的。

### 可组合性

可组合性可以直接用一行代码来解释：

```js
Functor.map(x => f(g(x))) = Functor.map(g).map(f)
```

这个就比较直观了，它要求 Functor 能够**将嵌套的函数拆解为平行的链式调用**。

### Functor，黑盒般强大的组合姿势

“盒子模式”的存在，绝不仅仅是换个姿势实现 compose/pipe 这么简单。

通过往盒子里“加料”，我们可以**在实现组合的同时，内化掉类似空态识别这样的逻辑。**

从“面子”上看，Functor 为我们提供了更加强大的组合能力。

从“里子”上来说，**Functor 在实现函数组合的基础上，确保了副作用的可控**。

# Monad(单子)："嵌套盒子"问题解法

通过往 map 方法里“加料”，我们可以拓展 Functor 的能力，进而定制出不同类型的 Functor。

事实上，除了往 map 方法里“加料”以外，我们还有另一种拓展 Functor 的思路，那就是**在保有 map 方法的基础上，往盒子里添加新的方法**。

而 Monad，正是在这个思路上衍生出来的。

## 何为Monad

Monad 中文叫做“单子”，它是一种**特殊的 Functor**（函子）。

Functor 是“一个实现了 map 方法的盒子”。

而 Monad，则是“一个实现了 flatMap 方法的 Functor”。

也就是说，**Monad 是一个同时实现了 map 方法和 flatMap 方法的盒子**。

## "嵌套盒子"问题

嵌套的盒子，这里指的是在 Functor 内部嵌套 Functor 的情况。

会导致嵌套 Functor 的场景有很多，这里我举两个比较典型的 case：

- 线性计算场景下的嵌套 Functor —— Functor 作为另一个 Functor 的计算中间态出现
- 非线性计算场景下的嵌套 Functor —— 两个 Functor 共同作为计算入参出现

### 线性计算场景下的嵌套 Functor

考虑这样一个函数：它接收一个用户 id 作为入参，用于检查该用户是否在用户列表中。如果是，则取 id 的前三位作为用户的默认昵称，并将昵称和id一起返回；否则，视为异常。

这个函数实现如下:

```js
// 这里省略 isExisted 的实现，大家知道它是用来检查 id 存在性的即可
import isExisted from './utils'  

const getUser = id => {  
  if(isExisted(id)) {
    return {
      id,
      nickName: String(id).slice(0, 3)
    }
  } else {
    throw new Error("User not found")
  }
}
```

借助 Maybe Functor，我们可以简单包装一下这个查找过程：

```js
import isExisted from './utils' 

const isEmpty = (x) => x === undefined || x === null;

const Maybe = (x) => ({
  map: (f) => (isEmpty(x) ? Maybe(null) : Maybe(f(x))),
  valueOf: () => x,
  inspect: () => `Maybe {${x}}`,
});

const getUserSafely = id => {  
  try {
    const userInfo = getUser(id)
    return Maybe(userInfo)
  } catch(e) {
    return Maybe(null)
  }
}
```

这里为了验证方便，我实现一个作弊版的 isExisted，这个函数将会在 id 为 3 的倍数时返回 true，在其他情况下返回 false：

```js
const isExisted = id => id % 3 === 0
```

将这个 isExisted 代入楼上的示例代码，我们就可以检验 getUserSafely 的执行效果了：

```js
const res = getUserSafely(1110021)  

// 输出 'Maybe {[object Object]}'
res.inspect()

// 输出 {id: 1110021, nickName: '111'}
res.valueOf()
```

经过这样一番调整后，getUserSafely 函数在任何情况下都会返回一个 Maybe Functor。

这时，如果我想要在一个 Maybe Functor 的 map 方法中，调用这个 getUserSafely 方法，比如这样：

```js
const targetUser = {
  id: 1100013,  
  credits: 2000,  
  level: 20
}  

const userContainer = Maybe(targetUser)  

const extractUserId = user => user && user.id

const userInfo = userContainer.map(extractUserId)
                          .map(getUserSafely)
```

这一波操作下来，最终得到的 userInfo 就会是一个嵌套的 Maybe Functor：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/486b3aa49706488298dde948dc85103f~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

在这个例子中，我们看到的是一个线性的计算过程：

整个计算过程中，真正作为数据源存在的，有且仅有 targetUser，我们把 targetUser 放进 Maybe 盒子里，然后在这个盒子的基础上一次又一次地调用 map，对源数据 targetUser 做一次又一次的加工。

之所以会出现嵌套的 Functor，是因为在加工 targetUser 的过程中，出现了 getUserSafely() 这样一个返回 Functor 的函数。

这也就是所谓的“**Functor 以计算中间态的形式出现**”。

对于 map 接收的回调参数 f 来说，f 预期的入参往往是数据本身，而不是一个装着数据的盒子。

假设我在 getUserSafely 之后还有一个 cryptoUser 的回调需要执行，也就是说要像下面这样延长原有的调用链：

```js
const crypteUser = (userInfo) => {
  // ..省略一些加密的具体逻辑
}   

const cryptedUserInfo = userContainer.map(extractUserId).map(getUserSafely).map(crypteUser)	
```

cryptoUser 预期中的输入是一个包含了 id 和 nickName 的 user 对象，但实际上它得到的输入却是一个装有 user 对象的 Maybe Functor 盒子。

这显然是要出问题的。

那么如何在不破坏链式结构的前提下，打开这个盒子、把数据拿出来用呢？

这里我们对于解法先按下不表，继续来看嵌套盒子的另一种 case：非线性计算。

### 非线性计算场景下的嵌套 Functor

考虑这样一个函数：它用于计算一个学生的期末成绩，接收两个入参：学生的文化课分数（generalScore)，以及学生的体育课分数（healthScore）。将这两个分数分别乘以各自的权重（文化课对应权重High，体育课对应权重Low），最后得到一个总分。

函数实现如下：

```js
// 该函数将对给定 score 作权重为 high 的计算处理
const highWeights = score => score*0.8

// 该函数将对给定 score 作权重为 low 的计算处理
const lowWeights = (score) => score*0.5

const computeFinalScore = (generalScore, healthScore) => {
  const finalGeneralScore = highWeights(generalScore)  
  const finalHealthScore = lowWeights(healthScore)  
  return finalGeneralScore + finalHealthScore
}
```

我们借助 Identity Functor 对这个计算流程进行改造如下：

```js
const computeFinalScore = (generalScore, healthScore) =>
  Identity(highWeights(generalScore)).map((finalGeneralScore) =>
    Identity(lowWeights(healthScore)).map(
      (finalhealthScore) => finalGeneralScore + finalhealthScore
    )
  );
```

在这个例子中，我们看到的是一个非线性的计算过程：

generalScore 和 healthScore 同时作为数据源存在，都是 computeFinalScore 函数的入参。从逻辑上来说，它们应该是平行的关系。

尽管盒子模式也能够支持逻辑上的平行关系，甚至能够支持异步。但盒子模式的调用总是链式的、线性的。

因此，当我们用盒子模式去实现非线性的计算过程的时候，就不得不像示例这样，把另一个数据源 healthScore 也包装成一个盒子，放进 generalScore 的 map 里面去。

这种情况下，也会导致嵌套 Functor 的产生。

### 嵌套Functor的解法思考

创建 Functor，是一个把数据放进盒子的过程。而消除嵌套，则是一个“打开盒子”的过程。

以线性计算示例中的 userInfo 为例，要打开这个盒子，我们需要执行两次 valueOf：

```js
userInfo.valueOf().valueOf()
```

这个写法，不优雅倒还是其次，关键是这多出来的 valueOf() 调用放在哪里合适呢？

放在下一个 map 的回调里吗？

假设我在 getUserSafely() 之后还有一个 cryptoUser() 回调需要执行，是不是 cryptoUser() 就需要承担起“打开盒子”这个任务了？

但我的 cryptoUser 原本只是一个负责加密用户信息的函数，它没有义务去理解自己所在的执行上下文是什么样的，更没有必要为 getUserSafely() 造成的问题买单。

硬要把“打开盒子”的任务交给 cryptoUser，**反而会污染 cryptoUser 本身的逻辑**。

我们知道，在盒子模式中，盒子的【行为】大体上可以分为两类：

- 回调函数的行为，也就是 map 方法中传入的那个 f。这个 f 是灵活可变的，我们可以通过 map 来组合各种各样不同的 f。我们把 f 记为“**自定义行为**”。
- 盒子本身预设的行为，比如 Functor 盒子中的 map。这个 map 的行为是确定的、不可变的，我们把这样的行为记作“**基础行为**”。

既然“自定义行为”没法干这个“打开盒子”的活，我们就只能往“基础行为”上使使劲儿啦。

### flatMap: 打开盒子, 取出数据

目前看来，我们需要的是这样一个“基础行为”：预期 map(f) 会返回一个嵌套的盒子，并且能够主动把套在里面那个盒子取出来。

说白了，不就是在 map 结束之后，再调一次 valueOf()么：

```js
const Monad = x => ({
  map: f => Monad(f(x)),
  valueOf: () => x,
  inspect: () => `Monad {${x}}`,

  // 新增一个主动打开盒子的方法 flatMap 
  flatMap: f => map(f).valueOf()
})

const monad = Monad(1) 
const nestedMonad = Monad(monad)  

// 试试会发生什么？
nestedMonad.flatMap()
```

如果直接把这段代码丢进控制台运行，你将会得到这样一个报错：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39bd6458506a4c6b8fc6eec881e6c29f~tplv-k3u1fbpfcp-jj-mark:2041:0:0:0:q75.awebp)

这是因为我们试图在 flatMap 中试图去调用另一个与它平级的对象方法 map，由于两个方法实际上并不在同一个上下文里，调用 map 的动作是注定要失败的。

这里就引出了盒子模式中的另一个重要的方法：of()。

### 拓展: of 方法, OPP? FP?

如何把一个盒子中的两个方法，放进同一个上下文里？

答案是创建一个 Class，像这样：

```js
class Monad { 
  constructor(x) {
    this.val = x
  }

  map(f) { 
    return Monad.of(f(this.val)) 
  } 
  
  flatMap(f) { 
    return this.map(f).valueOf()
  }

  valueOf() {
    return this.val
  }
}

Monad.of = function(val) {
  return new Monad(val);
}  

const monad = Monad.of(1)  
const nestedMonad = Monad.of(monad)  

// 输出 Monad {val: 1}，符合“不嵌套”的预期
console.log(nestedMonad.flatMap(x => x))
```

对于 JS 来说，FP 和 OOP 之间并没有想象中的那么泾渭分明。

有一些语言是天然有“人设”的，比如：当你写 Java 的时候，你就只想 OOP；当你写 Haskell 的时候，你就只想 FP。

相比之下，JS 就中庸得多了。

从语言实现的层面来说，它的 Function 就是 Object，Object 也是 Function......FP 和 OOP 之间俨然是一种“你中有我，我中有你”的暧昧关系。

从范式本身来看，我们写 FP 确实是要和 OOP 不一样的，这一点至少要在编码风格上体现出来。

也正是出于这个动机，FP 借助 Class 实现 Functor 和 Monad 这类盒子的时候，并不会把“我是一个 Class”这件事摆在明面上。

一个最典型的小细节，就是如上面这个示例一样，**把构造函数的调用包装成一个 of 方法，以此来摆脱 `new XXX()` 这样高度不和谐的 OOP 代码**。

### flatMap 的极简实现

书归正传，其实在我们这个案例中，根本用不到 of 来创建上下文。

map 方法做了什么事情？map 方法执行了 f 回调，然后把执行结果 f(x) 放进了盒子里。

flatMap 想要做什么事情？flatMap 方法想要把这个执行结果 f(x) 从盒子里拿出来。

既然 flatMap 想要的是 f(x)，那它一开始直接不把 f(x) 往盒子里放不就行啦？

所以咱的 flatMap 也可以这样实现：

```js
const Monad = x => ({
  map: f => Monad(f(x)),
  // flatMap 直接返回 f(x) 的执行结果
  flatMap: f => f(x),

  valueOf: () => x,
  inspect: () => `Monad {${x}}`,
})
```

整体的结构看上去很简单，实际上它也就是这么简单。

我们把非线性计算案例中 Identity Functor 替换成 Monad，map 替换成 flatMap，嵌套盒子的问题瞬间得解：

## 总结: map VS flatMap

写了这么多代码，我们最后来总结一下 flatMap 的特征。

flatMap 和 map 其实很像，区别在于他们对回调函数 `f(x)` 的预期：

**map 预期 `f(x)` 会输出一个具体的值**。这个值会作为下一个“基础行为”的回调入参传递下去。

而 **flatMap 预期 `f(x)` 会输出一个 Functor**，它会像剥洋葱一样，把 Functor 里包裹的值给“剥”出来。确保最终传递给下一个“基础行为”的回调入参，仍然是一个具体的值。

符合这个特征的方法不一定总是叫 flatMap，它有许多别名：chain、fold、flatten......等等等等。

不管这个方法叫啥，只要它在 Functor 的基础上，实现了楼上描述的这个“剥洋葱”般的逻辑，它都足以将一个 Functor 拓展为 Monad。

毕竟，盒子的本质，是一套“**行为框架**”。

决定一个盒子能否成为 Functor 或 Monad 的，并不是方法的命名，而是方法的**行为**。

# Semigroup(半群) 与 Monoid(幺半群)

Functor（函子）、Monad（单子）一样，Semigroup（半群）和 Monoid（幺半群）也是正经八百的范畴论名词。

Semigroup（半群）可以通过我们最熟悉的加法乘法来推导，而 Monoid（幺半群）又可以基于 Semigroup 来推导。

## Semigroup（半群） 的数学背景

### 理解“结合律”与“闭合”

加法和乘法有两个关键的共性：

1. 它们都满足结合律。
2. 它们都是闭合的。

#### 结合律

在加法和乘法运算中，在各个数字位置不变的情况下，重新排列表达式中的括号，并不会影响最终的计算结果。 这样的运算就是符合结合律的。

#### 闭合

在数学中，闭合意味着我们对某个集合的成员进行运算后，生成的仍然是这个集合的成员。

整数做完加法/乘法后，得到的计算结果也是一个整数。这也就是所谓的“闭合”。

### 理解数学中的 Semigroup

理解了“**结合律**”和“**闭合**”，其实也就理解了什么是数学中的 **Semigroup**：

> 在数学中，半群是闭合于结合性二元运算之下的集合 S 构成的代数结构。——wikipedia

【划重点】：**闭合、结合性、二元运算**

> “二元运算”这里的“元”，映射到程序里就是指函数参数的数量。

Functor（函子）盒子，Monad（单子）盒子，这两个盒子有一个明显的共性——它们的计算单元都是**一元函数**

而 Semigroup 直接把“二元运算”打在了公屏上，明牌告诉咱们 Semigroup 盒子的“基本行为”函数应该是一个**二元函数**。

## Semigroup 在函数式编程中的形态

在整数运算的加法/乘法中，+/* 是一个运算符，可以用来计算两个任意的整数以获得另一个整数。因此，加法运算/乘法运算在所有可能的整数集合上形成一个 Semigroup。

这个逻辑其实是可以直接往 JS 中做映射的——在 JS 中，我们同样有**运算符**、有包括整数在内的各种**数据类型**，同样可以实现各种各样的**计算过程**。

### JS 语言中的 Semigroup

因此，首先我们可以明确的是，整数的加法和乘法运算即便是到了 JS 里面，也是标准的 Semigroup。

除了整数的加法和乘法之外，常见的几个 JS 中的 Semigroup 还包括：

- (boolean, &&)，布尔值的“与”运算
- (boolean, ||)，布尔值的“或”运算
- (string, +/concat) ，**字符串的拼接（并集）运算**
- (Array, concat)，**数组的拼接（并集）运算**

#### 数组和字符串的共性

- 数组取并集运算能够形成一个 Semigroup（半群），字符串取并集运算也能够形成一个 Semigroup（半群）。
- 数组取并集的方法是 `concat()`，字符串取并集的方法也是 `concat()`。

但与其说这是一种巧合，不如说这是一种**模式**。

因为在函数式编程的实践中，**Semigroup 盒子的接口方法（也就是我们常说的“基础行为”）正是这个 `concat()`！**

### 函数式编程中的 Semigroup 盒子

Semigroup 中总是有以下两个要素：

- **运算数**：参与运算的数据。比如加法运算中的 1、2、3，与运算中的 true、false 等。
- **运算符**：执行运算的符号。比如 +、*、||、&& 等等等等......

映射到函数式编程来看的话，运算数可以理解为**函数的入参**，运算符则可以被抽象为**一个 concat() 函数**。

```js
// 定义一个类型为 Add 的 Semigroup 盒子
const Add = (value) => ({
  value,  
  // concat 接收一个类型为 Add 的 Semigroup 盒子作为入参
  concat: (box) => Add(value + box.value)
})   

// 输出一个 value=6 的 Add 盒子
Add(1).concat(Add(2)).concat(Add(3))
```

在这段代码中，我们将运算符 `concat()` 和运算数 `value` 都包裹在了一个名为 `Add` 的盒子中。

`concat()` 接口能够同时拿到**当前盒子**的运算数 `value`和**下一个盒子**的运算数 `box.value`，它会基于这两个运算数执行**二元运算**，最后把**二元运算**的结果包裹在一个新的 `Add` 盒子中返回。

`concat()` 接口是 Semigroup 盒子的核心，它能够消化任何可能的 Semigroup 运算。**`concat()`接口宛如一条【线】，它能够将链式调用中前后相邻的两个【点】（也就是“盒子”）串联起来，进行盒子间的二元运算。**

我们可以用`Semigroup(x).concat(Semigroup(y))` 来表示一个最小的二元运算单元，一个 Semigroup 盒子的二元运算过程就如图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/347fdeeb805b47af9dc37a96cfe5f6e9~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

`concat()`函数能够消化任何可能的 Semigroup 运算。我们把加法盒子 `Add` 中的 `concat()` 函数稍作调整，把加号替换为乘号，就能够得到一个乘法运算的 Semigroup 盒子：

```js
// 定义一个类型为 Multi 的 Semigroup 盒子
const Multi = (value) => ({
  value,  
  // concat 接收一个类型为 Multi 的Semigroup 盒子作为入参
  concat: (box) => Multi(value * box.value)
})   

// 输出一个 value=60 的 Multi 盒子
Multi(3).concat(Multi(4)).concat(Multi(5))
```

形如 Add 盒子、Multi 盒子这样，实现了 `concat()`接口的盒子，就是 **Semigroup**（半群）盒子。

## 由 Semigroup 推导 Monoid

理解了 Semigroup（半群），也就理解了 Monoid（幺半群）。

> A *monoid* is an algebraic structure intermediate between *semigroups* and groups, and is a *semigroup* having an identity element. ——Wikipedia
> 修言直译：Monoid 是一种介于 Semigroup 和 group 之间的代数结构，它是一个拥有了 identity element 的半群。

【划重点】：Monoid 是一个拥有了 identity element 的半群——**Monoid = Semigroup + identity element**

那么什么是 identity element 呢？

这个东西在数学上叫做“单位元”。 单位元的特点在于，**它和任何运算数相结合时，都不会改变那个运算数**。

在函数式编程中，单位元也是一个函数，我们一般把它记为“`empty()` 函数”。

**也就是说，Monoid = Semigroup + `empty()` 函数。**

`empty()` 函数的实现取决于运算符的特征。比如说，加法运算的单位元，就是一个恒定返回 Add(0) 的函数：

```js
// 定义一个类型为 Add 的 Semigroup 盒子
const Add = (value) => ({
  value,  
  // concat 接收一个类型为 Add 的 Semigroup 盒子作为入参
  concat: (box) => Add(value + box.value)
})   


// 这个 empty() 函数就是加法运算的单位元
Add.empty = () => Add(0)

// 输出一个 value=3 的 Add 盒子
Add.empty().concat(Add(1)).concat(Add(2))
```

`empty()` 是单位元的代码形态。单位元的特点在于，**它和任何运算数相结合时，都不会改变那个运算数**。 也就是说，`empty()`**函数的返回值和任何运算数相结合时，也都不会改变那个运算数。**

```js
const testValue = 1  
const testBox = Add(testValue)  

// 验证右侧的 identity（恒等性），rightIdentity 结果为 true
const rightIdentity = testBox.concat(Add.empty()).value === testValue
```

还是把 `empty()`放在 `concat()`运算符的左边：

```js
const testValue = 1  
const testBox = Add(testValue)    

// 验证左侧的 identity（恒等性），leftIdentity 结果为 true
const leftIdentity = Add.empty().concat(testBox).value === testValue
```

`empty()` 总是不会改变运算符另一侧的 `testBox` 盒子的值，这就是“单位元”特征的体现。

**任意一个 Semigroup 盒子与** `empty()`**一起进行`concat()`二元运算时，其运算结果都一定恒等于那个 Semigroup 盒子本身的值。**

**形如这样的** `empty()`**函数，就是“单位元”思想在函数式编程中的实践。**

**而实现了** `empty()`**函数的 Semigroup 盒子，就是 Monoid 盒子。**

# Monoid、Compose中的复合本质

## `concat()` 与 `reduce()` ：从二元运算到 n 元运算

“连点成线”般的二元运算，可不是 `concat()`的专利。在遇到 `concat()`之前，我们其实已经和具备“二元运算符”特征的函数打过不少交道了。

没错，我说的就是 `Array.prototype.reduce(callback, initialValue)` 里的那个 `callback()`。

`callback()`和 `concat()`的工作流是极为相似的。

我们首先来看 `concat()`接口组织起来的二元运算工作流，考虑这样一个链式的 `concat()` 调用：

```js
// 定义一个类型为 Add 的 Monoid 盒子
const Add = (value) => ({
  value,  
  // concat 接收一个类型为 Add 的 Monoid 盒子作为入参
  concat: (box) => Add(value + box.value)
})   


// 这个 empty() 函数就是加法运算的单位元
Add.empty = () => Add(0)  

const res = Add(1)
              .concat(Add(2))
              .concat(Add(3))
              .concat(Add(4))

// 输出 10
console.log(res.value)
```

它拉起来的二元运算工作流如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecc54367df754726addbebc84c708e8a~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

接着我们考虑这样一个 reduce 调用：

```js
const callback = (x, y) =>  x + y   

const res = [1, 2, 3, 4].reduce(callback, 0) 

// 输出 10
console.log(res)
```

它拉起来的二元运算工作流如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d64b4bd8375473eb22e94311e84b9e0~tplv-k3u1fbpfcp-jj-mark:2268:0:0:0:q75.awebp)

这两张图不能说是一模一样吧，只能说是十分相似。

别的不说，就“**两两组合，循环往复**”这个流程特征来说，两者是高度一致的。

主要的区别在于，`concat()`方法的宿主可以是**任意一个 `Semigroup/Monoid` 盒子**，而 `callback()`和 `reduce()`一起，依附于数组数据结构而存在。

最重要的是，`reduce()`还能够通过反复地调用`callback()`，来**将有限的二元运算延伸至无限的 n 元运算**。

`concat()` 和 `callback()` 这么相似，`concat()`是不是也能和 `reduce()`打配合呢？

到这里，图穷匕见，华点也呼之欲出： 在实践中，**Monoid 常常被放在** `reduce` **的** `callback` **中参与计算。**

以加法运算为例，我们重新审视一下 Monoid 做加法的姿势：

一个 `concat()`函数一次只能求和两个数字，一旦数字多起来，我们就不得不重复执行许多次“将数字放进 Add 盒子，再调用 Add 盒子上的 `concat()`方法”这个过程。

如果能把 `Add` 盒子放进 `reduce()` 的 `callback()`里，就可以省去这类重复的操作。顺着这个思路，我们可以将楼上的链式调用改造如下：

```js
// 定义一个类型为 Add 的 Monoid 盒子
const Add = (value) => ({
  value,  
  // concat 接收一个类型为 Add 的 Monoid 盒子作为入参
  concat: (box) => Add(value + box.value)
})   
Add.empty = () => Add(0)     


// 把 Add 盒子放进 reduce 的 callback 里去
const res = [1, 2, 3, 4].reduce((monoid, num) => monoid.concat(Add(num)), Add(0))
```

如此，我们便能够借助 `reduce()`方法，写出更加简洁的盒子代码。

## `empty()`函数解决了什么问题

**`empty()`函数能够解决 n 元运算中的计算起点（也即“初始值”）不存在的问题**，这一点我们可以结合楼上的例子来看。请大家关注到 `reduce()`调用这一行：

```js
// 把 Add 盒子放进 reduce 的 callback 里去
const res = [1, 2, 3, 4].reduce((monoid, num) => monoid.concat(Add(num)), Add(0))
```

`reduce()`接口缺少了初始值，会导致第一次的 `monoid.concat()`调用失败。

我在加法 Monoid 的代码里，使用 `Add(0)`作为计算起点，顺利地规避掉了这个问题。那么如果我们的 Monoid 从加法 `Add`变为了乘法 `Multi`，计算起点的值又该如何调整呢？

其实，无论是 Add 还是 Multi，无论是求和还是求积，我们对计算起点的预期总是一致的——**它得是一个 Monoid/Semigroup 盒子（能够提供** `concat() `**接口），并且它的值不应该对计算结果产生任何影响**。

也就是说，**计算起点和任何运算数结合的时候，都不应该改变那个运算数。** 细品一下，这说的不就是 Monoid 的单位元——`empty()`函数么？

循着这个思路，我们不难想到，乘法盒子的计算起点应该是 Multi(1)，也就是 `Multi.empty()` 的返回值：

```js
// 定义一个类型为 Multi 的 Monoid 盒子
const Multi = (value) => ({
  value,  
  // concat 接收一个类型为 Multi Monoid 盒子作为入参
  concat: (box) => Multi(value * box.value)
})     
Multi.empty = () => Multi(1)     


// n 元运算的计算起点是单位元函数 empty()
const res = [1, 2, 3, 4].reduce((monoid, num) => monoid.concat(Multi(num)), Multi.empty())
```

到这里，`empty()`在实践中的作用就非常清晰了——当二元运算被拓展为 n 元运算时，我们需要 `Monoid.empty()`作为计算起点，进而规避空值的问题。

## `concat()` + `reduce()` 推导 `foldMap()` 函数

这里我用 Monoid 来表示一个任意的 Monoid 盒子，用 arr 来表示一个任意的数组，`concat()`+`reduce()`的组合代码就可以抽象如下：

```js
arr.reduce((monoid, value) => monoid.concat(Monoid(value)), Monoid.empty())
```

在实践中，这段代码还有另一种写法，那就是先调用 `map()`，将数组中的所有元素都包装成 Monoid，然后再进行 `reduce()`调用，像这样：

```js
arr
  .map((value)=> Monoid(value))
  .reduce((monoid, currentMonoid) => monoid.concat(currentMonoid)), Monoid.empty())
```

无论是直接 `reduce()`，还是先 `map()`再 `reduce()`，它们最终的目的都是“**实现 n 元的 Monoid 盒子运算**”。

在实际的项目中，一旦我们用到了盒子模式，“实现 n 元的 Monoid 盒子运算”就总是会成为一个非常高频的操作。正因为如此，我们一般不会等到使用的时候再去手动实现这些代码，而是会把这坨逻辑提取到一个工具函数里，以备不时之需。这个工具函数的名字，就叫做`foldMap()`。

对于`foldMap()`来说，“实现 n 元的 Monoid 盒子运算”这个功能是固定的，而“运算符（也即 Monoid 盒子的类型）”以及“运算数（也即数组的内容）”则是动态的。动态信息总是以函数参数的形式传入。也就是说，`foldMap()`函数的入参，就是楼上模板代码中的 `Monoid` 和 `arr`。

分析至此，`foldMap()`的代码也就写完了：

```js
// 这里我以 map+reduce 的写法为例，抽象 foldMap() 函数
const foldMap = (Monoid, arr) => 
                  arr
                    .map(Monoid)
                    .reduce(
                      (prevMonoid, currentMonoid) => prevMonoid.concat(currentMonoid),
                      Monoid.empty()
                    )  

// 定义 Multi 盒子
const Multi = (value) => ({
  value,  
  concat: (box) => Multi(value * box.value)
})     
Multi.empty = () => Multi(1)   

// 使用 foldMap 实现 Multi 盒子求积功能   
const res = foldMap(Multi, [1, 2, 3, 4])   

// 输出 24， 求积成功
console.log(res.value)
```

## 从 Monoid 到函数组合

### compose 特征：两两组合、循环往复

compose 的过程，也是一个“**两两组合、循环往复**”的过程，是一个**由二元运算拓展至 n 元运算的过程**。

一个大的 compose，可以看作是无数个小的 compose 单元的组合。每个 compose 单元，都只会组合两个函数。这个最小的 compose 单元，用代码表示如下：

```js
const compose = (func1, func2) => arg => func1(func2(arg))
```

### compose 与 Monoid 的共性

Monoid = Semigroup + `empty()`函数。

我把 Semigroup 的特征代入这个公式，就能得到 Monoid 的特征：Monoid = 闭合 + 结合律 + 二元运算 + `empty()` 函数

Monoid 所具备的这些特征，compose 全中。

#### compose 是闭合的二元运算

我们不妨把“组合（compose）”这个动作看作一个运算符，把参与组合的函数看作是运算数，那么总是有：

```js
func1 compose func2 = func3
```

一个函数 compose 另一个函数，总是能得到一个新的函数。运算符没有改变运算数的类型，因此 compose 运算是一个闭合的运算。

同时，compose 运算是一个“两两组合”的运算，也符合二元运算的特征。

#### compose 是符合结合律的

对于任意的三个函数 func1、func2、func3，总是有这样的规律：

```js
compose(
  compose(func1, func2),
  func3
) = compose(
  func1,
  compose(func2, func3)
)
```

### compose 的单位元如何实现

分析至此，`compose()`已经命中了 Semigroup 的全部特征：闭合、结合律、二元运算。它与 Monoid，只差一个 `empty()`单位元函数了。

`compose()`的单位元函数，就是 `Identity Function`（恒等函数）

```js
const identity = x => x
```

恒等函数本身不包含任何的计算修改逻辑，它所做的仅仅是吃进一个入参，然后把它原封不动地吐出来，俗称“透传”。 一个“透传”函数和任何函数结合，都不会改变那个函数的运算结果。因此，恒等函数就是函数组合的“单位元”。

至此我们发现，当我们把 `compose()`的最小计算单元视作一个运算符、把函数组合视作一个代数运算后，我们竟能从中挖掘出 `Monoid`的所有特征。

## 范畴的本质是复合

**范畴的本质是复合。 从实践的角度看，范畴论在 JS 中的应用，本质上还是为了解决函数组合的问题。**

`compose()`函数组合的是函数本身，而 `foldMap()`函数组合的则是不同的 Monoid 盒子。

那么如果更进一步地问：组合（Composition）是一个什么样的过程？

这两种函数消化的入参类型不同，函数体的编码实现不同，但它们的逻辑特征却高度一致：**通过多次执行二元运算，将有限的二元运算拓展为无限的 n 元运算。**

两两结合，循环往复，聚沙成塔——这，就是“组合”过程。

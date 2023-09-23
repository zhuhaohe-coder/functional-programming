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

# 面向对象 VS 函数式

FP 和 OOP 是两种截然不同的软件世界观。无论是辩证地看待两种世界观，还是单纯地“信仰”其中某一种，都需要建立在充分理解和掌握两者的前提上。

遗憾的是，在我们所生存的现实世界中，OOP 往往主宰了很多开发者的思维。当你手里只有一把锤子的时候，你看什么都像钉子。

> 这就好像一个人一生只见过一种世界观、也只能理解这一种世界观，由于他不听、不看、不思考任何其它的世界观，于是只能被迫地狂热痴迷这唯一的一种世界观，这就谈不上信仰与否，而是被世界观所奴役了。

## 软件复杂度的两种解法

作为两种截然不同的软件世界观，FP 和 OOP 的差异是巨大的，两者的效用却又是高度一致的，**它们都能够帮助我们解决软件复杂度的问题**。

- **抽象**：OOP 将数据与行为打包抽象为对象，对象是一等公民；而 FP 将行为抽象为函数，数据与行为是分离的，函数是一等公民。
- **代码重用**：OOP 的核心在于继承，而 FP 的核心在于组合。

## 抽象: 谁是一等公民?

**重行为、轻数据结构**的场景---FP

**重数据结构、轻行为**的场景---OOP

### FP：函数是一等公民

在 FP 的世界里，函数是绝对的主角。

以网课需求为例，它是一个典型的**动词**占据主导的需求：喜欢、注册、清空、检查......全都是对行为的描述，显然，这是一个行为密集型的需求。并且需求中的数据源 `user` 是清晰的、确定的。整个功能流程梳理下来，其实是一个点对点的数据转换过程。这样的场景，用 FP 求解是再舒服不过的。

FP 构造出的程序，就像一条长长的管道。管道的这头是源数据，管道的那头是目标数据——数据本身是清晰的、确定的、不可变的。**数据不是主角，那些围绕数据展开的行为才是主角。“行为”也就是函数**，一个小的行为单元，就仿佛是一根小小的管道。我们关心的，是如何把一节一节简单的小管道组合起来，进而得到一个复杂的、功能强大的大管道。

### OOP：对象是一等公民

OOP 思想起源于对自然界的观察和抽象，它是对现实世界的一种隐喻。“类”的概念在我们生活中本来就很常见，图书馆的书籍分类、生物学的“界门纲目科属种”、社会上对不同职业不同身份的人的分类等等......这些都是在**通过寻找事物之间的共性，来抽象出对一类事物的描述**。

既然描述的是【事物】，那么 OOP 的世界毫无疑问是一个**名词**占据主导的世界。在 OOP 的语境下，我们关注的不是一个个独立的函数单元，而是一系列有联系的属性和方法。**我们把相互联系的属性和方法打包，抽象为一个“类”数据结构**。当我们思考问题的时候，**我们关注的不是行为本身，而是谁做了这个行为，谁和谁之间有着怎样的联系**。

以游戏场景为例：在游戏的过程中，选手这个角色存在着大量可能的变体；不同的选手之间还会有大量的关系逻辑需要考虑；在每个选手的内部，还会维护自己独有的状态信息（比如`CrazyPlayer`的余额信息）。此时，摆在我们面前的不再是一个个平行的数据管道，而是一张复杂交错的实体关系网。这样的业务场景下，用 OOP 建模会更加贴合我们人类的思维习惯——毕竟，OOP 本身也是对现实世界的一种隐喻嘛！

## 代码重用: 组合 VS 继承

面向对象（OOP）的核心在于继承，而函数式编程（FP）的核心在于组合。

组合的过程是一个两两结合、聚沙成塔的过程；

继承则意味着子类在父类的基础上重写/增加一些内容，通过创造一个新的数据结构来满足的新的需求。

### 继承的问题

我们知道，子类和父类之间的关系，是一种紧耦合的关系——父类的任何变化，都将直接地影响到子类。而当我们定义父类的时候，其实并不能预测到未来的变化，无法预测这个父类未来会变成什么样子。借助继承来实现代码重用时，我们总是需要非常小心——我们修改任何一个类的时候，都要考虑它是否会对其它的类带来意料之外的影响。而当继承层次过深的时候，这份”小心“往往使得我们寸步难行。

在 OOP 的语境下，我们解决“继承滥用”问题的一个重要方法，就是引入“组合”思想。

### 为 OOP 引入“组合”思想

以楼上的游戏案例为蓝本。我们目前已经创造了三个 Class，它们分别是：

- BasketballPlayer：篮球选手，会灌篮（ `slamdunk()` ) ，会跳跃（ `jump()` )
- FootballPlayer：足球选手，会射门( `shot()` ），会狂奔（ `runFast()` ）
- CrazyPlayer：疯狂号选手，会飞（ `fly()` ）

游戏版本的迭代总是很快的。没过几天，李雷的老板坐不住了，他嫌疯狂号选手赚钱不够快。怎么办呢？升级！升级一个大满贯选手，它既能灌篮、又能射门、还会飞。有这么多神技能，就不怕没人愿意充钱啦！

但是请注意，这个大满贯选手（`SuperPlayer`）只需要具备那些最酷炫的能力：比如它只需要篮球选手的“灌篮”能力，不需要“跳跃”能力；它只需要足球选手的“射门”能力，不需要“狂奔”能力。这也合理，毕竟，人家都会飞了，也就不需要跑和跳了。

此时，如果我们借助继承来解决这个问题，就得让`SuperPlayer`同时继承 3 个 Class，用伪代码示意如下：

```js
js复制代码SuperPlayer
  extends BasketballPlayer 
    extends FootballPlayer
      extends CrazyPlayer
```

这样一来，`SuperPlayer` 就被迫拥有了它并不需要也并不想要的的“射门”和“狂奔”能力。

但这还不是最糟糕的，最糟糕的是，这个 `SuperPlayer` 它其实既不是篮球选手、也不是足球选手、也不是疯狂号选手——`SuperPlayer` 和篮球/足球/疯狂号选手的交集，其实仅限于一个灌篮/射门/奔跑动作而已。今后篮球/足球/疯狂号选手新增的任何属性和方法，都很可能是和我 `SuperPlayer` 没有关系的，

SuperPlayer 选手想要的明明只有几个特定的函数，我们却不得不曲线救国、把它变成一个既是篮球选手、又是足球选手、同时还是疯狂号选手的缝合怪。这一缝不要紧，以后任何一种选手的 Class 发生变更，都会直接影响到 SuperPlayer 这个最能赚钱、也最特别的选手。风险这么大，谁还敢再动那些父类呢？

这个例子虽然不复杂，但是已经足够把继承带来的问题具象化。此时我们不妨像下面这样，为程序引入组合：

```js
js复制代码// 这个函数单独处理 slamDunk 能力
const getSlamDunk = (player) => ({
  slamDunk: () => {
    return `${player.name} just dunked a basketball`
  }
})

// 这个函数单独处理 shot 能力
const getShot = (player) => ({
  shot: () => {
    return `${player.name} just shot the goal`
  }
})

// 这个函数单独处理 fly 能力
const getFly = (player) => ({
  fly: () => {
      if(player.money > 0) {
          // 飞之前，先扣钱
          player.money--
          // 飞起来啦，好帅呀！
          return `${player.name} is flying!So handsome!`
      }
      // player.money <= 0，没钱还想飞，你也配？（狗头
      return 'you need to give me money'
    }
})

const SuperPlayer = (name, money) => {
  // 创建 SuperPlayer 对象
  const player = {
    name,  
    sport: 'super',  
    money
  }

  // 组合多个函数到 player 中
  return Object.assign(
    {},  
    getSlamDunk(player),
    getShot(player),  
    getFly(player)
  )
}

const superPlayer = SuperPlayer('xiuyan', 20)  
// 'xiuyan just dunked a basketball'
superPlayer.slamDunk()  
// 'xiuyan just shot the goal'
superPlayer.shot() 
// 'xiuyan is flying!So handsome!'
superPlayer.fly()
```

这样一来，我们就用组合的方法，改造了原有的继承链，一举端掉了继承所带来的各种问题。

## 小结

在“抽象”这个话题下，我支持大家遵循自己的思维习惯，选择自己最认同的一种思维模式组织自己的程序。但在“代码重用”这个话题下，我的观点会更加鲜明一些——**组合就是比继承好，能用组合就不要用继承**。

组合作为一种代码重用的思路，它固然是 FP 的关键特征，但它却并不是 FP 的专利。很多时候，即便我们用 OOP 去抽象整体的程序框架，也不影响我们在程序的局部使用“组合”来解决代码重用的问题。楼上的 `SuperPlayer`就是一个很好的例子。在实现 `SuperPlayer`的过程中，我们并没有改变原有的程序格局，也就是说，整个游戏仍然可以是基于 OOP 来抽象角色和角色关系的。我们仅仅是在需要实现代码重用时，引入了组合这种方法。

JS 语言非常特别，它的对象和函数之间没有特别清晰的边界，函数和对象都可以视作是一等公民（甚至函数本身就是一种可执行的对象）。在项目中混合使用多种范式开发，对于我们来说是极度正常的一件事情——**即使选择了 FP 作为程序的主要范式，仍然免不了要使用对象这种数据结构；即使选择了 OOP 作为程序的主要范式，也避不开函数这种抽象方式。**因此我始终认为，**OOP 和 FP 之间并不是互斥/对立的关系，而是正交/协作的关系**。

# 函数式编程在React中的实践

React 是一个用于构建用户界面的 JS 库（严格来说是库，但“框架”似乎也已经成为一种约定俗成的叫法，下文不做区分）。
尽管它不是一个严格意义上的函数式编程框架，但它在设计和实践中很大程度上受到了函数式思想的影响，“含 FP 量”较高。

## 框架设计

### 宏观设计：数据驱动视图

众所周知，React 的核心特征是“**数据驱动视图**”，这个特征在业内有一个非常有名的函数式来表达：

![img](D:\QDstudy\前端笔记合集\书籍\JavaScript\函数式编程-code\README.assets\477d33a011234bd5b99ecd739c462cd1tplv-k3u1fbpfcp-jj-mark1701000q75.webp)

这个表达式有很多的版本，一些版本会把入参里的 data 替换成 state，但它们本质上都指向同一个含义，那就是 **React 的视图会随着数据的变化而变化**。

#### React 组件渲染的逻辑分层

随手写一个 React 组件：

```jsx
const App = () => {
  const [num, setNum] = useState(1)  

  return <span>{num}</span>
}
```

用 babel 转换一遍这段代码，可以得到下图右侧的结果：

![img](D:\QDstudy\前端笔记合集\书籍\JavaScript\函数式编程-code\README.assets\92f82d1da81f45cfbee769d82e0a8967tplv-k3u1fbpfcp-jj-mark1701000q75.webp)

**JSX 的本质，是** `React.createElement` **这个 JS 调用的语法糖。**

`React.createElement`做了什么事情？它能够直接渲染出真实的 DOM 组件吗？

答案是不能，`React.createElement`计算出来的那玩意儿叫做虚拟 DOM，虚拟 DOM 仅仅是对真实 DOM 的一层描述而已。要想把虚拟 DOM 转换为真实 DOM，我们需要调用的是 `ReactDOM.render()`这个 API ：

```jsx
// 首先你的 HTML 里需要有一个 id 为 root 的元素
const rootElement = document.getElementById("root")
// 这个 API 调用会把 <App/> 组件挂载到 root 元素里
ReactDOM.render(<App />, rootElement)
```

也就是说，在 React 组件的初始化渲染过程中，有以下两个关键的步骤：

- 结合 state 的初始值，计算 `<App />` 组件对应的**虚拟 DOM**
- 将虚拟 DOM 转化为**真实 DOM**

相似地， React 组件的更新过程，同样也是分两步走：

- 结合 state 的变化情况，计算出虚拟 DOM 的变化
- 将虚拟 DOM 转化为真实 DOM

现在我们再回头看 `UI = f(data)`这个公式。

其中 `data`这个自变量，映射到 `React`里就是 `state`。

> 注：社区中还有 `UI=f(state, props)`这种写法，这种写法认为 React 中的数据需要被严格地分类为 `props`和`state`。我个人更认同 `UI = f(data)`或`UI = f(state)`这种写法，因为子组件的 `props`本身也是父组件的 `state`。倘若我们把整个 React 应用看作一个大的整体，而不是去看父子组件之间的微观关系，那么 React 应用中的驱动 UI 变化的数据其实只有 `state`。

`f()`函数则对应的是 React 框架内部的运行机制，结合上文的分析，这套运行机制整体上可以分为两层（如下图所示）：

![img](D:\QDstudy\前端笔记合集\书籍\JavaScript\函数式编程-code\README.assets\41844dba075f419b8cc76a3dae2190b5tplv-k3u1fbpfcp-jj-mark1701000q75.webp)

- **计算层**：负责根据 state 的变化计算出虚拟 DOM 信息。这是一层较纯的计算逻辑。
- **副作用层**：根据计算层的结果，将变化应用到真实 DOM 上。这是一层绝对不纯的副作用逻辑。

将较纯的计算与不纯的副作用分离，从这样的宏观设计中，我们已经可以初步窥得函数式编程的影子。

在 `UI = f(data)` 这个公式中，数据是自变量，视图是因变量。

而**组件**作为 React 的核心工作单元，其作用正是**描述数据和视图之间的关系**。

也就是说，若是把这个公式代入到微观的组件世界中去，那么 React 组件毫无疑问对应的就是公式中的 `f()` 函数。

### 组件设计：组件即函数

> 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。 ——React 官方文档

定义一个 React 组件，其实就是定义一个吃进 props、吐出 UI（注意，此处的 UI 指的是对 UI 的描述，而不是真实 DOM，下文同） 的函数：

```jsx
function App(props) {
  return <h1>{props.name}</h1>
}
```

如果这个组件需要维护自身的状态、或者实现副作用等等，只需要按需引入不同的 Hooks（下面代码是一个引入 `useState`的示例）：

```jsx
function App(props) {
  const [age, setAge] = useState(1)
  
  return (
    <>
      <h1> {props.name} age is {age}</h1>
      <button onClick={() => setAge(age+1)}>add age</button>
    </>
  );
}
```

**从趋势上看，函数组件+ React-Hooks 才是 React 的未来**。

### 函数组件的心智模型：如何函数式地抽象组件逻辑

在 React-Hooks 推出以前，React 函数组件的定位仅仅是**对类组件的一种补充**。

当时有一个很热门的 React 面试题，问“什么是 React 无状态组件”。其实无状态组件就是函数组件的一个别名——在缺少 Hooks 加持的情况下，函数组件内部无法定义和维护 state，便表现为所谓的“stateless（无状态）”。

在那时，函数组件能够，也仅仅能够完成从 props 到 UI 的映射——这样的转换逻辑是**绝对纯的、没有任何副作用的**。这一时期的函数式组件，毫无疑问是**纯函数**。

直到 React-Hooks 的出现，才允许函数组件“**拥有了自己的状态**”（注意，这句话我打了个引号，这是个伏笔，下文很快会收回）。像这样：

```jsx
function App(props) {
  const [age, setAge] = useState(1)
  return (
    <>
      <h1> {props.name} age is {age}</h1>
      <button onClick={() => setAge(age+1)}>add age</button>
    </>
  );
}
```

对于这个函数组件来说，即便输入相同的 props，也不一定能得到相同的输出。这是因为函数内部还有另一个变量 `state`。从这个角度看，它似乎没那么纯了。

**真的没那么纯了吗？**

`useState()` 的状态管理逻辑是在哪里维护的？是在`App()`函数的内部？还是在 `App()`函数之外呢？

答案是，在 `App()` 函数之外！

函数执行过程是一次性的，函数是没有记忆的。如果 `useState()` 是在 `App()`函数内部维护组件状态，那么每次组件渲染时，伴随着 `App()`函数执行完毕，`App()`内部的状态应该和函数上下文一起被销毁了才对。

这样的话，每次调用 `App()`函数，我们进入的都应该是一个全新的上下文，每次最多只能拿到状态的初始值而已。

但现实是，不管 `App`组件渲染（`App`组件渲染===`App()`函数执行）了多少次，`useState()`总是能“记住”组件最新的状态——这意味着`App()`函数上下文被销毁时，它所对应的组件状态其实被保留了下来。要做到这一点，只能是把状态独立到 `App()`的外面去维护。

> 注：这种 Hook 与组件之间的松耦合关系，并不是 `useState()`所特有的，而是所有 React Hooks 的共性。

也就是说，对于函数组件来说，state 本质上也是一种**外部数据**。**函数组件能够消费 state，却并不真正拥有 state** 。

当我们在函数体内调用 `useState()` 的时候，相当于把函数包裹在了一个具备 `state` 能力的“壳子”里。只是这层“壳子”是由 React 实现的，我们作为用户感知不到，所以看起来像是函数组件“拥有了自己的状态”一样。

这样说可能有点抽象，用这段伪代码来示意可能会更通透一些：

```jsx
function Wrapper({state, setState}) {
  return <App state={state} setState={setState}/>
}
```

尽管真实的 `useState`源码并不是这样写的（比这个复杂得多），但是真实的 `useState`源码同样是在 `App()`函数之外维护 `state`，同样会在 `state`发生变化时，像 `Wrapper`一样去触发 `App()`函数的再执行（也即`App`组件的“重渲染”）。

也就是说，至少从逻辑上来看，`Wrapper`这段伪代码足以描述 `useState`和函数组件之间的关联关系——`useState`所维护的状态(`state`），本质上和 `props`、`context`等数据一样，都可以视作是 `App`组件的 **“外部数据”，也即** `App() `**函数的“入参”** 。

我们用 `FunctionComponent` 表示任意一个函数组件，函数组件与数据、UI 的关系可以概括如下：

```jsx
UI = FunctionComponent(props, context, state)
```

**对于同样的入参（也即固定的** `props` **、** `context` **、** `state` **），函数组件总是能给到相同的输出。因此，函数组件仍然可以被视作是一个“纯函数”。**

由此我们可以看出：**Hook 对函数能力的拓展，并不影响函数本身的性质。函数组件始终都是从数据到 UI 的映射，是一层很纯的东西**。而以 `useEffect`、`useState` 为代表的 Hooks，则负责消化那些不纯的逻辑。比如状态的变化，比如网络请求、DOM 操作等副作用。

**也就是说，在组件设计的层面，React 也在引导我们朝着“纯函数/副作用”这个方向去思考问题**。

在过去，设计一个 Class 组件，我们需要思考“**如何将业务逻辑解构到五花八门的生命周期里**”。

而现在，设计一个函数组件，我们关注点则被简化为“**哪些逻辑可以被抽象为纯函数，哪些逻辑可以被抽象为副作用**”（如下图）。

![img](D:\QDstudy\前端笔记合集\书籍\JavaScript\函数式编程-code\README.assets\a068ef2656674613a90ee2ceacdb17bctplv-k3u1fbpfcp-jj-mark1701000q75.webp)

我们关注的细节变少了，需要思考的问题变少了，抽象的层次更高了——**React 背靠函数式思想，重构了组件的抽象方式，为我们创造了一种更加声明式的研发体验。**

### 函数组件的心智模型：如何函数式地实现代码重用

在代码重用这个方面，React 其实一直是很“函数式”的。

即便是在 Class 组件占据统治地位的时期，React 官方在代码重用方面的建议也是“要组合，不要继承”

在组合思想的渗透下，发展出了“React 设计模式”这种东西，经典的 React 设计模式包括但不限于：

- 高阶组件
- render props
- 容器组件/展示组件
- ...

在过去，这些设计模式曾一度被奉为“金科玉律”，也曾是各厂前端面试的热门考点。但在今天，随着“函数组件+Hooks”的推广，“金科玉律”逐渐也变成了“老黄历”——**过去需要设计模式来解决的问题，今天大多都可以用 Hooks 求解，并且解法更简洁、更优雅、更“函数式”**。

旧版本 React 选用 Class 组件作为主要的逻辑载体。在当时，为了写出高质量、易维护的 React 代码，我们不得不求助于各种各样的 React 设计模式，而这些设计模式本身又是函数式的。

这种别扭的状态持续了数年，大多数的开发者都不觉得有什么不对，甚至认为“React 就该这样学”。

直到4年前，Hooks 的出现使得函数组件具备了“扛大旗”的能力、React 进一步“函数式”化。这时大家才逐渐意识到：原来，“**设计模式”对于 React 来说，并不是一个必选项，而更像是一个“补丁”** ——当编程范式与框架底层逻辑略显违和时，我们需要额外学习大量的设计模式作为补充；当**编程范式和框架底层逻辑高度契合**时，我们只需要闭眼梭哈就够了。

## 应用研发

### 函数式的React 代码重用思路

#### 高阶组件（HOC）的函数式本质

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种==基于 React 的组合特性而形成的设计模式==。 具体而言，**高阶组件是参数为组件，返回值为新组件的==函数==。** ——React 官方文档

在这段描述里，有两个华点，是值得我们细细品味的：

- 高阶组件是**函数**
- 高阶组件是一种基于 React 的**组合特性**而形成的设计模式

##### 高阶组件是函数

【划重点1】：**高阶组件是函数，** 一种吃进组件、吐出新组件的函数。

无论是名字还是内涵，“高阶组件”这玩意儿都很难让人不联想到我们聊过的 HOF（高阶函数）。

> 高阶函数，指的就是接收函数作为入参，或者将函数作为出参返回的函数

高阶函数的主要效用在于**代码重用**，高阶组件也是如此。

**当我们使用函数组件构建应用程序时，高阶组件就是高阶函数。**

##### 要组合, 不要继承

**【划重点2】：** 高阶组件“是一种基于 React 的**组合特性**而形成的设计模式”。

**即便是在 Class 组件占据统治地位的时期，React 官方在代码重用方面的建议也是“要组合，不要继承”。** 高阶组件就是一个活生生的例子。

更进一步地，当我们需要同时用到多个高阶组件时，甚至直接可以使用函数式编程中喜闻乐见的 `compose` 函数来组合这些高阶组件，像这样：

```jsx
// 定义一个 NetWorkComponent，组合多个高阶组件的能力
const NetWorkComponent = compose(
  // 高阶组件 withError，用来提示错误
  withError,
  // 高阶组件 withLoading，用来提示 loading 态
  withLoading,
  // 高阶组件 withFetch，用来调后端接口
  withFetch
)(Component)

const App = () => {
  ...

  return (
    <NetWorkComponent
      // params 入参交给 withFetch 消化
      url={url}
      // error 入参交给 withError 消化
      error={error}  
      // isLoading 入参交给 withLoading 消化
      isLoading={isLoading}
    />
  )
}
```

毕竟，高阶组件本质上也是函数，组合高阶组件，就是在组合函数——都组合函数了，不拉`compose`出来溜溜怎么行？

这又是 `HOF`、又是 `compose`的，不得不说，高阶组件身上确实叠了不少函数式的 buff。作为类组件时期的代表性设计模式，高阶组件的存在和流行足以向我们证明：**无论组件的载体是类还是函数，React 的代码重用思路总是函数式的。**

#### 高阶组件（HOC）的局限性

让我们来看看下面这个高阶组件，它被用来进行条件渲染：

```jsx
import React from 'react'

const withError = (Component) => (props) => {
  if (props.error) {
    return <div>Here is an Error ...</div>
  }

  return <Component {...props} />
}

export default withError
```

如果有一个错误，它就渲染一个错误信息。如果没有错误，它将渲染给定的组件。

尽管今天的 Hooks 已经能够在许多场景下取代高阶组件，但在“条件渲染”这个场景下，使用高阶组件仍然不失为一个最恰当的选择——毕竟，**Hooks 能够 return 数据，却不能够 return 组件**。

因此，抛开前提去谈 `HOC`的局限性显然是不合适的。具体到本文来说，当我们探讨 `HOC`的局限性时，我们探讨的并不是类似“条件渲染”这种场景，而是对【**状态相关的逻辑】** 的重用。

比如下面这个高阶组件：

```jsx
import React from "react"

// 创建一个 HOC, 用于处理网络请求任务
const withFetch = (Component) => {
    
  // 注意，处理类组件时，HOC 每次都会返回一个新的类
  class WithFetch extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: {},
      }
    }

    componentDidMount() {
      // 根据指定的 url 获取接口内容
      fetch(this.props.url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ data })
        })
    }

    render() {
      // 将目标数据【注入】给 Component 组件
      return (
        <>
          <Component {...this.props} data={this.state.data} />
        </>
      )
    } 
  }
  
  // 这行完全是 debug 用的，由于高阶组件每次都会返回新的类，我们需要 displayName 帮我们记住被包装的目标组件是谁
  WithFetch.displayName = `WithFetch(${Component.name})`
  
  // 返回一个被包装过的、全新的类组件
  return WithFetch
};

export default withFetch
```

这个组件主要做了这么几件事：

- 它根据 `this.props` 中指定的 url，请求一个后端接口
- 将获取到的数据(`data`)以 `state` 的形式维护在高阶组件的内部
- 将高阶组件内部的 `state.data` 以 `props` 的形式传递给目标组件 `Component`

用一句话来概括这个过程：**高阶组件把状态【注入】到了目标** `Component`**里。**

当任何一个组件 `Component` 需要应用同样的逻辑时，只需要像这样轻轻地在它外面包一层 `withFetch`，就可以【被注入】自己想要的数据：

```jsx
const FetchCommentComponent = withFetch(Component)
```

这 HOC 用起来确实比无脑复制粘贴高级的多，但它并不是完美的。随着应用复杂度的提升，HOC 的局限性也就跟着显现了。

##### 可读性问题

咱们上文说过，组合多个高阶组件，可以使用 `compose`。

随着应用的迭代，我们会发现，`Component`仅仅具备“获取数据”这一个能力是不够的，产品经理希望你为它增加以下功能：

1. 在请求发起前后，处理对应的 Loading 态（对应 HOC `withLoading`）
2. 在请求失败的情况下，处理对应的 Error 态（对应 HOC `withError`）

```jsx
// 定义一个 NetWorkComponent，组合多个高阶组件的能力
const NetWorkComponent = compose(
  // 高阶组件 withError，用来提示错误
  withError,
  // 高阶组件 withLoading，用来提示 loading 态
  withLoading,
  // 高阶组件 withFetch，用来调后端接口
  withFetch
)(Component)

const App = () => {
  // 省略前置逻辑...

  return (
    <NetWorkComponent
      // url 入参交给 withFetch 消化
      url={url}
      // error 入参交给 withError 消化
      error={error}  
      // isLoading 入参交给 withLoading 消化
      isLoading={isLoading}
    />
  )
}
```

这个版本的代码是最理想的——参数名和 HOC 名严格对照，我们可以轻松地推导 `props`和`HOC`之间的关系。此时，整个组件的工作流和传参方式都是比较清晰的。

但很多时候，我们见到的代码是这样的：

```jsx
// 定义一个 NetWorkComponent，组合多个高阶组件的能力
const NetWorkComponent = compose(
  // 高阶组件 withError，用来提示错误
  withError,
  // 高阶组件 withLoading，用来提示 loading 态
  withLoading,
  // 高阶组件 withFetch，用来调后端接口
  withFetch
)(Component)

const App = () => {
  // 省略前置逻辑...

  return (
    <NetWorkComponent
      // url 入参交给 withFetch 消化
      url={url}
      // icon 入参是服务于谁的呢？
      icon={icon}
      // image 入参是服务于谁的呢？
      image={icon}
    />
  )
}
```

由于大家已经亲眼见过 `withFetch` 的实现，这里我们自然知道 `url`是供 `withFetch`消化的参数。但是 `icon`参数和 `image`参数又是为谁服务的呢？是为另外两个 HOC 服务的，还是为 `Component`组件本身服务的？

如果不去细看 `withLoading`和`withError`的具体实现逻辑，我们很难推测这些 `props`到底应该传什么样的值。

尽管这样的代码已经给我们构成一些研发阻力，但这还不是最糟的情况——至少，案例中`withFetch`的逻辑对我们来说仍然是透明的。
更多的时候，我们见到的是下面这样的代码：

```jsx
// 定义一个 NetWorkComponent，组合多个高阶组件的能力
const NetWorkComponent = compose(
  // 高阶组件 withError，用来提示错误
  withError,
  // 高阶组件 withLoading，用来提示 loading 态
  withLoading,
  // 高阶组件 withNewFetch，用来调后端接口
  withNewFetch
)(Component)

const App = () => {
  ...

  return (
    <NetWorkComponent
      // params 入参是服务于谁的呢？
      params={params}
      // icon 入参是服务于谁的呢？
      icon={icon}
    />
  )
}
```

在这个 case 中，三个 `HOC`的内部实现我们都是不清楚的，`props`数量也从 3 个变成了 2 个。此时，理解代码的成本就更高了。

以上几种 case，我们讨论的都是 HOC 和 `props`之间的关系模糊问题。其实 HOC 模糊的地方不止这一处——HOC 和被包装组件`Component`之间的关系也是模糊的：由于 `HOC`对组件的包装是“不留痕迹”的（见`withFetch`示例中对“`displayName`”的注释解析），一个 `Component`被 `HOC`包装后，它会变成一个全新的组件，这就导致`HOC`层面的 bug 非常难以追溯。迫于此，我们不得不手动在每个 HOC 中标记`displayName`，但这相当于打了个补丁，治标不治本。

至于如何治“本”，这里先按下不表，咱们先顺着既有的思路，把“HOC 的局限性”这条线给讲完。

##### 命名冲突问题

这个问题就比较好理解了。假设我在同一个 `Component`里，想要复用两次 `withFetch`，代码该怎么写呢？

写成下面这样行不行呢：

```jsx
const FetchForTwice = compose(
  withFetch,
  withFetch,
)(Component)

const App = () => {
  ...

  const userId = '10086'

  return (
    <FetchForTwice
      // 这个 url 用于获取用户的个人信息
      url={`https://api.xxx/profile/${userId}`}
      // 这个 url 用于获取用户的钱包信息
      url={`https://api.xxx/wallet/${userId}`}
    />
  );
};
```

显然是不行的，众所周知，当出现两个同名的 `props`时，后面那个（钱包接口 url）会把前面那个（个人信息接口 url）覆盖掉。也就是说，`FetchForTwice`确实能够 `fetch`两次接口，但这两次`fetch`动作是重复的，每次都只会去`fetch`用户的钱包信息而已。

#### render props的正反两面

render props 被认为是比 HOC 更加优雅的代码重用解法。这里提及 render props，并不是为了教大家怎么做“HOC vs render props”这道老八股面试题，而是为了给大家看下面这张图：

![img](D:\QDstudy\前端笔记合集\书籍\JavaScript\函数式编程-code\README.assets\a050795d41694bec96227122fc21ff8dtplv-k3u1fbpfcp-jj-mark2268000q75.webp)

图中的代码是我基于楼上 HOC 的 `withFetch`简单改写出的 render props 版本。这里简单介绍一下：`this.props.render()`可以是任意的一个函数组件，像这样：

```jsx
<FetchComponent
  render={(data) => <div>{data.length}</div>}
  />
```

将这个 `props.render`代入楼上的 `FetchComponent`，我们看到的代码会更直观一些，如下图：

![img](D:\QDstudy\前端笔记合集\书籍\JavaScript\函数式编程-code\README.assets\c26e91d3173f42bc8d68fb4a20444747tplv-k3u1fbpfcp-jj-mark2268000q75.webp)

这里我最想要大家关注的是我用红色方框圈出的这两个部分，这也是我认为 render props 最进步的一个点——它区分了两个不同的逻辑层次：上面的红色方框圈住的是“**数据的准备工作**”（充满副作用），下面的红色方框圈住的则是“**数据的渲染工作**”（纯函数）。

> 注意，这里的【渲染工作】指的是将数据映射为“对UI的描述”，而不是真实的 DOM渲染过程。这个【渲染工作】的载体是一个纯的函数组件，因此咱们说【渲染工作】是【纯函数】。

**也就是说，从 render props 这个模式开始，我们已经初步地在实践“pure/impure 分离”的函数式思想。**

然而，render props 也存在着这样那样的局限性，其中一个最经典的问题莫过于“**嵌套地狱**”问题了。比如我真的在一些存量项目中见过类似这样的代码（下图已脱敏）：

![img](D:\QDstudy\前端笔记合集\书籍\JavaScript\函数式编程-code\README.assets\5026aa00e90a414db62db7a898faa144tplv-k3u1fbpfcp-jj-mark2268000q75.webp)

但整体来说，render props 的进步意义还是非常值得肯定的。

### 函数组件 + Hooks实现代码重用

 铺垫完了 HOC 和 render props，终于要引出【函数组件 + Hooks】了。

首先再次声明，Hooks 是无法完全替代 HOC 和 render props 的。关于这个问题，React 官方的 Q&A 说得很清楚（传送门：[Hooks FAQ](https://link.juejin.cn/?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhooks-faq.html%23do-hooks-replace-render-props-and-higher-order-components)）：

![img](D:\QDstudy\前端笔记合集\书籍\JavaScript\函数式编程-code\README.assets\6ec5742f11844748bb0d19cc7280ad9ftplv-k3u1fbpfcp-jj-mark2268000q75.webp)

图上这个回答中提到的“大部分场景”就包括本文探讨的目标场景：对【**状态相关的逻辑】** 的重用 **。**

以 HOC 话题下的 `NetWorkComponent`组件为例，使用 Hooks，我们可以将它重构成这样：

```jsx
const NewWorkComponent = () => {
  const {data, error, isLoading} = useFetch('xxx')  
  if(error) {
    // 处理错误态
  }
  if(isLoading) {
    // 处理 loading 态
  }
  return <Component data={data} />
}
```

由于不存在 `props`覆盖的问题，对于需要分别调用两次接口的场景，只需要像这样调用两次`useFetch`就可以了：

```jsx
const NewWorkComponent = ({userId}) => {
  const {
    data: profileData, 
    error: profileError 
    isLoading: profileIsLoading
  } = useFetch('https://api.xxx/profile/${userId}')  
  const {
    data: walletData, 
    error: walletError 
    isLoading: walletIsLoading
  } = useFetch('https://api.xxx/wallet/${userId}')    

  // ...其它业务逻辑
    
  return <Component data={data} />
}
```

以 render props 话题下的“嵌套地狱”组件为例，使用 Hooks，我们可以将它的嵌套部分重构成这样：

```jsx
const user = useUser()
const mouse = useMouse()
const scroll = useScroll()
const style = useMotion()
const size = useMeasure()

return <ConsumingComponent 
         user={user}
         mouse={mouse} 
         scroll={scroll} 
         style={style} 
         size={size} 
           />

```

从以上的重构结果，我们可以看出：Hooks 能够帮我们在【**数据的准备工作**】和【**数据的渲染工作**】之间做一个更清晰的分离。
具体来说，在 render props 示例中，我们并不想关心组件之间如何嵌套，我们只关心我们在 render props 函数中会拿到什么样的值；在 HOC 示例中，我们也并不想关心每个 HOC 是怎么实现的、每个组件参数和 HOC 的映射关系又是什么样的，我们只关心目标组件能不能拿到它想要的 `props` 。但在【函数组件+Hooks】这种模式出现之前，尽管开发者“并不想关心”，却“不得不关心”。**因为这些模式都没有解决根本上的问题，那就是心智模型的问题。**

### 为什么函数组件+Hooks是更优解？

前面我们说“HOC 虽然能够实现代码重用，但是不治本”。为什么不治本？因为 HOC **没有解决逻辑和视图耦合的问题**。

render props 是有进步意义的，因为它以 render 函数为界，将整个组件划分为了两部分：

- **数据的准备工作——也就是“逻辑”**
- **数据的渲染工作——也就是“视图”**

其中，“视图”表现为一个纯函数组件，这个纯函数组件是高度独立的。尽管”视图“是高度独立的，“逻辑”却仍然耦合在组件的上下文里。**这种程度的解耦是暧昧的、不彻底的**。

【函数组件+Hooks】模式的出现，恰好就打破了这种暧昧的状态：

在过去，组件状态附着在组件实例（this）上，形成一种强耦合的关系——我想维护一段和状态有关的逻辑，行不行？行的，但是我必须先创造一个组件实例作为它的容器。

而现在，**状态被视作函数的入参和出参**，它可以脱离于 this 而存在，状态管理逻辑可以从组件实例上剥离、被提升为公共层的一个函数，由此便彻底地实现逻辑和视图的解耦。

写到这里，我忍不住还想再 cue 一下上一节讲的心智模型：

**“Impure/Pure”的心智模型是“因”，“充分解耦逻辑与视图”是“果”**。

**函数式思想是“因”，更高效的代码重用是“果”**。

### 拓展：关注点分离——容器组件与展示组件

容器组件与展示组件也是非常经典的设计模式。这个模式有很多的别名，比如：

- 胖组件/瘦组件
- 有状态组件/无状态组件
- 聪明组件/傻瓜组件
- ...

> 注：（斜线前面的名字是容器组件的别名，斜线后面的名字是展示组件的别名）

名字叫啥不重要，这个模式的要义在于关注点分离，具体来说，先将组件逻辑分为两类：

- **数据的准备工作——也就是“逻辑”**
- **数据的渲染工作——也就是“视图”**

然后再把这两类逻辑分别塞进两类组件中：

- 容器组件：负责做**数据的准备和分发工作**
- 展示组件：负责做**数据的渲染工作**

这个模式强调的是容器组件和展示组件之间的父子关系：容器组件是父组件，它在完成数据的准备工作后，会通过 props 将数据分发给作为子组件的展示组件。

由此，我们就能够实现组件的关注点分离，使组件的功能更加**内聚**，实现**逻辑与视图的分离**......诶？又是逻辑与视图分离？哈哈，没错，就是这么无聊，就是这么万变不离其宗呀~


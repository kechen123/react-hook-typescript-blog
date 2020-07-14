const txt = `

## 1 引言

Object 类型的比较是非常重要的基础知识，通过 How to Compare Objects in JavaScript 这篇文章，我们可以学到四种对比方法：引用对比、手动对比、浅对比、深对比。

## 2 简介


## 引用对比
下面三种对比方式用于 Object，皆在引用相同是才返回 true：

- ===
- ==
- Object.is()

\`\`\`javascript
const hero1 = {
  name: "Batman",
};
const hero2 = {
  name: "Batman",
};

hero1 === hero1; // => true
hero1 === hero2; // => false

hero1 == hero1; // => true
hero1 == hero2; // => false

Object.is(hero1, hero1); // => true
Object.is(hero1, hero2); // => false
\`\`\`
##手动对比
写一个自定义函数，按照对象内容做自定义对比也是一种方案：

\`\`\`
function isHeroEqual(object1, object2) {
  return object1.name === object2.name;
}

const hero1 = {
  name: "Batman",
};
const hero2 = {
  name: "Batman",
};
const hero3 = {
  name: "Joker",
};

isHeroEqual(hero1, hero2); // => true
isHeroEqual(hero1, hero3); // => false
\`\`\`

如果要对比的对象 key 不多，或者在特殊业务场景需要时，这种手动对比方法其实还是蛮实用的。

但这种方案不够自动化，所以才有了浅对比。


##浅对比
浅对比函数写法有很多，不过其效果都是标准的，下面给出了一种写法：

\`\`\`javascript
function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}
\`\`\`
可以看到，浅对比就是将对象每个属性进行引用对比，算是一种性能上的平衡，尤其在 redux 下有特殊的意义。

下面给出了使用例子：
\`\`\`javascript
const hero1 = {
  name: "Batman",
  realName: "Bruce Wayne",
};
const hero2 = {
  name: "Batman",
  realName: "Bruce Wayne",
};
const hero3 = {
  name: "Joker",
};

shallowEqual(hero1, hero2); // => true
shallowEqual(hero1, hero3); // => false
\`\`\`

如果对象层级再多一层，浅对比就无效了，此时需要使用深对比。

#深对比
深对比就是递归对比对象所有简单对象值，遇到复杂对象就逐个 key 进行对比，以此类推。

下面是一种实现方式：

\`\`\`javascript
function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === "object";
}
\`\`\`
`
export default txt

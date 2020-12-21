# 组件间通信详解

## 1. 组件间多种通信方式:
1. 组件间通信1: props
2. 组件间通信2: vue自定义事件
3. 组件间通信3: 事件总线
3. 组件间通信4: v-model
4. 组件间通信5: .sync 属性修饰符
5. 组件间通信6: $attrs与$listeners
6. 组件间通信7: $children与$parent
7. 组件间通信8: provide与inject
8. 组件间通信9: vuex
9. 组件间通信10: 作用域插槽slot-scope

## 2. 组件间通信最基本方式: props
- 用来实现父子之间相互通信的最基本方式, 也是用得最多的方式
  - 父 ==> 子, 传递的是非函数类型的属性
  - 子 ==> 父, 传递的是函数类型的属性
- 问题: 其它关系的组件使用props就会比较麻烦


## 3. 组件间通信2: vue自定义事件

### 1) 原生DOM事件

- 绑定原生DOM事件监听的2种情况
	- 在html标签上绑定DOM事件名的监听
	- 在组件标签上绑定DOM事件名的监听, 事件绑定在组件的根标签上
- 当用户操作对应的界面时, 浏览器就会自动创建并封闭包含相关数据的事件对象, 分发对应的事件, 从而触发事件监听回调函数调用
- 事件对象event, 本质是 "事件数据对象"
- event对象内的数据属性: target / offsetX / offsetY / keyCode等
- $event就是浏览器创建的event对象, 默认传递给事件监听回调函数的就是它

### 2) vue自定义事件

- 绑定vue自定义事件监听
  - 只能在组件标签上绑定
  - 事件名是任意的, 可以与原生DOM事件名相同
- 只有当执行$emit('自定义事件名', data)时分发自定义事件, 才会触发自定义事件监听函数调用
- $event: 就是分发自定义事件时指定的data数据
- $event可以是任意类型, 甚至可以没有
- 用来实现子向父组件通信, 功能相当于函数类型的props



## 4. 组件间通信3: 事件总线

- 理解:

  - Vue原型对象上有3个事件处理的方法: $on() / $emit() / $off()
  - 组件对象的原型对象的原型对象是Vue的原型对象: 组件对象可以直接访问Vue原型对象上的方法

- 实现任意组件间通信

- 编码实现:

  - 将入口js中的vm作为全局事件总线对象: 

 ```js
    beforeCreate() {
    	Vue.prototype.$bus = this
    }
 ```

  - 分发事件/传递数据的组件: this.$bus.$emit('eventName', data)

  - 处理事件/接收数据的组件: this.$bus.$on('eventName', (data) => {})



## 5. 组件间通信4: v-model

### 1) 原生input上的本质:  

动态的value属性与原生input事件监听

```html
<input type="text" :value="name2" @input="name2=$event.target.value">
```

### 2) 组件标签上的本质:  

动态的value属性与自定义input事件监听

```js
// 父组件: 
<CustomInput :value="name4" @input="name4=$event"/>

// 子组件
props: ['value']
<input type="text" :value="value" @input="$emit('input', $event.target.value)">
```

### 3) 利用v-model能做什么?

- v-model不仅能实现原生标签上的**双向数据绑定**, 也能实现父子组件间数据**双向通信(同步)**
- 应用
  - 一般用于封装带表单项的复用性组件
  - elment-ui中: Input/CheckBox/Radio/Select等表单项组件都封装了v-model



## 6. 组件间通信5: sync 属性修饰符

### 1) 理解本质: 

绑定一个自定义事件监听, 用来接收子组件分发事件携带的最新数据来更新父组件的数据

```html
<child :money.sync="total"/>
<Child :money="total" @update:money="total=$event"/>
```

### 2) 利用sync能做什么呢?

- 在原有父向子的基础上加上子向父通信
- 应用
  - 常用于封装可复用组件(需要更新父组件数据)
    - v-model一般用于带表单项的组件
    - sync一般用于不带表单项标签的组件
  - element-ui中: Dialog就利用sync来实现组件的隐藏



## 7. 组件间通信6: $attrs与$listeners

### 1) 理解:

- $attrs: 排除props声明, class, style的所有组件标签属性组成的对象

- $listeners: 级组件标签绑定的所有自定义事件监听的对象

- v-bind: 的特别使用

  ```html
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
  ```

- v-on: 的特别使用: 

  ```html
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  一般: v-bind与$attrs配合使用, v-on与$listeners配合使用

### 2) 使用它们能做什么呢?

- 在封装可复用组件时: HintButton
  - 从父组件中接收不定数量/名称的属性或事件监听
  - 在组件内部, 传递给它的子组件
- element-ui中: Input就使用了v-bind与$attrs来接收不定的属性传递给input

### 3) 扩展双击监听:

- `@dblclick="add2"`
          绑定是自定义事件监听, 而el-button内部并没处理(没有绑定对应的原生监听, 没有分发自定义事件)
          双击时, 不会有响应

- `@dblclick.native="add2"`
          绑定的是原生的DOM事件监听, 最终是给组件的根标签a绑定的原生监听
          当双击a内部的button能响应, 因为事件有冒泡



## 8. 组件间通信7: $children与$parent

### 1) 理解:
- $children: 所有直接子组件对象的数组, 利用它可以更新多个子组件的数据
- $parent: 父组件对象, 从而可以更新父组件的数据
- $refs: 包含所有有ref属性的标签对象或组件对象的容器对象

### 2) 利用它们能做什么?
- 能方便的得到子组件/后代组件/父组件/祖辈组件对象, 从而更新其data或调用其方法
- 官方建议不要大量使用, 优先使用props和event
- 在一些UI组件库定义高复用组件时会使用$children和$parent, 如Carousel组件

### 3) 扩展: mixin
- 多个组件有部分相同的js代码如何复用 ?
- 答: 利用vue的mixin技术实现
- 本质: 实现Vue组件的JS代码复用, 简化编码的一种技术



## 9. 组件间通信8: provide与inject

### 1) 理解
	用来实现祖孙组件直接通信
	在祖组件中通过provide配置向后代组件提供数据
	在后代组件中通过inject配置来读取数据
### 2) 注意:
	不太建议在应用开发中使用, 一般用来封装vue插件
	provide提供的数据本身不是响应式的 ==> 父组件更新了数据, 后代组件不会变化
	provide提供的数据对象内部是响应式的 ==> 父组件更新了数据, 后代组件也会变化
### 3) 应用: 
	element-ui中的Form组件中使用了provide和inject



## 10. 组件间通信9: vuex

1. 实现任意组件间通信

2. Vuex 是一个专为 Vue 应用程序设计的管理多组件共享状态数据的 Vue 插件
    任意组件都可以读取到Vuex中store的state对象中的数据

   任意组件都可以通过dispatch()或commit()来触发store去更新state中的数据

   一旦state中的数据发生变化, 依赖于这些数据的组件就会自动更新



## 11. 作用域插槽slot-scope

### 1) 什么情况下使用作用域插槽?

- 父组件需要向子组件传递标签结构内容

- 但决定父组件传递怎样标签结构的数据在子组件中

### 2) 编码

```html
<!: 子组件: >
<slot :row="item" :$index="index"></slot>

<!: 父组件: >
<template slot-scope="{row, $index}">
	<span>{{$index+1}}</span> &nbsp;&nbsp;
	<span :style="{color: $index%2===1 ? 'blue' : 'green'}" >{{row.text}}</span>
</template>
```

### 3) 应用

- 对于封装列表之类的组件特别需要
- element-ui中: Table组件中就用到了slot-scope
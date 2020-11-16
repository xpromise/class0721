# day01 复习

## 指令

- v-model 用于双向数据绑定
  - 常用于表单项
- v-bind 用于单向数据绑定
  - 简写 :
- v-on 用于绑定事件
  - 简写 @
- v-if / v-else / v-else-if 条件渲染（根据表达式结果选择渲染哪个元素，切换显示）
- v-show 条件渲染
  - 区别
    - v-if 隐藏时，元素移除 DOM 树
    - v-show 隐藏时，通过 display: none 控制隐藏
    - 所以，如果元素频繁切换显示、隐藏，用 v-show 较好（因为它不会移除 DOM 树）
- v-for 列表渲染
  - v-for="(item, index) in xxx" :key="item.id"

## 事件处理

- v-on:eventName="handleClick"
  - 回调函数的参数：event
- v-on:eventName="handleClick()"
  - 回调函数的参数：无
- v-on:eventName="handleClick(xxx)"
  - 回调函数的参数：xxx
- v-on:eventName="handleClick(xxx, \$event)"
  - 回调函数的参数：xxx, event
- v-on:eventName="orderType = 1"

  - 不需要设置回调函数， orderType = 1 就是要执行的语句
  - 当函数语句只有一条时，可以使用

- 事件修饰符

  - @click.prevent.stop="xxx"
  - .prevent 禁止事件默认行为
  - .stop 阻止事件冒泡

- 按键修饰符
  - @keyup.13="xxx"
  - @keyup.enter="xxx"

## 生命周期函数

- 组件从创建到销毁过程中自动触发的函数

- 初始化
  - beforeCreate 在数据代理之前触发，所以不能通过 this 访问 data、methods 等数据
  - created 在数据代理之后
  - beforeMount
  - mounted 发送请求、设置定时器、绑定自定义事件等一次性任务
- 更新
  - beforeUpdate
  - updated
- 卸载
  - beforeDestroy 清除定时器、解绑事件等收尾工作（防止内存泄漏）
  - destroyed

## 过渡和动画

- <transition name="xxx"><p v-show="xxx">xxx</p></transition>
  - 默认样式：
    - 隐藏到显示 v-enter/v-enter-active/v-enter-to
    - 显示到隐藏 v-leave/v-leave-active/v-leave-to
  - 加上 name 属性：xxx-enter/xxx-enter-active/xxx-enter-to

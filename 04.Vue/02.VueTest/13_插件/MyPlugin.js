// 自定义Vue插件

// 方式一

// function MyPlugin(Vue) {
//   // 当你使用插件时，会调用插件函数，传入Vue作为参数

//   // 扩展Vue功能

//   // 扩展全局功能
//   Vue.globalMethod = function () {
//     console.log("globalMethod");
//   };

//   // 扩展实例对象功能
//   Vue.prototype.$instanceMethod = function () {
//     console.log("$instanceMethod");
//   };

//   // 扩展全局过滤器
//   Vue.filter("formatDate", (value, str) => {
//     return dayjs(value).format(str);
//   });
//   // 扩展全局指令
//   Vue.directive("upper-text", (el, binding) => {
//     el.textContent = binding.value.toUpperCase();
//   });
// }

// 方式二
const MyPlugin = {};
MyPlugin.install = function (Vue) {
  // 扩展Vue功能

  // 扩展全局功能
  Vue.globalMethod = function () {
    console.log("globalMethod");
  };

  // 扩展实例对象功能
  Vue.prototype.$instanceMethod = function () {
    console.log("$instanceMethod");
  };

  // 扩展全局过滤器
  Vue.filter("formatDate", (value, str) => {
    return dayjs(value).format(str);
  });
  // 扩展全局指令
  Vue.directive("upper-text", (el, binding) => {
    el.textContent = binding.value.toUpperCase();
  });
};

// 将来
// export default MyPlugin
window.MyPlugin = MyPlugin;

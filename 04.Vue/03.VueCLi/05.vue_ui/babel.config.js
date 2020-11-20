module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  // 按需加载element-ui的组件样式
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
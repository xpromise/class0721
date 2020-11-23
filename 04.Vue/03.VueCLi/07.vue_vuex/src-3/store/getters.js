/**
 * 包含了只用来读取的计算数据
 */
const getters = {
  oddOrEven(state) {
    // Math.abs() 取绝对值（正数）
    return Math.abs(state.count) % 2 === 1 ? "奇数" : "偶数";
  },
  // name(state) {
  //   return state.person.name;
  // },
};

export default getters;

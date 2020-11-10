/*  
  输入：123
  输出：321

  输入：-123
  输出：-321

  输入：120
  输出：21
*/

const reverse = function (s) {
  /* 
    1. 将num转化成string
    2. 判断正负，对负号进行删减
    3. 让string倒叙
    4. 装换成number，加上正负
  */

  // let result = "";
  // //  1. 将num转化成string
  // let str = s.toString();
  // //  2. 判断正负，对负号进行删减
  // str = s < 0 ? str.slice(1) : str;
  // //  3. 让string倒叙
  // for (let i = str.length - 1; i >= 0; i--) {
  //   result += str[i];
  // }
  // //  4. 装换成number，加上正负
  // return s < 0 ? -result : +result;

  // 假设 s = 123  321

  var result = 0;

  /*
    第一次
      r 3
      result 3 --> 0 * 10 + 3
      s 12

    第二次
      r 2
      result 32  --> 3 * 10 + 2
      s 1
    
    第三次
      r 1
      result 321  --> 32 * 10 + 1
      s 0
  */
  while (s) {
    const r = s % 10;
    result = result * 10 + r;
    s = (s - r) / 10;
  }

  return result;
};

console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(120));

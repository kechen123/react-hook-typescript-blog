var UTIL = {
  nowTime: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  },
}
export default UTIL;

export const throttle = (func, wait = 100) => {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
};
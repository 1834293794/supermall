export function debounce(func, delay) {
  // 这个timer是局部变量，之所以没有被销毁是因为下面的function作为闭包引用了timer，闭包对外层的东西进行了引用
  // 所以一旦有引用指向，就不会被销毁了
  let timer = null

  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout( () => {
      func.apply(this, args)
    }, delay)
  }

}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    // RegExp.$1是 '/(y+)/.test(fmt)' 匹配到的结果
    // date.getFullYear() + ''这一步数字加空字符串的操作将数字转换成了字符串
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  // 如果传进来的是04,加00后0004截取两位变成04；传进来的是4,004截取一位变成04
  return ('00' + str).substr(str.length);
};

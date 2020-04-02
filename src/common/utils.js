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
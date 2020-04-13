import Toast from './Toast'
const obj = {}
// Vue.use执行install函数时会把Vue传过来
obj.install = function (Vue) {

  // 这步将Toast中的元素挂载到body上
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.通过new的方式根据组件构造器，创建一个组件对象
  const toast = new toastContrustor()
  // 3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是创建的div了
  document.body.appendChild(toast.$el)

  // 通过这步以后就可以通过this.$toast来调用组件中的方法
  Vue.prototype.$toast = toast
}

export default obj
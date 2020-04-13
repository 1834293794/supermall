import axios from 'axios'

// 4.最终方法
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://100.100.100.200:8000/',
    timeout: 5000
  })

  // 2.有4种拦截器：请求成功、请求失败、响应成功、响应失败
 
  // 2.1拦截请求，两个函数，前者成功执行，后者失败执行
  instance.interceptors.request.use( config => {
    return config
  }, err => {
    console.log(err)
  })

  // 2.2拦截响应
  instance.interceptors.response.use( res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.instance本身就是一个Promise对象
  return instance(config)
}


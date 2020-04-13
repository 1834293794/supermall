export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      // 查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find( item => {
        return item.iid === payload.iid
      })
      // 判断oldProduct
      if (oldProduct) {
        // 商品数量加1
        context.commit('addCounter', oldProduct)
        resolve('商品数量+1')
      } else {
        // 添加新商品
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加新商品')
      }
    })

  }
}
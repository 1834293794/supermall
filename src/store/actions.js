export default {
  addCart(context, payload) {
    // payload新添加的商品
    // 查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find( item => {
      return item.iid === payload.iid
    })
    // 判断oldProduct
    if (oldProduct) {
      context.commit('addCounter', oldProduct)
    } else {
      payload.count = 1
      context.commit('addToCart', payload)
    }

  }
}
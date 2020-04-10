// (混入)mixin
import {debounce} from './utils'
// Home和Detail中一部分防抖操作的代码是相同的，可以运用混入的方法抽离这部分代码
// 运行时会把混入中的代码和组件中对应生命周期的代码合并

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null
    }
  },
  // 除了生命周期函数，data，components等都可以抽离到混入中来
  mounted () {
    // debounce防抖函数，避免scroll中的refresh方法执行过于频繁,详见utils.js
    const newRefresh = debounce(this.$refs.scroll.refresh, 200)
    // const refresh = debounce(this.imageLoad, 200)
    // 使用事件总线监听GoodsListItem中图片加载完成，解决项目supermall中的better-scroll可滚动区域的问题
    // 对监听函数进行保存，因为Home的deactive中离开时需要取消对该函数的监听
    this.itemImgListener = () => {
      newRefresh()
    }

    this.$bus.$on('itemImageLoad', this.itemImgListener)

    // console.log('运用了混入')
  }
}
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"  @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <!-- scroll必须有固定高度 -->
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <good-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'
import BackTop from 'components/content/backTop/BackTop'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import { debounce } from 'common/utils.js'
import { itemListenerMixin } from 'common/mixin.js'
import { BACKTOP_DISTANCE } from 'common/const.js'

import {mapActions} from 'vuex'

export default {
  // name属性平时可能无用，但如果为空，keep-alive的exclude就会失效
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList,
    BackTop,
  },
  mixins: [itemListenerMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      offsetListener: null,
      currentIndex: 0,
      isShowBackTop: false,
    }
  },
  created () {
    // 1.保存存入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then( res => {
      // 1.获取顶部的轮播图数据
      const data = res.result
      // console.log(data)
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods =  new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    getRecommend().then( res => {
      this.recommend = res.data.list
      // console.log(res)
    })
  },
  mounted () {
    // 以下代码运用混入(mixins)抽离了出去，运行时会把使用的混入中的代码和组件中对应生命周期的代码合并
    // let newRefresh = debounce(this.$refs.scroll.refresh, 200)
    // this.itemImgListener = () => {
    //   newRefresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImgListener)

    // 用于在新的图片加载进来后监听offsetTop的变化并更新，实现标题联动滚动
    let offsetRefresh = debounce(() => {
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // 在之后滚动联动标题时用到的值
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
    }, 100)
    this.offsetListener = () => {
      offsetRefresh()        
    }
    this.$bus.$on('detailOffsetTop', this.offsetListener)
  },
  destroyed () {
    // 必须进行如下操作，否则即使组件销毁了该事件还是存在，还有可能被触发
    this.$bus.$off('itemImgLoad', this.itemImgListener)
    this.$bus.$off('detailOffsetTop', this.offsetListener)
  },
  methods: {
    // 将vuex中的actions方法映射过来
    ...mapActions(['addCart']),

    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index]-44), 200)

    },
    // 当页面滚动就会触发该函数
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y
      // 2.将y值与主题中值进行对比,用let i in this.themeTops.length的方式的话取出的i是字符串类型

      // themeTopYs数组的前几个和最后一个判断方法不一样，所以要分情况写判断条件
      // for (let i = 0; i < this.themeTopYs.length; i++) {
      //   if (this.currentIndex !== i && ((i < this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i] && 
      //   positionY < this.themeTopYs[i+1]) || (i == this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i] ))) {
      //     console.log(i)
      //     this.currentIndex = i
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }

      // 因为之前mounted中人为添加了一个Number.Max_Value作为数组最后一个值，这里判断相对上面简便了许多
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (this.currentIndex !== i && (i < this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i]-44  && 
        positionY < this.themeTopYs[i+1]-44 )) {
          // console.log(i)
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.是否显示回到顶部
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
    },
    backClick() {
      //不写成this.$refs.scroll.scroll.scrollTo(0,0)是因为scroll里面对这步封装了
      this.$refs.scroll.scrollTo(0,0)
    },

    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // console.log(product.title)

      // 2.将商品添加到购物车(1.Promise 2.mapActions)
      // 2.1 原来的使用actions的方法
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
      // 2.2 将actions映射进来后的使用方法
      this.addCart(product).then(res => {
        // this.message = res
        // this.show = true
        // setTimeout(() => {
        //   this.message = ''
        //   this.show = false
        // }, 1500)
        this.$toast.show(res, 2000)
        console.log(res)
      })

    }
  }
}
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: white;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /* 这个100%是相对父元素来计算的，因此给detail设置了100vh(视口)高度 */
    height: calc(100% - 44px - 49px);
  }
</style>
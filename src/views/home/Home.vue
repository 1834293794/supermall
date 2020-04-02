<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '综合']" class="tab-control" @tabClick="tabClick"></tab-control>
      <good-list :goods="showGoods"></good-list>      
    </scroll>
    <!-- 组件不能直接监听click，必须加上native修饰符以监听组件根元素的原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 从不同地方引入的空行隔开分成三类
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata,getHomeGoods } from 'network/home'
import { debounce } from 'common/utils.js'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data () {
      return {
        banners: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: 'false'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created () {
      // 请求多个数据
      this.getHM()

      // 请求商品数据
      this.getHG('pop')
      this.getHG('new')
      this.getHG('sell')
      
    },
    mounted () {
      // 防抖函数，避免refresh执行过于频繁,详见utils.js
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      // 使用事件总线监听GoodsListItem中图片加载完成，解决项目supermall中的better-scroll可滚动区域的问题
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    methods: {

      // 时间监听相关方法
      tabClick(index) {
        switch (index) {
          case 0: 
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },

      backClick() {
        //不写成this.$refs.scroll.scroll.scrollTo(0,0)是因为scroll里面对这步封装了
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getHG(this.currentType)
        // 异步加载图片的时候刷新一次
        // this.$refs.scroll.scroll.refresh()
      },
      // 网络请求相关方法
      getHM() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },
      getHG(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 将res.data.list数组中的数据一个个取出来塞进goods[type].list中，重复执行该步骤是追加而不是覆盖
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
            // 完成上拉加载更多，没有这步的话上拉操作只会生效一次
            this.$refs.scroll.finishPullUp()
          }
        )       
      }
    }
  }
</script>

<style scoped>
/* 有scoped则这里的所有样式只会对当前组件起效果，不会对其他组件的同名类等起效果 */

  #home {
    /* vh是viewport height，即当前视口高度，100vh即100%视口 */
    height: 100vh;
    position: relative;
    /* padding-top: 44px; */

    /* 为了底部图片不被tabbar遮盖的暂时办法 */
    /* padding-bottom: 49px; */
  }

 .home-nav {
   background-color: var(--color-tint);
   color: white;

  /* 固定导航栏，使其不会随着滚动消失，能始终在页面最上方 */
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   z-index: 9;
   }

   .tab-control {
     /* 简单地让tab-control实现吸顶效果 */
     top: 44px;
     z-index: 9;
   }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>

<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommend"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行', '新款', '综合']" class="tab-control"></tab-control>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
      <li>列表51</li>
      <li>列表52</li>
      <li>列表53</li>
      <li>列表54</li>
      <li>列表55</li>
      <li>列表56</li>
      <li>列表57</li>
      <li>列表58</li>
      <li>列表59</li>
      <li>列表60</li>
      <li>列表61</li>
      <li>列表62</li>
      <li>列表63</li>
      <li>列表64</li>
      <li>列表65</li>
      <li>列表66</li>
      <li>列表67</li>
      <li>列表68</li>
      <li>列表69</li>
      <li>列表70</li>
      <li>列表71</li>
      <li>列表72</li>
      <li>列表73</li>
      <li>列表74</li>
      <li>列表75</li>
      <li>列表76</li>
      <li>列表77</li>
      <li>列表78</li>
      <li>列表79</li>
      <li>列表80</li>
      <li>列表81</li>
      <li>列表82</li>
      <li>列表83</li>
      <li>列表84</li>
      <li>列表85</li>
      <li>列表86</li>
      <li>列表87</li>
      <li>列表88</li>
      <li>列表89</li>
      <li>列表90</li>
      <li>列表91</li>
      <li>列表92</li>
      <li>列表93</li>
      <li>列表94</li>
      <li>列表95</li>
      <li>列表96</li>
      <li>列表97</li>
      <li>列表98</li>
      <li>列表99</li>
      <li>列表100</li>
    </ul>
  </div>
</template>

<script>
// 从不同地方引入的空行隔开分成三类
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import { getHomeMultidata,getHomeGoods } from 'network/home'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl
    },
    data () {
      return {
        banners: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        }
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
    methods: {
      getHM() {
        getHomeMultidata().then(res => {
          console.log(res)
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
          }
        )       
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;

    /* 为了底部图片不被tabbar遮盖的暂时办法 */
    padding-bottom: 49px;
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
     position: sticky;
     top: 44px;
   }
</style>

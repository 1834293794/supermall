<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <!-- #是v-slot的缩写 -->
        <template #item-icon>
          <!-- 这里使用路径别名必须先加上一个~，对路径别名的设置或使用都需要重启服务才能生效 -->
          <img src="~assets/img/tabbar/home.svg">
        </template>
        <template #item-icon-active>
          <img src="~assets/img/tabbar/home_active.svg">
        </template>
        <template #item-text>
          <div>首页</div>
        </template>
      </tab-bar-item>     
      <!-- <tab-bar-item path="/category">
        <template #item-icon>
          <img src="~assets/img/tabbar/category.svg">
        </template>
        <template #item-icon-active>
          <img src="~assets/img/tabbar/category_active.svg">
        </template>
        <template #item-text>
          <div>分类</div>
        </template>
      </tab-bar-item>      -->
      <tab-bar-item path="/cart">
        <template #item-icon>
          <img src="~assets/img/tabbar/shopcart.svg">
        </template>
        <template #item-icon-active>
          <img src="~assets/img/tabbar/shopcart_active.svg">
        </template>
        <template #item-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>     
      <tab-bar-item path="/profile">
        <template #item-icon>
          <img src="~assets/img/tabbar/profile.svg">
        </template>
        <template #item-icon-active>
          <img src="~assets/img/tabbar/profile_active.svg">
        </template>
        <template #item-text>
          <div>我的</div>
        </template>
      </tab-bar-item>     
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: '',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
<style scoped>

</style>
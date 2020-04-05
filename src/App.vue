<template>
  <div id="app">
    <!-- 在这里用keep-alive没有exclude会出问题，点击跳转详情页的时候所有的详情页都是一样的 -->
    <!-- 这是因为keep-alive使得详情页不会被销毁，第一次创建后，如果打算点击跳转别的详情页根本不会触发created -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
// components下放公共组件，其中common是可复用的组件，content下是与本项目业务联系较紧密的组件
// views下对应目录则是对应页面的组件
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>

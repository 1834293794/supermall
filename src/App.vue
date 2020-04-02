<template>
  <div id="app">
    <router-view/>
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

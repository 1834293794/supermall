<template>
  <div class="nav-bar">
    <!-- 直接对slot进行样式设计可能会出现很多问题，最好在外层包一层div再设计 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>
<style scoped>
  .nav-bar {
    display: flex;
    /* 如果用line-height，必须有内容，否则无效 */
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }

  .left, .right {
    width: 60px;
  }

  .left {
    margin-top: 6px;
  }

  .center {
    /* 当flex设定为1，而其他部分都有了具体宽度，那么center就会把剩余部分全部占据 */
    flex: 1;
    display: flex;
  }
</style>
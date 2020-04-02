<template>
  <div class="goods">
    <good-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'

export default {
  name: '',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodListItem
  }
}
</script>
<style scoped>
/* 使得一行显示两个item */
  .goods {
    display: flex;
    flex-wrap: wrap;
    /* 均等分 */
    justify-content: space-around;

    padding: 2px;
  }
</style>
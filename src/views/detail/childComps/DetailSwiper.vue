<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item">
      </swiper-item>
    </swiper>
</template>

<script>
// 因为swiper目录下有index.js统一导出所以这里能用这种语法
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: '',
  props:{ 
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>
<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
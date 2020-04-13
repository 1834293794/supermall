<template>
  <div class="goods-item" @click="itemClick">
    <!-- 将:src变为了v-lazy从而使用第三方库实现图片懒加载 -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 解决项目supermall中的better-scroll可滚动区域的问题，详细见LearnBS中的md文件
    imageLoad() {
      // 监听到图片加载完成接下来应该调用scroll中的refresh方法,

      // 但问题是，传统的解决方法是当前组件发射事件到父组件GoodList,再由父组件发射事件到Home.vue，在Home中调用scroll中的方法
      // 这样太繁琐，有两种替代方法，一是使用Vuex，每当有图片加载完成改变Vuex中的一个状态，Home.vue中监听到状态的改变进行调用
      // 而是使用事件总线，Home.vue中可以直接监听到发射的事件
      this.$bus.$emit('itemImageLoad')
      this.$bus.$emit('detailOffsetTop')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>
<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" class="tab-control-item" 
    :class="{active: index === currentindex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentindex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentindex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>
<style scoped>
 .tab-control {
   display: flex;
   text-align: center;
   font-size: 15px;
   background-color: #fff;
 }

 .tab-control-item {
   flex: 1;
   /* 如果没有height只有line-height，在没有文字的情况下高度就没有了 */
   height: 40px;
   line-height: 40px;
 }

 .tab-control-item span {
   padding: 5px;
 }

 .active {
   color: var(--color-high-text);
 }

 .active span {
   border-bottom: 3px solid var(--color-tint);
 }
</style>
<template>
  <div>
    <nav-bar>
      <!-- 部分样式设置在了NavBar.vue中，比如这里的back类对其进行样式设置无效，template标签最终是不存在的 -->
        <template #left class="back">
          <img src="~assets/img/common/back.svg" @click="backClick">
        </template>
        <template  v-slot:center>
          <div v-for="(item, index) in titles" class="title-item" 
            :class="{active: currentIndex === index}" 
            :key="index"
            @click="titleClick(index)"
          >
            {{item}}
          </div>
        </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      switch (index) {
        case 0:
          this.currentIndex = 0
          break
        case 1:
          this.currentIndex = 1
          break
        case 2:
          this.currentIndex = 2
          break
        case 3:
          this.currentIndex = 3
      }
    },
    backClick() {
      this.$router.back()
    }
  }
};
</script>
<style scoped>

.title-item {
  flex: 1;
  font-size: 13px;
}

.active {
  color: red;
}

/* .back img {
  margin-top: 10px;
} */
</style>
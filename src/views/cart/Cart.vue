<template>
  <div class="cart">
    <nav-bar class="nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
  </div>
</template>

<script>
  import CartList from './childComps/CartList'
  import NavBar from 'components/common/navbar/NavBar'
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList
    },
    computed: {
      // 将vuex中的getters方法直接转为计算属性,两种语法
      // 1.直接映射
      ...mapGetters(['cartLength'])

      // 2.给映射的方法取别名来使用
      // ...mapGetters({
      //   length: 'cartLength'
      // })
    },
    created () {
      console.log('cart created')
    }
  }
</script>

<style scoped>
.cart {
  height: 100vh
}

.nav {
  background-color: var(--color-tint);
  color: white;
}
</style>

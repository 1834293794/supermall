<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-name" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥'+this.cartList.filter( item => {
        return item.checked
      }).reduce((preValue, item) => {
        return item.price * item.count + preValue
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false

      // 1.使用filter
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      // 2.使用find
      return !this.cartList.find(item => !item.checked)
    },
    isSelectHave() {
      return this.cartList.find(item => item.checked)
    }
  },
  methods: {
    // 全部选中时
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach( item => {
          item.checked = false
        })
      } else {//部分或全部不选中
        this.cartList.forEach( item => {
          item.checked = true
        })
      }
    },
    calcClick() {
      if (!this.isSelectHave) {
        this.$toast.show('请选择要购买的商品', 1500)
      }
    }
  }
}
</script>
<style scoped>
.bottom-bar {
  height: 40px;
  display: flex;
  background-color: #eee;
  position: relative;
  /* bottom: 40px; */
  line-height: 40px;
}

.check-content {
  width: 70px;
  display: flex;
  align-items: center;
}

.check-name {
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.total-price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 90px;
  color: #fff;
  text-align: center;
  background-color: red;
}
</style>
<template>
<!-- ref如果是绑定在组件中的，则可以通过this.$refs.refname获取到一个组件对象 -->
<!-- ref如果是绑定在普通元素中的，则可以通过this.$refs.refname获取到一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message: '哈哈哈'
      }
    },
    mounted() {
      // 1.创建BScroll对象
      // 不建议使用document中的方法获取dom，因为页面中可能有其他标签起了同样的类名
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })

      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      // 移动位置
      scrollTo(x, y, time=300) {
        // 这种写法只有前面的条件执行成功，即为true才会执行接下去的代码
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 完成上拉加载更多，没有这步的话上拉操作只会生效一次
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        // console.log('-----')
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>


// 用于css单位的转换，将px转换为vw以适应各种大小的屏幕
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度，对应的是设计稿的宽度
      viewportHeight: 667, //视窗高度
      unitPrecision: 5, //指定'px'转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', //指定需要转换成的视窗单位，建议用vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类
      minPixelValue: 1, //小于或等于'1px'不转转为视窗单位
      mediaQuery: false //允许在媒体查询中转换'px'
    }
  }
}
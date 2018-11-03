// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import App from './App'
import router from './router'
import './main.scss'
Vue.use(MintUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  // 确定区域
  el: '#app',
  router,
  // 注册组件 key值跟value值一样时可以采用简写形式
  components: { App },
  // 使用组件 这样写的话 无需再index.html找那个通过<App/>使用组件
  // 使用该组件完全替换了页面(index.html)中的div#app
  mounted () {
    document.getElementById('content').addEventListener('scroll', this.scrollToTop)
  },
  methods: {
    scrollToTop () {
      let scrollTop = document.getElementById('content').scrollTop
      // console.log(scrollTop)
      if (scrollTop >= 200) {
      // console.log(document.getElementById('backTop'))
        document.getElementById('backTop').style.display = 'block'
      } else {
        document.getElementById('backTop').style.display = 'none'
      }
    }
  },
  template: '<App/>'
})

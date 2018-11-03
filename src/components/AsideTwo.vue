<template>
  <div>
    <div class="tasteLife">
      <b>品味生活</b><i><span class="iconfont icon-gengduo"></span><span style="margin-right:0.05rem">更多</span></i>
      <div style="display: flex;flex-wrap: nowrap;overflow-y:scroll;">
        <div class="tasteLife_left" v-for="(item, index) in asideTwoList" :key="index">
          <div><img v-lazy.asideTwoList="item.pic_url"></div>
          <p>{{item.title}}</p>
          <span>{{item.summary}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Lazyload} from 'mint-ui'
Vue.use(Lazyload)
export default {
  props: ['asideTwoList']
}
</script>
<style lang="scss">

</style>

<template>
  <div>
    <div class="asideBanner">
      <div class="asideBanner_left">
        <span>星品驾到</span>
        <h1>{{asideOneList.name}}</h1>
        <p>{{asideOneList.custom_summary}}</p>
        <i>￥<b>{{asideOneList.market_price | capitalize}}</b></i>
        <h2>{{asideOneList.saled_count}}<i>&nbsp;已卖</i></h2>
      </div>
      <div class="asideBanner_Right">
      <img v-lazy.asideOneList="asideOneList.pic_url">
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Lazyload} from 'mint-ui'
Vue.use(Lazyload)
export default {
  props: ['asideOneList'],
  filters: {
    capitalize: function (value) {
      value = value / 100
      return value
    }
  }
}
</script>
<style lang="scss">

</style>

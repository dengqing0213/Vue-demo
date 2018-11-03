<template>
  <div class="home_product">
    <div class="toSeen">
      <img src="../assets/images/home_pic_03.jpg">
    </div>
    <div class="recommend">
      <div class="recommend_title">
        <h1>有品推荐</h1>
      </div>
      <div class="recommend_content">
        <div class="recommend_content_top">
          <div class="recommend_content_top_left">
            <h2>{{productProlist.title}}</h2>
            <span>{{productProlist.subtitle}}</span>
          </div>
          <div class="recommend_content_top_right">
            <img v-lazy.productProlist="productProlist.pic_url">
          </div>
        </div>
        <div class="recommend_content_bottom">
          <div class="recommend_content_bottom_left">
            <h2>{{productProlistLeft.title}}</h2>
            <span>{{productProlistLeft.subtitle}}</span>
            <img v-lazy.productProlist="productProlistLeft.pic_url">
          </div>
          <div class="recommend_content_bottom_right">
            <h2>{{productProlistRight.title}}</h2>
            <span>{{productProlistRight.subtitle}}</span>
            <img v-lazy.productProlist="productProlistRight.pic_url">
          </div>
        </div>
      </div>
    </div>
    <div class="raise">
      <b>小米众筹</b><i><span style="margin-right:0.05rem">更多</span><span class="iconfont icon-gengduo"></span></i>
      <div class="raise_content" v-for="(item, index) in productProlistRaise" :key="item.gid" :style="{'background': bgcolor[index]}">
        <div class="raise_content_left">
          <h3>{{item.name}}</h3>
          <h4>{{item.summary}}</h4>
          <h5><span>￥</span>{{item.market_price | capitalize}}</h5>
        </div>
        <div class="raise_content_right">
          <img v-lazy.productProlistRaise="item.pic_url"/>
        </div>
        <p><span>{{item.saled_count}}</span>人支持<i>{{item.progress}}%</i></p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {Lazyload} from 'mint-ui'
Vue.use(Lazyload)
export default {
  data () {
    return {
      bgcolor: ['#f1f9ea', '#fff9fa', '#fbeefb'],
      prolist: [],
      productProlist: [],
      productProlistLeft: [],
      productProlistRight: [],
      productProlistRaise: []
    }
  },
  filters: {
    capitalize: function (value) {
      value = value / 100
      return value
    }
  },
  created () {
    axios.get('http://localhost:3000').then(res => {
      // console.log(res.data)
      this.prolist = res.data
      // banner图下面的那五个商品
      this.productProlist = this.prolist[0].data.homepage.floors[3].data.items[0]
      this.productProlistLeft = this.prolist[0].data.homepage.floors[3].data.items[1]
      this.productProlistRight = this.prolist[0].data.homepage.floors[3].data.items[2]
      this.productProlistRaise = this.prolist[0].data.homepage.floors[4].data.items
      // console.log(this.productProlistRaise)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style lang="scss">

</style>

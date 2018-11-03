<template>
  <ul class="produceTwo">
    <li v-for="(item,index) in productList" :key="index">
      <img v-lazy.productList="item.pic_url"/>
      <p>{{item.title}}</p>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import {Lazyload} from 'mint-ui'
Vue.use(Lazyload)
export default {
  props: ['productList']
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
.produceTwo{
  @include rect(100%, 1rem);
  @include flexbox();
  flex-wrap: nowrap;
  overflow-x: scroll;
  // @include padding(0.1rem 0 0.2rem 0);
  li{
    @include rect(1rem, 0.8rem);
    @include text-color(#666);
    text-align: center;
    @include padding(0.05rem 0 0 0.1rem);
    img{
      border-radius: 5%;
      @include rect(.7rem, 80%);
    }
    p{
      @include font-size(12px);
    }
  }
}
</style>

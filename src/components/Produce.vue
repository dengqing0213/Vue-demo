<template>
  <ul class="produce">
    <li v-for="item in produceProlist" :key="item.gid">
      <img v-lazy.produceProlist="item.pic_url"/>
      <p>{{item.title}}</p>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import {Lazyload} from 'mint-ui'
Vue.use(Lazyload)
export default {
  props: ['produceProlist']
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
.produce{
  @include rect(100%, 0.8rem);
  @include flexbox();
  @include justify-content(space-around);
  @include padding(0.1rem 0 0.2rem 0);
  li{
    @include rect(0.6rem, 0.5rem);
    @include text-color(#666);
    text-align: center;
    img{
      @include rect(100%, 90%);
    }
    p{
      @include font-size(12px);
      @include font-weight(bold);
    }
  }
}
</style>

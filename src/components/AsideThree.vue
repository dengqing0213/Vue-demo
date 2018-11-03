<template>
  <div>
    <div class="asideThreeList" v-for="(item, index) in asideThreeList" :key="index">
      <div class="aside_border"></div>
      <b>{{item.data.title}}</b><i><span style="margin-right:0.05rem">更多</span><span class="iconfont icon-gengduo"></span></i>
      <div class="asideImg">
        <img v-lazy.asideThreeList="item.data.pic_url">
      </div>
      <div class="asideUlList">
        <ul>
          <li v-for="itemLi in item.data.items" :key="itemLi.gid">
            <div>
              <img v-lazy.asideThreeList="itemLi.pic_url"/>
              <span v-if="itemLi.market_price != itemLi.price_min">直降{{ itemLi.market_price / 100 - itemLi.price_min / 100}}元</span>
            </div>
            <p>{{itemLi.name}}</p>
            <i>￥<span>{{itemLi.price_min | capitalize}}</span>起</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Lazyload} from 'mint-ui'
Vue.use(Lazyload)
export default {
  props: ['asideThreeList'],
  filters: {
    capitalize: function (value) {
      value = value / 100
      return value
    }
  }
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
  .asideThreeList{
    position: relative;
    @include rect(100%,auto);
    @include margin(.5rem 0 0 0);
    .aside_border{
      @include rect(131%, 0.1rem);
      position: absolute;
      left:-1rem;
      top:0;
      @include background-color(#eee);
    }
    b{
      display: inline-block;
      @include margin(0.2rem 0.1rem 0 0);
      @include font-size(0.14rem);
      @include font-weight(bold);
      @include line-height(0.24rem);
    }
    i{
      display: inline-block;
      float:right;
      @include margin(0.2rem 0 0.1rem 0);
      span{
        @include font-size(0.11rem);
        @include text-color(#999);
        @include line-height(0.24rem);
        &.iconfont{
          @include font-size(0.14rem);
        }
      }
    }
    .asideImg{
      @include rect(100%,0.8rem);
       img{
         @include rect(100%, 100%);
       }
    }
    .asideUlList{
      @include margin(0.2rem 0 0 0);
      ul {
        @include rect(100%, auto);
        @include flexbox();
        flex-wrap: wrap;
        @include justify-content(space-around);
        li{
          @include rect(25%, auto);
          @include margin(0.1rem 0.1rem 0.1rem 0.1rem);
          img{
            @include rect(100%, 1rem);
          }
          div{
            span{
              position: absolute;
              display: inline-block;
              @include rect(0.5rem, 0.15rem);
              @include background-color(#d97070);
              @include text-color(#fff);
              @include font-size(.1rem);
              @include margin(0.1rem 0 0 0);
            }
          }
          p{
            line-height: 0.24rem;
            height: 0.7rem;
            @include margin(0.3rem 0 0 0);
          }
          i{
            float: none;
            @include font-size(0.1rem);
            @include text-color(#a10000);
            span{
              @include text-color(#a10000);
              @include font-size(0.14rem);
            }
          }
        }
      }
    }
  }
</style>

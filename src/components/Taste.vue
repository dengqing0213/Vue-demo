
<template>
  <div>
    <div class="tasteHeader">
      <h1>{{title}}</h1>
    </div>
    <div class="tasteBanner">
      <ul>
        <li>
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item, index) in bannerList" :key="index"><img v-lazy.bannerList="item.pic_url"></mt-swipe-item>
       <!-- <li v-for="(item, index) in bannerList" :key="index"><img v-lazy.bannerList="item.pic_url"/></li>-->
        </mt-swipe>
        </li>
      </ul>
    </div>
    <ProduceTwo :productList="productList"></ProduceTwo>
    <div>
      <div class="content_border"></div>
    </div>
    <div class="taste_week">
      <h1>{{tasteWeekTitle}}</h1>
      <div class="taste_week_topImg">
        <img :src="pic_url" />
      </div>
      <ul class="taste_week_list">
        <li v-for="item in tasteWeekList" :key="item.gid">
          <div class="taste_week_listImg">
            <img v-lazy.tasteWeekList="item.pic_url"/>
          </div>
          <p>{{item.name}}</p>
          <span>￥{{item.price_min | capitalize}}</span>
        </li>
      </ul>
    </div>
    <div>
      <div class="content_border"></div>
    </div>
    <div class="taste_content">
      <h1>独家专栏</h1>
      <div class="tasteList" v-for="item in tasteProList" :key="item.ID">
        <ul>
          <li>
            <img v-lazy.tasteProList="item.pic_url"/>
            <h1>{{item.title}}</h1>
            <span>{{item.subtitle}}</span>
            <p>去发现</p>
          </li>
        </ul>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import ProduceTwo from '@/components/ProduceTwo'
import BackTop from '@/components/BackTop'
import {Swipe, SwipeItem, Lazyload} from 'mint-ui'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
export default {
  data: function () {
    return {
      bannerList: [],
      productList: [],
      tasteList: [],
      tasteWeekTitle: '',
      tasteWeekList: [],
      title: '',
      pic_url: '',
      tasteProList: []
    }
  },
  filters: {
    capitalize: function (value) {
      value = value / 100
      return value
    }
  },
  components: {
    ProduceTwo,
    BackTop
  },
  created () {
    axios.get('http://localhost:3000/taste').then(res => {
      // console.log(res.data)
      this.tasteList = res.data
      /* this.tasteWeekTitle = this.tasteList[0].RECORDS[0].twe.title
      this.tasteWeekList = this.tasteList[0].RECORDS[0].twe.rgs[0].goods_list */
      this.tasteWeekTitle = this.tasteList[0].RECORDS[0].twe.title
      this.title = this.tasteList[0].RECORDS[0].twe.rags[0].mode
      this.pic_url = this.tasteList[0].RECORDS[0].twe.rags[0].pic_url
      this.tasteWeekList = this.tasteList[0].RECORDS[0].twe.rags[0].goods_list
      this.bannerList = this.tasteList[0].RECORDS[0].one.rags[0].banners
      this.productList = this.tasteList[0].RECORDS[0].one.rags[1].items
      this.tasteProList = this.tasteList[0].RECORDS[0].three.rags
      // console.log(this.tasteProList)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
h1{
  @include text-align();
  @include line-height(0.44rem);
  @include font-weight(normal);
  @include font-size(0.16rem);
}
  .tasteHeader{
    @include rect(100%, 0.44rem);
    border-bottom: 3px double #bfbfc0;
    position: fixed;
    z-index: 999;
    top:0;
    background-color: #fff;
  }
  .tasteBanner{
    @include rect(100%, 2rem);
    @include margin(0.45rem 0 0 0);
    ul{
      @include rect(100%, 100%);
      @include flexbox();
      overflow-x:scroll;
      li{
        @include rect(100%, 90%);
        @include text-align();
        @include margin(0.1rem);
        .mint-swipe-items-wrap{
          @include rect(100%, 100%);
          img{
            border-radius: 2%;
            @include rect(3.2rem, 100%);
          }
        }
      }
    }
  }
  .content_border{
    @include rect(100%, 0.1rem);
    @include background-color(#f5f5f5);
  }
  .taste_week{
    @include rect(100%,auto);
    .taste_week_topImg{
      @include rect(100%,1rem);
      @include text-align();
      img{
        border-radius: 2%;
        @include rect(90%,95%);
      }
    }
    .taste_week_list{
      @include rect(auto, 1.5rem);
      @include margin(0.05rem 0 0 0.1rem);
      overflow-x: scroll;
      @include flexbox();
      li{
        @include margin(0.05rem);
        @include rect(1rem,100%);
        .taste_week_listImg{
          background-color: rgba(0, 0, 0, 0.02);
          @include padding(0.1rem 0 0 0);
          @include text-align();
          @include rect(100%, 1rem);
          img{
            @include rect(.8rem,auto);
          }
        }
        p{
          @include font-size(0.12rem);
          @include text-color(#666);
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap
        }
        span{
          @include text-color(#b60909);
          @include font-size(0.14rem);
        }
      }
    }
  }
  .taste_content{
    .tasteList{
      @include rect(100%,auto);
      @include padding(0.1rem);
      ul{
        li{
          position: relative;
          @include rect(100%, 3rem);
          @include text-align();
          img{
            @include rect(100%,2rem);
            border-radius: 2%;
          }
          span{
            @include text-color(#999);
            @include font-size(0.12rem)
          }
          p{
            @include rect(0.7rem,0.28rem);
            @include line-height(0.28rem);
            @include background-color(#845f3f);
            @include text-color(#fff);
            @include font-size(0.14rem);
            @include padding(0 0.05rem 0 0.05rem);
            border-radius: 0.02rem;
            position: absolute;
            left:43%;
            @include margin(0.1rem 0 0 0);
          }
        }
      }
    }

  }
</style>

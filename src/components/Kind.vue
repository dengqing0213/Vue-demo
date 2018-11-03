<template>
  <div>
    <div class="kindHeader">
      <div class="kindSearch" @click="toSearch">
        <span class="iconfont icon-search"></span><span>热门搜索</span>
      </div>
    </div>
    <div class="kindContent" style="margin-top: 0.4rem">
      <div class="kindContent_left">
        <ul>
          <li class="nav" v-for="(item, index) in navList" :key="index" @click="contentShow(index)" :class="{active:index===current}"><span>{{item.name}}</span></li>
        </ul>
      </div>
     <div class= "contentShow" style="width:80%;position: relative">
       <div class="kindContent_right">
         <div class="kindRight_img">
           <img :src="pic_url"/>
         </div>
         <div class="kindContent_list">
           <ul>
             <li v-for="(item, index) in activeContent" :key="index">
               <img :src="item.pic_url">
               <span>{{item.name}}</span>
             </li>
           </ul>
         </div>
       </div>
     </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import BackTop from '@/components/BackTop'
import {Lazyload} from 'mint-ui'

Vue.use(Lazyload)
export default {
  data: function () {
    return {
      kindList: [],
      navList: [],
      contentList: [],
      activeIndex: 0,
      show: 'none',
      activeContent: [],
      pic_url: '',
      current: 0
    }
  },
  components: {
    BackTop
  },
  created () {
    axios.get('http://localhost:3000/kind').then(res => {
      // console.log(res.data)
      this.kindList = res.data
      // banner图下面的那五个商品
      // console.log(this.kindList)
      this.navList = this.kindList[0].RECORDS[0].nav
      this.contentList = this.kindList[0].RECORDS[0].content
      this.activeContent = this.contentList[0]
      this.pic_url = this.contentList[0][0].pic_url
      /* console.log(this.contentList)
      console.log(this.contentList[0][0].pic_url)
      console.log(this.contentList[1][0].pic_url)
      console.log(this.contentList[2][0].pic_url)
      console.log(this.activeContent[0].pic_url) */
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    toSearch () {
      this.$router.push({path: 'search'})
    },
    contentShow (index) {
      // console.log(this.activeIndex)
      this.activeContent = this.contentList[index]
      this.pic_url = this.contentList[index][0].pic_url
      // console.log(this.activeContent)
      // console.log(this.activeContent[0].pic_url)
      this.current = index
    }
  }
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
  .kindHeader{
    @include rect(100%, 0.4rem);
    @include flexbox();
    @include justify-content();
    @include align-items();
    position: fixed;
    top:0;
    z-index: 999;
    background-color: #fff;
    .kindSearch{
      @include rect(95%, 0.3rem);
      @include background-color(#eee);
      span{
        @include text-color(#999);
        @include font-size(0.13rem);
        @include line-height(0.3rem);
        &.iconfont{
          @include font-size(0.24rem);
          @include padding(0 0.1rem 0 0)
        }
      }
    }

  }
  .kindContent{
    @include flexbox();
    @include margin(0.1rem 0 0 0);
    .kindContent_left{
      @include rect(0.8rem, auto);
      border-right:1px solid #e5e5e5;
      border-top:1px solid #e5e5e5;
      ul{
        li{
          @include rect(100%, .2rem);
          @include margin(0.2rem 0 0.2rem 0);
          @include padding(0 0 0 0.1rem);
          @include text-color(#666);
          &.active{
            @include text-color(#845f3f);
            border-left:3px solid #845f3f;
          }
          span{
            @include font-size(0.13rem);
          }
        }
      }
    }
    .kindContent_right{
      position: absolute;
      background-color: #fff;
      border-top:1px solid #e5e5e5;
      @include rect(100%,auto);
      @include padding(0.15rem);
      .kindRight_img{
        @include rect(100%, 1.5rem);
        img{
          @include rect(100%, 1.4rem);
        }
      }
      .kindContent_list{
        ul{
          @include rect(100%, auto);
          @include flexbox();
          flex-wrap: wrap;
          @include justify-content(space-around);
          li{
            &:nth-child(1){
              display: none;
            }
            @include rect(30%, .8rem);
            @include text-align();
            @include margin(0.1rem 0 0.1rem 0);
            img{
              @include rect(90%,.6rem);
            }
            span{
              @include font-size(.12rem);
              @include line-height(0.4rem);
            }
          }
        }
      }
    }
  }
</style>

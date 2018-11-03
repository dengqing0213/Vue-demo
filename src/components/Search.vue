<template>
  <div>
    <div class="nav_search">
      <div class="back"  @click="goBack">
        <span class="iconfont icon-jiantou2" style="font-size: 24px;margin-right: 0.2rem;font-weight: bold;color: #999999"></span>
      </div>
      <div class="search">
        <span class="iconfont icon-search" style="font-size: 0.22rem;position: absolute;line-height:0.29rem"></span>
       <input name="search" placeholder="居家热卖"  ref="search" @change="changeData" style="color:#999999;padding-left:0.2rem;height: 90%;border:none;background-color: #eee;font-size: 12px"/>
      </div>
      <div class="searchTitle" style="text-align: center;font-size: 12px;padding-left: 0.2rem;padding-right: 0.4rem"  @click="search">搜索</div>
    </div>
    <div class="hotSearch">
      <span>热门搜索</span>
    </div>
    <div class="search_title">
      <div class="ul_title" style="width: 70%;color: #777672;font-size: 0.12rem">
        <span v-for="(item, index) in proList" :key="index" :style="{'background': bgColor[index],'display':'inline-block','margin':'0.1rem 0.1rem 0 0.1rem','padding':'0 0.06rem 0 0.06rem','text-align':'center','white-space': 'nowrap'}">{{item}}</span>
      </div>
    </div>
    <div class="searchList">
      <ul>
        <li v-for="item in searchList" :key="item.gid">
          <div class="img_box">
            <img :src="item.pic_url"/>
            <p>{{item.summary}}</p>
          </div>
          <div class="words_box">
            <p>{{item.name}}</p>
            <span>￥</span><i>{{item.market_price / 100}}</i>
          </div>
        </li>
      </ul>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
import axios from 'axios'
import BackTop from '@/components/BackTop'
export default {
  data () {
    return {
      proList: ['净水器', '小米8', '床', '拖把', '卫衣', '电视', '桌椅', '夹克', '马甲'],
      bgColor: ['#f1f9ea', '#fff9fa', '#fbeefb', '#ecf8fa', '#fef4fb', '#edebfb', '#fbf5eb', '#fff9fa', '#f8f1d1'],
      searchVal: null,
      searchList: [],
      value: ''
    }
  },
  components: {
    BackTop
  },
  created () {

  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    changeData () {
      this.value = this.$refs.search.value
    },
    search () {
      axios.get('http://localhost:3000/search?name=' + this.value)
        .then(res => {
          this.searchList = res.data
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
  .nav_search{
    @include rect(100%, 0.4rem);
    @include flexbox();
    @include background-color(#fff);
    @include align-items();
    .search{
      height: 80%;
      flex: 3;
      padding-left: 0.1rem;
      background-color: #eee;
      position: relative;
      span{
        line-height: 0.22rem;
      }
      .back{
        @include flex(1);
      }
    }
  }
  .hotSearch{
    @include background-color(#f8f8f8);
    @include rect(90%, 0.3rem);
    @include margin(0.1rem 0 0 0 );
    @include padding(0 0 0 0.1rem);
    line-height: 0.3rem;
    span{
      @include font-size(0.13rem);
      @include text-color(#a8a8a8);
    }
}
  .searchList{
    @include margin(0.2rem 0 0 0);
    @include rect(100%,auto);
    ul{
      @include flexbox();
      flex-wrap: wrap;
      @include rect(100%,auto);
      li{
        @include rect(50%, auto);
        border: 1px solid #eee;
        .img_box{
          @include padding(0.15rem);
          @include text-align();
          img{
            @include rect(1rem, 1rem);
          }
          p{
            @include margin(0.1rem 0 0 0);
            @include text-align(left);
            @include font-size(0.11rem);
            @include text-color(#ab8a59);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
          }
        }
        .words_box{
          @include padding(0.05rem 0.15rem);
          @include rect(100%, 0.6rem);
          @include background-color(#f5f5f5);
          p{
            @include font-size(0.12rem);
          }
          span{
            @include text-color(#b60909);
            @include font-size(0.1rem);
          }
          i{
            @include font-size(0.12rem);
            @include text-color(#b60909);
          }
        }
      }
    }
  }
</style>

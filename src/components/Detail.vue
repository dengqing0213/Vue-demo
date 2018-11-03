<template>
  <div class="detail">
    <div class="detail_header">
      <img src="https://static.home.mi.com/youpin/static/m/res/images/std_titlebar_detailBackNormal.png"  @click="goBack" />
      <img src="https://static.home.mi.com/youpin/static/m/res/images/std_titlebar_homeNormal.png" class="imgTwo" @click="goHome" />
    </div>
    <div class="detail_content">
      <div class="detail_content_top">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in detailImg" :key="index"><img v-lazy.detailImg="item"></mt-swipe-item>
          </mt-swipe>
      </div>
      <div class="detail_content_bottom">
        <div class="detail_content_bottomOne">
          <h1>{{detailTitle}}</h1>
          <p><span>{{detailTxt}}</span>{{detailSubTitle}}</p>
          <h5>
            <i>￥</i>{{detailPrice | capitalize}}
            <b v-if="detailPrice != detailPrice_min">￥{{detailPrice_min | capitalize}}</b>
            <span class="detailPrice" v-if="detailPrice != detailPrice_min">直降{{ detailPrice /100 - detailPrice_min /100 }}元</span>
          </h5>
        </div>
        <div class="detail_content_bottomTwo"  @click="openMask">
          <h4>已选：<i>请选择颜色&nbsp;分类&nbsp;序号</i><span class="iconfont icon-jiantouxiangyou"></span></h4>
        </div>
        <div class="detail_content_bottomThree">
          <h4>说明：
            <span class="iconfont icon-chenggong" style="color:#ab8a59;"></span><i>本产品为第三方产品</i>
            <p><span class="iconfont icon-chenggong"></span><i>由上海润米科技有限公司 发货并提供售后</i></p>
            <p><span class="iconfont icon-chenggong"></span><i>支持7天无理由退货（请参考商品详情-常见问题）</i></p>
          </h4>
        </div>
      </div>
    </div>
    <div class="detail_footer">
      <ul>
        <li><span class="iconfont icon-shoucang"></span><p>收藏</p></li>
        <li @click="goCartPage"><span class="iconfont icon-gouwuche"></span><p>购物车<i v-if="cartNumber!==0" id="CartNum">{{cartNumber}}</i></p></li>
        <li class="carBtn buyBtn" @click="goCartOne"><i>立即购买</i></li>
        <li class="carBtn addCar" @click="goCartTwo"><i>加入购物车</i></li>
      </ul>
    </div>
    <div class="contentMask" style="display: none">
      <div class="contentMask_top"></div>
      <div class="contentMask_bottom">
        <div class="contentMask_bottomOne">
          <div class="contentMask_bottomOne_img"><img :src="detailImgOne"/></div>
         <div class="contentMask_bottomOne_txt">
           <p>{{detailTitle}}</p>
           <span><i>￥</i>{{detailPrice | capitalize}}</span>
         </div>
          <span class="iconfont icon-guanbi" @click="closeMask"></span>
        </div>
        <div class="productNum">
          <p v-if="detailModel">{{model}}</p>
          <div class="modelDiv">
            <div class="ProModel" v-for="(item ,index) in detailModel" :key="index" @click="checkModel(index)" :class="{active:index===checkModelIndex}">{{item}}</div>
          </div>
          <p v-if="detailColor">{{color}}</p>
          <div class="colorDiv">
            <div class="ProColor" v-for="(item ,index) in detailColor" :key="index" @click="checkColor(index)" :class="{active:index===checkColorIndex}">{{item}}</div>
          </div>
          <p v-if="detailSize">{{size}}</p>
          <div class="sizeDiv">
            <div class="ProSize" v-for="(item, index) in detailSize" :key="index" @click="checkProSize(index)" :class="{on:index===checkSizeIndex}">{{item}}</div>
            <!--<div class="ProSize">L</div>-->
            <!--<div class="ProSize">XL</div>-->
          </div>
          <p>数量</p>
          <div class="numCount" style="display: flex;justify-content: flex-start;height: 0.3rem;width: 0.8rem">
            <div class="productNumber reduceBtn" @click="reduceNum">-</div>
            <div class="productNumber" id="proNum">{{product_num}}</div>
            <div class="productNumber addBtn" @click="addNum">+</div>
          </div>
          <div class="addPro" style="margin-top: 0.5rem">
            <p class="addProNow" @click="goBuy">立刻购买</p>
            <p class="addCarNow" @click="goCart">加入购物车</p>
          </div>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
import Vue from 'vue'
// 引入axios模块请求数据
import axios from 'axios'
import BackTop from '@/components/BackTop'
import {Swipe, SwipeItem, Toast} from 'mint-ui'

Vue.use(Toast)
Vue.use(Swipe)
Vue.use(SwipeItem)
export default {
  data () {
    return {
      detailList: [],
      detailTitle: '',
      detailTxt: [],
      detailSubTitle: '',
      detailImgOne: '',
      detailImgTwo: '',
      detailImgThree: '',
      detailImg: [],
      detailPrice: '',
      detailPrice_min: '',
      detailColor: [],
      detailModel: [],
      detailSize: [],
      color: '颜色',
      model: '型号',
      size: '尺寸',
      checkColorIndex: 0,
      checkSizeIndex: 0,
      checkModelIndex: 0,
      gid: '',
      cartNumber: 0,
      product_num: 1
    }
  },
  components: {
    BackTop
  },
  filters: {
    capitalize: function (value) {
      value = value / 100
      return value
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    goHome () {
      this.$router.push('/')
    },
    reduceNum () {
      if (this.product_num <= 1) {
        this.product_num = 1
      } else {
        this.product_num--
      }
    },
    addNum () {
      this.product_num++
    },
    closeMask () {
      let contentMask = document.querySelector('.contentMask')
      contentMask.style.display = 'none'
    },
    checkColor (index) {
      // console.log(index)
      this.checkColorIndex = index
    },
    checkProSize (index) {
      // console.log(index)
      this.checkSizeIndex = index
    },
    checkModel (index) {
      // console.log(index)
      this.checkModelIndex = index
    },
    openMask () {
      const contentMask = document.querySelector('.contentMask')
      contentMask.style.display = 'flex'
    },
    goCartOne () {
      const contentMask = document.querySelector('.contentMask')
      contentMask.style.display = 'flex'
    },
    goCartTwo () {
      const contentMask = document.querySelector('.contentMask')
      contentMask.style.display = 'flex'
    },
    goCart () {
      this.cartNumber += this.product_num
      const ProSize = document.querySelectorAll('.ProSize')
      // console.log(ProSize)
      if (ProSize.length !== 0) {
        var size = ProSize[this.checkSizeIndex].innerHTML
      }
      const ProColor = document.querySelectorAll('.ProColor')
      if (ProColor.length !== 0) {
        var color = ProColor[this.checkColorIndex].innerHTML
      }
      const ProModel = document.querySelectorAll('.ProModel')
      if (ProModel.length !== 0) {
        var model = ProModel[this.checkModelIndex].innerHTML
      }
      var cartObj = {}
      cartObj.gid = this.gid
      cartObj.pic = this.detailList[0].pic_url
      cartObj.num = this.product_num
      cartObj.price = this.detailPrice_min / 100
      cartObj.color = color
      cartObj.size = size
      cartObj.name = this.detailTitle
      cartObj.model = model
      cartObj.selected = true
      // console.log(cartObj)
      var cartListStr = localStorage.getItem('MiCart')
      if (cartListStr) {
        // console.log('有值')
        var cartList = JSON.parse(cartListStr)
        var result = false
        var activeIndex = 0
        if (cartList) {
          for (var i = 0; i < cartList.length; i++) {
            if (cartList[i].gid === cartObj.gid) {
              activeIndex = i
              result = true
            }
          }
          if (result) {
            cartList[activeIndex].num = cartList[activeIndex].num * 1 + this.product_num
            localStorage.setItem('MiCart', JSON.stringify(cartList))
          } else {
            cartList.push(cartObj)
            localStorage.setItem('MiCart', JSON.stringify(cartList))
          }
        } else {
          // 没有值表示第一次加入
          var arrCart = []
          arrCart.push(cartObj)
          localStorage.setItem('MiCart', JSON.stringify(arrCart))
        }
      }
      Toast({
        message: '加入购物车成功！',
        position: 'middle',
        duration: 1000
      })
      this.closeMask()
      // window.location.href = 'http://localhost:8080/#/cart'
    },
    goBuy () {
      this.cartNumber += this.product_num
      const ProSize = document.querySelectorAll('.ProSize')
      // console.log(ProSize)
      if (ProSize.length !== 0) {
        var size = ProSize[this.checkSizeIndex].innerHTML
      }
      const ProColor = document.querySelectorAll('.ProColor')
      if (ProColor.length !== 0) {
        var color = ProColor[this.checkColorIndex].innerHTML
      }
      const ProModel = document.querySelectorAll('.ProModel')
      if (ProModel.length !== 0) {
        var model = ProModel[this.checkModelIndex].innerHTML
      }
      var cartObj = {}
      cartObj.gid = this.gid
      cartObj.pic = this.detailList[0].pic_url
      cartObj.num = this.product_num
      cartObj.price = this.detailPrice_min / 100
      cartObj.color = color
      cartObj.size = size
      cartObj.name = this.detailTitle
      cartObj.model = model
      cartObj.selected = true
      var arrCart = []
      arrCart.push(cartObj)
      localStorage.setItem('buylist', JSON.stringify(arrCart))
      var userName = localStorage.getItem('username')
      if (userName) {
        this.$router.push('/payOrder')
      } else {
        this.$router.push('/login')
      }
    },
    getCarNum () {
      var cartListStr = localStorage.getItem('MiCart')
      var cartList = JSON.parse(cartListStr)
      if (cartList) {
        for (var i = 0; i < cartList.length; i++) {
          this.cartNumber += Number(cartList[i].num)
        }
      }
    },
    goCartPage () {
      this.$router.push('/cart')
    }
  },
  mounted () {
    const id = this.$route.params.id
    // console.log(id)
    // 请求数据
    axios.get('http://localhost:3000/detail?gid=' + id)
      .then(res => {
        this.detailList = res.data
        this.detailTitle = this.detailList[0].name
        this.detailTxt = this.detailList[0].attr_ext.red_words
        this.detailSubTitle = this.detailList[0].summary
        this.detailImgOne = this.detailList[0].imgs.img800
        this.detailImgTwo = this.detailList[0].imgs.img_horizon
        this.detailImgThree = this.detailList[0].imgs.img_square
        this.detailImg.push(this.detailImgOne)
        this.detailImg.push(this.detailImgTwo)
        this.detailImg.push(this.detailImgThree)
        this.detailPrice = this.detailList[0].market_price
        this.detailPrice_min = this.detailList[0].price_min
        this.detailColor = this.detailList[0].color
        this.detailModel = this.detailList[0].model
        this.detailSize = this.detailList[0].size
        this.gid = this.detailList[0].gid
        // console.log(this.detailModel, this.detailSize)
      }).catch(err => {
        console.log(err)
      })
  },
  created () {
    this.getCarNum()
  }
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
.detail{
  @include flexbox();
  @include flex-direction(column);
  @include rect(100%,100%);
  .detail_header{
    @include rect(100%, 0.44rem);
    @include padding(0 0.1rem 0 0.1rem);
    img{
     @include rect(0.5rem, 0.5rem);
      &.imgTwo{
        float: right;
      }
    }
  }
  .detail_content{
    @include flex();
    @include rect(100%,auto);
    @include overflow();
    .detail_content_top{
      @include rect(100%, 3.8rem);
      .mint-swipe{
        @include rect(100%,3.8rem);
        img{
          @include rect(100%,100%);
        }
      }
      .mint-swipe-indicators{
        display: none;
      }
    }
    .detail_content_bottom{
      @include rect(100%,auto);
      h4{
        @include font-size(0.12rem);
        @include font-weight(normal);
        @include text-color(#999);
        i{
          @include text-color(#333);
        }
      }
      .detail_content_bottomOne{
        @include padding(0 0.15rem 0 0.15rem);
        border-bottom: 0.1rem solid #f5f5f5;
        h1{
          @include text-align(left);
          @include margin(0.1rem 0 0 0);
          @include font-weight(normal);
          font-size:0.15rem !important;
        }
        p{
          @include font-size(0.13rem);
          @include text-color(#999);
          span{
            @include text-color(#b60909);
            // @include margin(0 0.1rem 0 0);
          }
        }
        h5{
          @include font-size(0.20rem);
          @include text-color(#b60909);
          @include font-weight(normal);
          @include margin(0.1rem 0 0 0);
          i{
            @include font-size(0.12rem);
          }
          b{
            @include font-size(0.14rem);
            @include text-color(#999);
            @include font-weight(normal);
            text-decoration: line-through;
          }
          .detailPrice{
            @include text-color(#fff);
            display: inline-block;
            @include background-color(#d97070);
            @include font-size(0.12rem );
            @include padding(0 0.02rem 0 0.02rem);
          }
        }
      }
      .detail_content_bottomTwo{
        @include padding(0.1rem 0.15rem 0.1rem 0.15rem);
        border-bottom: 0.1rem solid #f5f5f5;
      }
      .detail_content_bottomThree{
        @include padding(0.1rem 0.15rem 0.1rem 0.15rem);
        border-bottom: 0.1rem solid #f5f5f5;
        h4{
          @include margin(0 0.1rem 0 0);
        }
        p{
          span{
            @include text-color(#ab8a59);
            @include margin(0 0 0 0.4rem);
          }
        }
      }
    }
  }
  .detail_footer{
    @include rect(100%, 0.44rem);
    @include background-color(#fff);
    border-top: 1px solid #ccc;
   /* position: fixed;
    bottom:0;
    left:0; */
    ul{
      @include rect(100%, 100%);
      @include flexbox();
      @include justify-content(space-around);
      @include align-items();
      li{
        @include text-align();
        span{
          @include font-size(0.16rem);
          @include text-color(#999);
        }
        p{
          position: relative;
          @include text-color(#999);
          @include font-size(0.12rem);
          #CartNum{
            position: absolute;
            left:0.2rem;
            top:-0.3rem;
            display: inline-block;
            @include rect(0.15rem, 0.15rem);
            @include background-color(red);
            @include text-color(#fff);
            border-radius: 50%;
          }
        }
        &.carBtn{
          @include rect(1rem, 0.3rem);
          @include line-height(0.3rem);
          @include text-color(#fff);
          border-radius: 16px;
          i{
            @include text-color(#fff);
          }
        }
        &.buyBtn{
          @include rect(1rem, 0.3rem);
          @include background-color(#b60909);
        }
        &.addCar{
          @include rect(1rem, 0.3rem);
          @include background-color(#ab8a59);
        }
      }
    }
  }
  .contentMask{
    position: absolute;
    left: 0;
    top:0;
    @include flexbox();
    @include flex-direction(column);
    @include rect(100%, 100%);
    .contentMask_top{
      @include rect(100%, 3rem);
      background-color: rgba(0, 0, 0, 0.3);
    }
    .contentMask_bottom{
      // @include flex();
      @include rect(100%, auto);
      @include background-color(#fff);
      @include padding(0 0.15rem 1rem 0.15rem);
      @include overflow();
      .contentMask_bottomOne{
        position: fixed;
        @include background-color(#fff);
        @include rect(100%,auto);
        .iconfont{
          @include font-size(0.16rem);
          @include text-color(#ccc);
        }
        border-bottom: 1px solid #f5f5f5;
        @include padding(0.15rem 0 0.15rem 0);
        @include flexbox();
        .contentMask_bottomOne_img{
          @include rect(0.7rem, 0.7rem);
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          @include text-align();
          img{
            @include rect(0.6rem, 0.6rem);
          }
        }
        .contentMask_bottomOne_txt{
          @include padding(0 0 0 0.1rem);
          p{
            @include text-color(#333);
            @include font-size(0.16rem);
            @include rect(1.8rem, 0.3rem);
            @include margin(0 0 0.2rem 0);
          }
          span{
            @include text-color(#b60909);
            @include font-size(0.18rem);
            i{
              @include font-size(0.12rem);
            }
          }
        }
      }
      .productNum{
        @include margin(1rem 0 0 0);
        @include rect(100%, auto);
        p{
          @include text-color(#999);
          @include padding(0.1rem 0 0.15rem 0);
          }
        .productNumber{
          float: left;
          border: 1px solid #e0e0e0;
          @include rect(0.3rem, 0.25rem);
          @include background-color(#fff);
          @include text-align();
          @include line-height(0.24rem);
          @include margin(0.1rem 0 0 0)
        }
        .colorDiv{
          border: none;
          @include rect(100%,auto);
          float: none;
          @include flexbox();
          flex-wrap: wrap;
          .ProColor{
            @include font-size(0.12rem);
            @include rect(0.9rem, 0.3rem);
            @include margin(0 0.1rem 0.2rem 0);
            border: 1px solid #eeeeee;
            @include line-height(0.3rem);
            @include text-align();
            border-radius: 0.05rem;
            &.active{
              @include background-color(#ab8a59);
              @include text-color(#fff);
            }
          }
        }
        .modelDiv{
          border: none;
          @include rect(100%,auto);
          float: none;
          @include flexbox();
          flex-wrap: wrap;
          .ProModel{
            @include font-size(0.12rem);
            @include rect(0.9rem, 0.3rem);
            @include margin(0 0.1rem 0.2rem 0);
            border: 1px solid #eeeeee;
            @include line-height(0.3rem);
            @include text-align();
            border-radius: 0.05rem;
            &.active{
              @include background-color(#ab8a59);
              @include text-color(#fff);
            }
          }
        }
        .sizeDiv{
          border: none;
          @include rect(100%,auto);
          float: none;
          @include flexbox();
          flex-wrap: wrap;
          .ProSize{
            @include font-size(0.12rem);
            @include rect(0.3rem, 0.3rem);
            @include margin(0 0.1rem 0.2rem 0);
            border: 1px solid #eeeeee;
            @include line-height(0.3rem);
            @include text-align();
            border-radius: 0.05rem;
            &.on{
              @include background-color(#ab8a59);
              @include text-color(#fff);
            }
          }
        }
      }
      .addPro{
        clear: both;
        @include flexbox();
        @include rect(100%,0.8rem);
        @include padding(0.2rem 0 0 0);
        @include justify-content(space-around);
        p{
          @include text-align();
          @include rect(1.2rem, 0.4rem);
          @include text-color(#fff);
          border-radius: 1.16rem;
          &.addProNow{
            @include background-color(#b60909);
            // @include margin(0 0.1rem 0 0.1rem);
          }
          &.addCarNow{
            @include margin(0 00.1rem 0 0.1rem);
            @include background-color(#ab8a59);
          }
        }
      }
    }
  }
}

</style>

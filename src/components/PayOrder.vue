<template>
  <div>
    <div class="orderHeader">
      <h1><span class="iconfont icon-jiantou2" style="font-size: 0.24rem" @click='backToCart'></span><em>立即购买</em></h1>
    </div>
    <div class="orderContent">
      <div class="order_content_title">
        <p @click="goAddress" v-if="hasAddress">没有收货地址，请点击后添加地址</p>
        <p class="address"><span>{{addressStr.user}}</span><i>{{addressStr.phone}}</i><em>{{addressStr.address}}</em></p>
        <span class="iconfont icon-jiantouxiangyou" v-if="hasAddress"></span>
      </div>
      <div class="order_border_top"></div>
      <div class="order_pay_methods">
        <ul>
          <li>
            <span class="iconfont icon-zhifubao"><i>支付宝</i></span>
            <img src="https://static.home.mi.com/youpin/static/m/res/images/std_icon_checkbox_check.png" @click="changePay" v-if="selected"/>
            <img src="https://static.home.mi.com/youpin/static/m/res/images/unselect.png" @click="changePay" v-else/>
          </li>
          <li>
            <span class="iconfont icon-shoufuwancheng"><i>小米分期</i></span>
            <img src="https://static.home.mi.com/youpin/static/m/res/images/std_icon_checkbox_check.png" @click="changePay" v-if="!selected"/>
            <img src="https://static.home.mi.com/youpin/static/m/res/images/unselect.png" @click="changePay" v-else/>
          </li>
        </ul>
      </div>
      <div class="send_method">
        <p>有品配送</p>
      </div>
      <div class="products">
        <ul>
          <li v-for="item in orderList" :key="item.gid">
            <div class="product_img">
              <img v-lazy.orderList="item.pic" />
            </div>
            <div class="product_detail">
              <h3>{{item.name}}</h3>
              <span><i>￥</i>{{item.price}}</span>
              <p><span class="iconfont icon-chenggong"></span><i>支持7天无理由退货</i></p>
            </div>
            <div class="product_num">
              <span>x{{item.num}}</span>
            </div>
          </li>
          <li class="userEdit"><span>买家留言</span><input type="text" placeholder="填写内容需与卖家协商并确认"/></li>
          <li class="userEdit otherInfo"><p>优惠劵/积分</p><i class="iconfont icon-jiantouxiangyou"></i></li>
          <li class="userEdit otherInfo"><p>配送方式</p><i >快递配送</i></li>
          <li class="userEdit otherInfo"><p>发票类型</p><i>不开发票</i></li>
          <li class="userEdit otherInfo proPrice"><p>商品总价</p><i class="pay_money">￥{{totalPrice}}.00</i></li>
        </ul>
      </div>
    </div>
    <div class="orderFooter">
      <div class="countMoney">
        <span>合计：</span><i>{{totalPrice}}.00元</i>
      </div>
      <div class="orderPay">
        <span>去支付</span>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
import Vue from 'vue'
import BackTop from '@/components/BackTop'
import {Toast} from 'mint-ui'
Vue.use(Toast)
export default {
  data () {
    return {
      orderList: [],
      totalPrice: 0,
      selected: true,
      allList: [],
      addressStr: {},
      hasAddress: true
    }
  },
  components: {
    BackTop
  },
  created () {
    this.getOderList()
    this.getAddress()
  },
  methods: {
    getAddress () {
      var address = localStorage.getItem('userAddress')
      if (address) {
        this.addressStr = JSON.parse(address)
        this.hasAddress = false
      }
    },
    backToCart () {
      window.history.go(-1)
    },
    getOderList () {
      var orderListStr = localStorage.getItem('buylist')
      this.orderList = JSON.parse(orderListStr)
      for (var i = 0; i < this.orderList.length; i++) {
        this.totalPrice += this.orderList[i].num * 1 * this.orderList[i].price
      }
      return [this.totalPrice, this.orderList]
    },
    changePay () {
      if (this.selected) {
        this.selected = false
      } else {
        this.selected = true
      }
    },
    goAddress () {
      this.$router.push({path: 'address'})
    }
  }
}
</script>
<style lang="scss">
  @import "@/lib/reset.scss";
  h1{
    @include text-align();
    @include line-height(0.44rem);
    @include font-weight(normal);
    font-size: 0.16rem !important;
    position: relative;
    span{
      position: absolute;
      left: 0.1rem;
    }
  }
  .orderHeader{
    position: fixed;
    z-index: 9999;
    @include background-color(#fff);
    @include rect(100%, 0.44rem);
    border-bottom: 3px double #bfbfc0;
    h1{
      i{
        float: right;
        @include font-size(0.12rem);
        @include margin(0 0.2rem 0 0);
      }
      em{
        @include margin(0 0 0 0.3rem);
      }
    }
  }
  .orderContent{
    @include rect(100%, auto);
    @include padding(0.44rem 0 0.6rem 0);
    .order_content_title{
      @include rect(100%,0.6rem);
      @include padding(0 0.15rem);
      @include text-align();
      @include flexbox();
      @include justify-content(space-between);
      @include line-height(0.6rem);
      p{
        color: rgb(182, 9, 9);
        @include font-size(0.14rem);
      }
      .address{
        @include font-size(0.13rem);
        @include text-color(#333);
        span{
          @include text-color(#333);
          @include font-size(0.13rem);
        }
      }
      span{
        @include font-size(0.2rem);
        @include text-color(#ccc);
      }
    }
    .order_border_top{
      @include rect(100%,0.02rem);
      background-image: url("https://static.home.mi.com/youpin/static/m/res/images/addressline.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .order_pay_methods{
      ul{
        @include rect(100%, 1rem);
        border-top: 0.05rem solid #f5f5f5;
        border-bottom: 0.05rem solid #f5f5f5;
        @include padding(0 0.15rem);
        li{
          @include rect(100%, 0.4rem);
          @include text-align();
          @include flexbox();
          @include justify-content(space-between);
          @include align-items();
          &:nth-child(1){
            border-bottom: 0.02rem solid #eee;
            @include rect(100%, 0.42rem)
          }
          span{
            &.icon-zhifubao{
              @include font-size(0.26rem);
              @include text-color(#72c7fd);
            }
            &.icon-shoufuwancheng{
              @include font-size(0.24rem);
              @include text-color(#f25d5d);
            }
            i{
              @include font-size(0.12rem);
              @include text-color(#333);
              @include line-height(0.5rem);
              @include margin(0 0 0.2rem 0.1rem)
            }
          }
          img{
            @include rect(0.2rem, 0.2rem);
          }
        }
      }
    }
    .send_method{
      @include rect(100%, 0.4rem);
      p{
        @include text-color(#000);
        @include rect(100%, 100%);
        @include line-height(0.4rem);
        @include padding(0 0 0 0.2rem);
      }
    }
    .products{
      @include padding(0 0.15rem);
      border-top: 1px solid #ccc;
      ul{
        li{
          @include rect(100%, 1rem);
          @include padding(0.15rem 0);
          @include flexbox();
          // @include justify-content(space-between);
          border-bottom: 1px solid #e5e5e5;
          .product_img{
            @include rect(0.7rem, 100%);
            @include padding(0 0.1rem 0 0);
            img{
              @include rect(0.6rem, 0.6rem);
            }
          }
          .product_detail{
            @include rect(2.6rem, 100%);
            h3{
              @include font-weight(normal);
              @include font-size(0.13rem);
              @include padding(0 0 0.05rem 0);
            }
            p {
              span {
                @include text-color(#ab8a59);
              }
              i{
                @include font-size(0.11rem);
                @include text-color(#999);
              }
            }
            span{
              @include text-color(#b60909);
              @include font-size(0.18rem);
              i{
                @include font-size(0.12rem);
              }
            }
          }
          .product_num{
            @include flexbox();
            @include align-items();
            span{
              @include text-color(#ccc);
            }
          }
        }
      }
      .userEdit{
        @include rect(100%, 0.5rem);
        @include flexbox();
        @include align-items();
        span{
          @include font-size(0.13rem);
          @include text-color(#333);
          @include padding(0 0.3rem 0 0);
        }
        input{
          @include rect(2.6rem,0.4rem);
          border: none;
          @include font-size(0.12rem);
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
        i{
        }
      }
      .otherInfo{
        @include flexbox();
        @include justify-content(space-between);
        @include font-size(0.13rem);
        p{
          @include text-color(#333);
          @include padding(0 0.3rem 0 0);
        }
        i{
          @include text-color(#999);
          &.pay_money{
            @include text-color(#b60909);
          }
        }
      }
      .proPrice{
        border-bottom: none;
      }
    }

  }
  .orderFooter{
    @include rect(100%,0.6rem);
    @include flexbox();
    @include justify-content(space-between);
    @include background-color(#fff);
    z-index: 999;
    border-top: 0.01em solid #ccc;
    position: fixed;
    bottom: -0.02rem;
    left: 0;
    .countMoney{
      @include flexbox();
      @include justify-content();
      @include align-items();
      @include font-size(0.13rem);
      @include padding(0.15rem);
      span{
        @include text-color(#333);
      }
      i{
        @include text-color(#b60909);
      }
    }
    .orderPay{
      @include rect(1.2rem, 0.6rem);
      @include background-color(#b60909);
      @include text-align();
      @include text-color(#fff);
      span{
        @include line-height(0.6rem);
        @include font-size(0.13rem);
      }
    }
  }
</style>

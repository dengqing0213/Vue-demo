<template>
  <div>
    <div class="cartHeader">
      <h1><span class="iconfont icon-jiantou2" style="font-size: 0.24rem" @click='goBack'></span><em>购物车</em></h1>
    </div>
    <div class="cart_content">
      <div class="cart_attention" v-if="loginIs">
        <img src="https://static.home.mi.com/youpin/static/m/res/images/cart_empty.png"/>
        <p>登录后才能看到商品噢</p>
        <span @click='login'>立即登录</span>
      </div>
      <div class="cart_no_product" v-if="noPro">
        <img src="https://static.home.mi.com/youpin/static/m/res/images/cart_empty.png"/>
        <div class="cart_no_product_title">
          <p>购物车还没有商品哦~</p>
          <span @click='home'>去逛逛</span>
        </div>
      </div>
      <div class="cart_proList" v-if="proList">
        <div class="proTitle">
          <h1>
            <img src="https://static.home.mi.com/youpin/static/m/res/images/std_icon_checkbox_check.png" v-if="selected" @click="checkedAll"/>
            <img src="https://static.home.mi.com/youpin/static/m/res/images/std_icon_checkbox_uncheck.png" v-else @click="checkedAll"/>
            <i>热卖爆品</i></h1>
          <span>已免运费</span>
        </div>
        <div class="proListDetail">
          <ul>
            <li v-for="(item, index) in shopList" :key="item.gid">
              <div class="checkImg">
                <img src="https://static.home.mi.com/youpin/static/m/res/images/std_icon_checkbox_check.png" v-if="item.selected" @click="checkedOne(item.gid)"/>
                <img src="https://static.home.mi.com/youpin/static/m/res/images/std_icon_checkbox_uncheck.png"  v-else @click="checkedOne(item.gid)"/>
              </div>
              <div class="proList_content">
                <div class="content_img">
                  <img v-lazy.shopList="item.pic" />
                </div>
                <div class="content_title">
                  <p>{{item.name}}</p>
                  <span>￥<i>{{item.price}}</i></span>
                </div>
              </div>
              <div class="num_count">
                <div class="delBtn" @click="delPro(item.gid,index)"><span class="iconfont icon-shanchu"></span></div>
                <div class="numCount">
                  <div class="productNumber reduceBtn" @click="reduceNum(item)">-</div>
                  <div class="productNumber">{{item.num}}</div>
                  <div class="productNumber addBtn" @click="addNum(item)">+</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="cartFooter" v-if="proList">
      <div class="checkAll">
        <img src="https://static.home.mi.com/youpin/static/m/res/images/std_icon_checkbox_check.png"  v-if="selected" @click="checkedAll"/>
        <img src="https://static.home.mi.com/youpin/static/m/res/images/std_icon_checkbox_uncheck.png" v-else @click="checkedAll"/>
        <span>全选</span>
      </div>
      <div class="countMoney">
        <span>合计：</span><i>￥<em id="money">{{countPrice[1]}}</em></i>
      </div>
      <div class="orderPay" @click="goOrder">
        <span>去结算({{countPrice[0]}})</span>
      </div>
    </div>
   <BackTop></BackTop>
  </div>
</template>

<script>
import Vue from 'vue'
import BackTop from '@/components/BackTop'
import {Toast, MessageBox} from 'mint-ui'
Vue.use(Toast, MessageBox)
export default {
  data () {
    return {
      loginIs: true,
      noPro: false,
      proList: false,
      // rightButtons: [],
      shopList: [],
      activeIndex: -1,
      isCheckedAll: true,
      checkAllBoxFlag: false,
      checkNum: [],
      selected: false,
      selectList: []
    }
  },
  components: {
    BackTop
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    login () {
      this.$router.push({path: 'login'})
    },
    goOrder () {
      var money = document.getElementById('money').innerHTML
      // console.log(money)
      if (money > 0) {
        this.$router.push({path: 'order'})
      } else {
        Toast({
          message: '您还为选择任何商品！',
          position: 'middle',
          duration: 1000
        })
      }
    },
    home () {
      this.$router.push({path: 'home'})
    },
    isLogin () {
      var userName = localStorage.getItem('username')
      if (userName) {
        this.loginIs = false
        this.noPro = true
      }
    },
    hasPro () {
      var prolistStr = localStorage.getItem('MiCart')
      var prolist = JSON.parse(prolistStr)
      // console.log(prolist)
      if (prolist) {
        var len = prolist.length
        if (!this.loginIs) {
          if (len > 0) {
            this.noPro = false
            this.proList = true
          } else {
            this.noPro = true
            this.proList = false
          }
        }
      }
    },
    getShopList () {
      var cartListStr = localStorage.getItem('MiCart')
      var cartList = JSON.parse(cartListStr)
      this.shopList = cartList
      // console.log(this.shopList)
    },
    getSelectList () {
      var cartListStr = localStorage.getItem('MiCart')
      var cartList = JSON.parse(cartListStr)
      this.selectList = cartList
      // console.log(this.selectList)
      localStorage.setItem('selectlist', JSON.stringify(this.selectList))
    },
    reduceNum (item) {
      item.num--
      if (item.num <= 0) {
        item.num = 1
        Toast({
          message: '商品数量已达到最小了哟！',
          position: 'middle',
          duration: 1000
        })
      }
      localStorage.setItem('selectlist', JSON.stringify(this.shopList))
      localStorage.setItem('MiCart', JSON.stringify(this.shopList))
    },
    addNum (item) {
      item.num++
      localStorage.setItem('selectlist', JSON.stringify(this.shopList))
      localStorage.setItem('MiCart', JSON.stringify(this.shopList))
    },
    /* msg () {
      this.$messagebox.confirm('确定要删除吗').then((item, index) => {
        this.delcar(item.gid,index)
      }).catch(err => {
        console.log(err)
      })
    }, */
    delPro (id, index) {
      MessageBox.confirm('确定删除该商品吗?').then(action => {
        this.delcar(id, index)
        this.showmsg()
      })
    },
    delcar (id, index) {
      for (var i = 0; i < this.shopList.length; i++) {
        if (this.shopList[i].gid === id) {
          this.shopList.splice(i, 1)
        }
      }
      localStorage.setItem('MiCart', JSON.stringify(this.shopList))
      localStorage.setItem('selectlist', JSON.stringify(this.shopList))
    },
    showmsg () {
      var len = this.shopList.length
      if (len > 0) {
        this.noPro = false
        this.proList = true
      } else {
        this.noPro = true
        this.proList = false
      }
    },
    checkedAll () {
      if (this.selected) {
        this.selected = false
        for (var i = 0; i < this.shopList.length; i++) {
          this.shopList[i].selected = false
        }
      } else {
        this.selected = true
        if (this.shopList) {
          for (var j = 0; j < this.shopList.length; j++) {
            this.shopList[j].selected = true
          }
        }
      }
      localStorage.setItem('MiCart', JSON.stringify(this.shopList))
    },
    checkedOne (id) {
      var count = 0
      for (var j = 0; j < this.shopList.length; j++) {
        if (this.shopList[j].gid === id) {
          if (this.shopList[j].selected) {
            this.shopList[j].selected = false
            this.selected = false
          } else {
            this.shopList[j].selected = true
          }
        }
        if (this.shopList[j].selected) {
          count++
        }
      }
      if (count === this.shopList.length) {
        this.selected = true
      }
      localStorage.setItem('selectlist', JSON.stringify(this.shopList))
      // console.log(this.shopList)
    }
  },
  created () {
    this.isLogin()
    this.hasPro()
    this.getShopList()
    this.getSelectList()
    this.checkedAll()
    /* this.rightButtons = [
      {
        content: '取消',
        style: { background: 'lightgray', color: '#fff', width: '0.6rem', lineHeight: '1rem', textAlign: 'center' }
      },
      {
        content: '删除',
        style: { background: 'red', color: '#fff', width: '0.6rem', lineHeight: '1rem', textAlign: 'center' },
        handler: () => this.msg()
      }
    ] */
  },
  computed: {
    countPrice () {
      // this.selectList = this.shopList
      // console.log(this.selectList)
      var totalPrice = 0
      var count = 0
      for (var i = 0; i < this.shopList.length; i++) {
        if (this.shopList[i].selected) {
          count++
          totalPrice += this.shopList[i].num * 1 * this.shopList[i].price
        }
      }
      return [count, totalPrice]
    }
  }
}
</script>
<style lang="scss">
  @import '@/lib/reset.scss';
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
  .cartHeader{
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
  .cart_content{
    @include flexbox();
    @include rect(100%, auto);
    @include padding(0 0 0.6rem 0);
    .cart_attention{
      position: absolute;
      left: 30%;
      top:30%;
      text-align: center;
      @include rect(1.5rem, auto);
      img{
        @include rect(1.2rem, 1rem);
      }
      p{
        color: rgb(153, 153, 153);
       @include font-size(0.13rem);
        @include margin(0.32rem 0 0.1rem 0);
      }
      span{
        display: inline-block;
        @include rect(1rem,0.35rem);
        @include text-align();
        @include line-height(0.35rem);
        @include padding(0 0.05rem 0 0.05rem);
        color: rgb(119, 119, 119);
        border:1px solid #999;
        border-radius: 5px;
      }
    };
    .cart_no_product{
      @include padding(0.3rem 0 0 0.5rem);
      @include flexbox();
      @include justify-content(space-around);
      img{
        @include rect(1.2rem, 1rem);
      }
      .cart_no_product_title{
        @include margin(0.2rem 0 0 0.3rem);
        p{
          @include text-color(#988378);
        }
        span{
          display: inline-block;
          @include rect(.8rem, 0.25rem);
          @include background-color(#e27368);
          @include text-align();
          @include line-height(0.25rem);
          @include padding(0 0.15rem 0 0.15rem);
          @include text-color(#fff);
          @include margin(0.1rem 0 0 0);
        }
      }
    };
    .cart_proList{
      @include margin(0.44rem 0 0 0);
      @include padding(0 0.1rem);
      @include rect(100%,auto);
      .proTitle{
        @include flexbox();
        @include rect(100%, 0.5rem);
        @include justify-content(space-between);
        border-bottom: 1px solid #eeeeee;
        // @include padding(0 0.1rem 0 0.1rem);
        h1{
          @include line-height(0.5rem);
          @include text-align(left);
          @include font-weight(bold);
          font-size: 0.14rem !important;
          img{
            @include rect(0.2rem, 0.2rem);
            @include margin(0 0.1rem 0 0);
          }
        }
        span{
          @include font-size(0.13rem);
          @include margin(0 0 0 0);
          @include line-height(0.5rem);
          @include text-color(#999);
        }
      };
      .proListDetail{
        ul{
          @include rect(100%, auto);
          li{
            @include rect(100%, auto);
            @include flexbox();
            @include justify-content(space-between);
            .mint-cell-left{
              @include padding(0 0.08rem);
            }
            .mint-cell-right{
              right:-0.01rem;
            }
            .checkImg{
              @include flexbox();
              @include justify-content();
              @include align-items();
              img{
                @include rect(0.2rem, 0.2rem);
                @include margin(0 0.1rem 0 0);
              }
            }
            .proList_content{
              @include flexbox();
              @include justify-content(flex-start);

              .content_img{
                @include background-color(#f5f5f5);
                @include padding(0.1rem);
                @include margin(0.1rem 0.1rem 0.1rem 0);
                img{
                  @include rect(0.64rem, 0.64rem);
                }
              }
              .content_title{
                @include flexbox();
                @include flex-direction(column);
                @include justify-content(space-between);
                @include margin(0.1rem 0);
                p{
                  width: 1rem;
                }
                span{
                  @include text-color(#b60909);
                  @include font-size(0.1rem);
                  i{
                    @include font-size(0.16rem);
                  }
                }
              }
            }
            .num_count{
              @include flexbox();
              @include flex-direction(column);
              @include justify-content(space-around);
              @include align-items();
              .delBtn{
                span{
                  @include text-color(#ccc);
                }
              }
              .numCount{
                @include flexbox();
                @include justify-content(flex-start);
                @include rect(0.8rem, 0.3rem);
                .productNumber{
                  border: 1px solid #e0e0e0;
                  @include rect(0.3rem, 0.25rem);
                  @include background-color(#fff);
                  @include text-align();
                  @include line-height(0.24rem);
                }
              }
            }
          }
        }
      }
    }
  }
  .cartFooter{
    @include rect(100%,0.6rem);
    @include flexbox();
    @include justify-content(space-between);
    @include background-color(#fff);
    z-index: 999;
    border-top: 1px solid #eee;
    position: fixed;
    bottom: -0.02rem;
    left: 0;
    .checkAll{
      @include flexbox();
      @include justify-content();
      @include align-items();
      @include margin(0 0 0 0.2rem);
      img{
        @include rect(0.2rem, 0.2rem);
        @include margin(0 0.1rem 0 0);
      }
      span{
        @include font-size(0.13rem);
      }
    }
    .countMoney{
      @include flexbox();
      @include justify-content();
      @include align-items();
      @include font-size(0.13rem);
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

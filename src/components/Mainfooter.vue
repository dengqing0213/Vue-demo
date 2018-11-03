<template>
  <footer class="footer">
    <ul>
      <router-link to="/home" tag="li">
        <span class="iconfont icon-shouye"></span>
        <p>首页</p>
      </router-link>
      <router-link to="/kind" tag="li">
        <span class="iconfont icon-fenlei"></span>
        <p>分类</p>
      </router-link>
      <router-link to="/taste" tag="li">
        <span class="iconfont icon-pinweishenghuo"></span>
        <p>品味</p>
      </router-link>
      <router-link to="/cart" tag="li">
        <span class="iconfont icon-gouwuche1" ><i id="footerCart" v-if="cartNumber!==0">{{cartNumber}}</i></span>
        <p>购物车</p>
      </router-link>
      <router-link to="/user" tag="li">
        <span class="iconfont icon-tubiaolunkuo-"></span>
       <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      cartNumber: 0
    }
  },
  methods: {
    getCarNum () {
      var cartListStr = localStorage.getItem('MiCart')
      var cartList = JSON.parse(cartListStr)
      if (cartList) {
        for (var i = 0; i < cartList.length; i++) {
          this.cartNumber += Number(cartList[i].num)
        }
      }
    }
  },
  created () {
    this.getCarNum()
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
  .footer{
    ul{
      @include rect(100%, 100%);
      @include flexbox();
      li{
        @include flex();
        @include flexbox();
        @include flex-direction(column);
        @include justify-content();
        @include align-items();
        span{
          position: relative;
          @include font-size(24px);
          @include text-color(#845f3f)
        }
        p{
          @include font-size(12px);
          font-family: Arial;
        }
        &.router-link-active{
         @include text-color(#845f3f);
        }
        #footerCart{
          position: absolute;
          left:0.2rem;
          display: inline-block;
          @include rect(0.15rem, 0.15rem);
          @include background-color(red);
          @include text-color(#fff);
          @include font-size(0.12rem);
          @include text-align();
          border-radius: 50%;
        }
      }
    }
  }
</style>

<template>
  <div>
    <div class="user_header">
      <img src="https://static.home.mi.com/youpin/static/m/res/images/icon_default_head_portrait.png"/>
      <h5 @click='login'>{{username}}</h5>
      <p class="iconfont icon-jiantouxiangyou" @click='login' v-if="loginState"></p>
    </div>
    <div class="my_order">
      <h1>我的订单</h1>
      <ul>
        <li><span class="iconfont icon-daifukuan"></span><p>待付款</p></li>
        <li><span class="iconfont icon-daishouhuo"></span><p>待收货</p></li>
        <li><span class="iconfont icon-chenggong"></span><p>待评价</p></li>
        <li><span class="iconfont icon-tuikuan"></span><p>退款订单</p></li>
      </ul>
    </div>
    <div class="order_img">
      <img src="https://static.home.mi.com/youpin/static/m/res/images/newUserBanner.png"/>
    </div>
    <div class="my_assets">
      <ul>
        <li><p><span class="iconfont icon-qianbao"></span>我的资产<i class="iconfont icon-jiantouxiangyou" @click='login'></i><i style="float: right;font-size: 0.12rem;color: #ccc">优惠券/积分</i></p></li>
        <li><p><span class="iconfont icon-pintuanzhuanqu"></span>拼团订单<i class="iconfont icon-jiantouxiangyou" @click='login'></i></p></li>
        <li style="border-bottom: none"><p><span class="iconfont icon-wodeshoucang"></span>我的收藏<i class="iconfont icon-jiantouxiangyou" @click='login'></i></p></li>
        <li style="background-color: #f5f5f5;height: 0.05rem;border-bottom: none"></li>
        <li><p><span class="iconfont icon-gerenzhongxindizhiguanli"></span>地址管理<i class="iconfont icon-jiantouxiangyou" @click='login'></i></p></li>
        <li><p><span class="iconfont icon-xiaoxi"></span>消息中心<i class="iconfont icon-jiantouxiangyou" @click='login'></i></p></li>
        <li><p><span class="iconfont icon-fankui"></span>帮助与反馈<i class="iconfont icon-jiantouxiangyou" @click='login'></i></p></li>
        <li class="exit" v-if="isLogin">
          <input type="button" name='exit_button' value="退出" class="exit_button" @click="exit"/>
        </li>
      </ul>
      <BackTop></BackTop>
    </div>
  </div>
</template>

<script>
import BackTop from '@/components/BackTop'
export default {
  data () {
    return {
      loginState: true,
      username: '请登录',
      isLogin: false
    }
  },
  created () {
    var user = localStorage.getItem('username')
    if (user) {
      this.username = user
      this.isLogin = true
      this.loginState = false
    }
  },
  methods: {
    login () {
      // 跳转方法,三种
      // this.$router.push('/login')
      // this.$router.push({name: 'login'})
      this.$router.push({path: 'login'})
    },
    register () {
      this.$router.push('/register')
    },
    exit () {
      this.$router.push({path: 'home'})
      localStorage.setItem('username', '')
    }
  },
  components: {
    BackTop
  }
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
  .user_header{
    @include rect(100%, 1rem);
    @include flexbox();
    @include justify-content(space-around);
    @include align-items();
    background-image: url(https://static.home.mi.com/youpin/static/m/res/images/personal_bg_top.png);
    background-size: 100%;
    img{
      @include rect(0.6rem, 0.6rem);
    }
    h5{
      @include text-color(#fff);
      @include font-size(0.14rem);
      @include font-weight(normal);
      @include margin(0 1.5rem 0 0);
    }
    p{
      @include text-color(#ccc);
      @include font-size(0.26rem);
    }
  }
  .my_order{
    h1{
      @include font-weight(normal);
      font-size: 0.16rem !important;
      border-bottom: 1px solid #ccc;
      @include padding(0 0.1rem 0 0.2rem);
      @include rect(100%, 0.44rem);
      @include line-height(0.44rem);
      span{
        @include font-size(0.24rem);
        @include text-color(#999);
        float: right;
      }
    }
    ul{
      @include rect(100%, 0.8rem);
      @include flexbox();
      @include justify-content(space-around);
      li{
        @include text-align();
        span{
          @include font-size(0.3rem);
          @include text-color(#845f3f);
        }
        p{
          @include font-size(0.12rem);
          color: rgba(0, 0, 0, 0.6);
          @include margin(0.05rem 0 0 0);
        }
      }
    }
  }
  .order_img{
    @include rect(100%,0.8rem);
    img{
      @include rect(100%, auto);
    }
  }
  .my_assets{
    ul{
      @include rect(100%,auto);
      li{
        @include rect(100%, 0.5rem);
        @include text-color(#333);
        @include font-size(0.14rem);
        @include padding(0 0 0 0.3rem);
        border-bottom: 1px solid #ccc;
        p{
          @include line-height(0.5rem);
          .iconfont{
            @include font-size(0.2rem);
            @include text-color(#ccc);
            @include margin(0 0.1rem 0 0);
            #my_jiFen{
              float: right;
              @include font-size(0.1rem);
            }
          }
          i{
            float: right;
          }
        }
        &.exit{
          @include background-color(#f5f5f5);
          @include rect(100%,auto);
          min-height: 0.08rem;
          border-bottom: none;
          text-align: center;
          .exit_button{
            @include rect(1rem,0.44rem);
            @include line-height(0.44rem);
            border-radius: 5px;
            border:1px solid #999999;
            @include background-color(#fff);
            @include margin(0.08rem 0 0 0);
          }
        }
      }
    }
  }
</style>

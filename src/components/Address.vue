<template>
  <div>
    <div class="addressHeader">
      <h1><span class="iconfont icon-jiantou2" style="font-size: 0.24rem" @click='goBack'></span><em>新增地址</em></h1>
    </div>
    <div>
      <div class="my_assets">
        <ul>
          <li><span>收货人姓名</span><input type="text" placeholder="请输入姓名" id="user"/></li>
          <li><span>手机号码</span><input type="text" placeholder="请输入手机号" id="phone"/></li>
          <li><span>收货地址</span><input type="text" placeholder="请输入收货地址" id="address"/></li>
          <li class="defaultImg">
            <img src="https://static.home.mi.com/youpin/static/m/res/images/std_icon_checkbox_check.png" @click="defaultAdd" v-if="selected"/>
            <img src="https://static.home.mi.com/youpin/static/m/res/images/unselect.png" @click="defaultAdd" v-else/>
            <span>设为默认地址</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: false
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    defaultAdd () {
      if (this.selected) {
        this.selected = false
      } else {
        this.selected = true
        var user = document.querySelector('#user').value
        var phone = document.querySelector('#phone').value
        var address = document.querySelector('#address').value
        var addressObj = {
          user: user,
          phone: phone,
          address: address
        }
        localStorage.setItem('userAddress', JSON.stringify(addressObj))
      }
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
  .addressHeader{
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
  .my_assets{
    @include padding(0.44rem 0.15rem 0 0.15rem);
    ul{
      @include rect(100%,auto);
      li{
        @include flexbox();
        @include align-items();
        @include rect(100%, 0.5rem);
        @include text-color(#333);
        @include font-size(0.14rem);
        @include padding(0 0 0 0.3rem);
        border-bottom: 1px solid #ccc;
        span{
          @include line-height(0.5rem);
        }
        input{
          @include rect(1.5rem,0.3rem);
          @include margin(0 0 0 0.2rem);
          border: none;
          @include font-size(0.12rem);
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
        }
      }
    .defaultImg {
      border-bottom: none;
      img {
        @include rect(0.2rem, 0.2rem);
        @include margin(0 0.1rem 0 0)
      }
    }
  }

</style>

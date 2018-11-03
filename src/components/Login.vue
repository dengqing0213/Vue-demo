<template>
  <div class="login">
    <div class="loginHeader">
        <h1>
          <h2><span class="iconfont icon-xiaomi"></span></h2>
          <p>小米账号登录</p>
        </h1>
    </div>
    <div style="padding: 0.2rem">
      <mt-field placeholder="手机号" name="username" v-model="username" :state="usernameState" :attr="{ maxlength: 11 }"></mt-field>
      <mt-field placeholder="密码" name="password" type="password" v-model="password" :state="passwordState"></mt-field>
    </div>
    <div class="loginContent">
      <input name="login" type="submit" value="登录" class="login_btn" @click="login"/>
      <p @click="register">立即注册</p>
      <span>其他方式登录</span>
      <p class="iconfont_img">
        <span class="iconfont icon-qq"></span>
        <span class="iconfont icon-yduixinlangweibo"></span>
        <span class="iconfont icon-zhifubao"></span>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {Field, Toast, MessageBox} from 'mint-ui'
Vue.use(Toast, MessageBox, Field)
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    login () {
      if (this.username !== '' & this.password !== '') {
        axios({
          method: 'post',
          url: '/ele/users/login',
          data: {
            username: this.username,
            password: this.password
          }
        }).then((res) => {
          if (res.data === 1) {
            localStorage.setItem('username', this.username)
            window.history.go(-1)
          }
        })
      } else {
        Toast({
          message: '用户或密码不能为空！',
          position: 'middle',
          duration: 1000
        })
      }
    }
  },
  computed: {
    usernameState () {
      // console.log(this.username)
      if (this.username === '') {
        return ''
      }
      if (/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.username)) {
        return 'success'
      } else {
        return 'error'
      }
    },
    passwordState () {
      if (this.password === '') {
        return ''
      }
      if (/^(\w){6,20}$/.test(this.password)) {
        return 'success'
      } else {
        return 'error'
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/lib/reset.scss";
.loginHeader{
  @include rect(100%, 1.5rem);
  @include text-color(black);
  @include font-size(14px);
  position: relative;
  h1{
    @include text-align();
    @include padding(0.9rem);
    h2{
      @include rect(0.5rem, 0.5rem);
      @include background-color(#ff6700);
      border-radius: 5%;
      position: absolute;
      left:40%;
      top:0.3rem;
      .iconfont{
        @include text-color(#fff);
        @include font-size(0.3rem);
      }
    }
    p{
      @include font-size(0.2rem);
      @include font-weight(normal);
    }
  }
}
  .loginContent{
    @include text-align();
    @include margin(0.3rem 0 0 0);
    .login_btn{
      @include text-color(#fff);
      @include rect(90%, 0.44rem);
      @include background-color(#ff6700);
      border: none;
      border-radius: 0.05rem;
      @include font-size(0.20rem);
      @include line-height(0.44rem);
    }
    p{
      @include font-size(0.16rem);
      @include margin(0.1rem 0 0.4rem 0);
    }
    span{
      @include font-size(0.12rem);
      @include text-color(#b0b0b0);
    }
    .iconfont_img{
      span{
        @include font-size(0.4rem);
        @include margin(0 0.1rem 0 0);
        &:nth-child(1){
          @include text-color(#72c7db);
        }
        &:nth-child(2){
          @include text-color(#f25d5d);
        }
        &:nth-child(3){
          @include text-color(#6bb6ea);
        }
      }

    }
  }
</style>

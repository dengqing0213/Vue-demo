<template>
  <div>
    <div class="loginHeader">
      <h1>
        <h2><span class="iconfont icon-xiaomi"></span></h2>
        <p>小米账号注册</p>
      </h1>
    </div>
    <div style="padding: 0.2rem">
      <mt-field placeholder="手机号" v-model="username" :state="usernameState" :attr="{ maxlength: 11 }"></mt-field>
      <mt-field placeholder="密码" type="password" v-model="password" :state="passwordState"></mt-field>
      <mt-field placeholder="再次输入密码" type="password" v-model="repassword" :state="repasswordState"></mt-field>
    </div>
    <div class="registerContent">
      <input name="register" type="submit" value="立即注册" class="register_btn" @click="register"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Field } from 'mint-ui'
Vue.component(Field.name, Field)
export default {
  data () {
    return {
      username: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    register () {
      axios({
        method: 'post',
        url: '/ele/users/register',
        data: {
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        console.log(res.data)
      })
    }
  },
  computed: {
    usernameState () {
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
    },
    repasswordState () {
      if (this.repassword === '') {
        return ''
      }
      if (this.repassword === this.password) {
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
  .registerContent{
    @include text-align();
    @include margin(0.3rem 0 0 0);
    .register_btn{
      @include text-color(#fff);
      @include rect(90%, 0.44rem);
      @include background-color(#ff6700);
      border: none;
      border-radius: 0.05rem;
      @include font-size(0.20rem);
      @include line-height(0.44rem);
    }
  }
</style>

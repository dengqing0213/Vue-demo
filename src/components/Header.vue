<template>
  <header class="header">
    <div class="nav_title">
      <img src="https://static.home.mi.com/youpin/static/m/res/images/navi_title_v4.png">
    </div>
    <div class="search" @click="toSearch">
      <span class="iconfont icon-search" style="font-size: 22px"></span>
      <span style="font-size: 12px">居家热卖</span>
    </div>
    <div class="email">
      <span class="iconfont icon-youjian" style="font-size: 18px;margin-left: 0.25rem"></span>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    toSearch () {
      this.$router.push({path: 'search'})
    }
  }
}
</script>
<style lang="scss">
  @import "@/lib/reset.scss";
  .nav_title{
    img{
      @include rect(.6rem,60%);
    }
  }
</style>


<template>
  <div id="backTop" @click="toTop"><span class="iconfont icon-huidaodingbu" style="font-size: 0.24rem"></span></div>
</template>

<script>
export default {
  methods: {
    toTop () {
      document.getElementById('content').scrollTop = 0
    }
  }
}
</script>
<style lang="scss">

</style>

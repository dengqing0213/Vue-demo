<template>
  <div class="home_product_list">
    <div v-for="(item, index) in homeProlist" :key="index">
      <div class="home_product_list_img">
        <img v-lazy.homeProlist="item.data.pic_url" />
      </div>
      <div class="home_product_lists">
        <ul>
          <router-link tag="li" :to="{name:'detail',params:{id: itemSmall.gid}}" v-for="itemSmall in item.data.items" :key="itemSmall.gid">
            <div class="home_product_lists_top">
              <img v-lazy.homeProlist="itemSmall.pic_url"/>
              <span class="span_inline_block" v-if="itemSmall.market_price != itemSmall.price_min">直降{{ itemSmall.market_price / 100 - itemSmall.price_min / 100}}元</span>
            </div>
            <p>{{itemSmall.name}}</p>
            <i>￥<span>{{itemSmall.market_price | capitalize}}</span>起</i>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['homeProlist'],
  filters: {
    capitalize: function (value) {
      value = value / 100
      return value
    }
  }
}
</script>
<style lang="scss">

</style>

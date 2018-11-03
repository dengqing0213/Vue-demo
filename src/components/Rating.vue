<template>
  <ul class="rating">
    <li :class="rating >= 2 ? 'active' : '' ">&#9733;</li>
    <li :class="rating >= 4 ? 'active' : '' ">&#9733;</li>
    <li :class="rating >= 6 ? 'active' : '' ">&#9733;</li>
    <li :class="rating >= 8 ? 'active' : '' ">&#9733;</li>
    <li :class="rating >= 10 ?'active' : '' ">&#9733;</li>
    <li class="average">{{rating | ratingFilter}}</li>
  </ul>
</template>

<script>
export default {
  props: ['rating'],
  filters: {
    //
    'ratingFilter': (val) => {
      const result = (val / 2).toFixed(1)
      return result + '分'
    }
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
  .rating{
    @include flexbox();
    li{
      @include text-color(#eee);
      @include margin(0 0.03rem 0 0.03rem);
      &.active{
        @include text-color(#F66);
      }
      &.average{
        @include text-color(#f66);
        @include margin(0 0 0 0.2rem);
        font-style: italic;
      }
    }
  }
</style>

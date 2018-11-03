<template>
  <div class="container">
    <router-view name="header"/>
    <div class="content" id="content">
      <router-view name="content"/>
    </div>
    <router-view name="footer"/>
  </div>
</template>

<script>
export default {
}
</script>

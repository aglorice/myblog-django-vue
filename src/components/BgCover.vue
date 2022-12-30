<template>
  <div class="bg-cover" v-if="showCover"></div>
</template>

<script>
export default {
  name: `BgCover.vue`,
  props:['showCover']
}
</script>

<style scoped lang="scss">
.bg-cover {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .8);
  z-index: 98;
}
</style>

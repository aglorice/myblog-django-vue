<template>
<div>
  <div class="container_head">
    <h1>分类</h1>
    <h4>{{this.$route.params.category}}</h4>
  </div>
</div>
</template>

<script>
export default {
  name: `categoryArticle`,
  data(){
    return{

    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px) {

}
.container_head {
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/backgound-img/index.png");
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  //background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;

  h1 {
    font-size: 3em;
    color: white;
  }
  h4 {
    color: white;
  }
}
</style>

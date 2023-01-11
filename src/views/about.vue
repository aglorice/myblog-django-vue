<template>
  <div class="about">
    <div class="container_head">
      <h1>关于我</h1>
    </div>
    <div class="container_body">
      <v-md-preview
                    v-if="!loading"
                    :text="about"
                    ref="preview">
      </v-md-preview>
      <div class="row">
        <div class="col-md-12 col-lg-6" >
          <category-charts></category-charts>
        </div>
        <div class="col-md-12 col-lg-6" >
          <pag-charts></pag-charts>
        </div>
        <div class="col-lg-12" >
          <recent-article></recent-article>
        </div>
      </div>


    </div>
  </div>

</template>

<script>
import {getAbout} from "@/api/http";
import pagCharts from "@/components/pagCharts";
import categoryCharts from "@/components/categoryCharts";
import recentArticle from "@/components/recentArticle";

export default {
  name: `about`,
  data(){
    return{
      loading:false,
      about:'123123',
      chartDate:{}
    }
  },
  components:{
    pagCharts,
    categoryCharts,
    recentArticle
  },
  mounted() {
    this.getRemind(); // 获取个人简介
  },

  methods:{
    getRemind(){
      getAbout(null).then((res) => {
        if (res.code === 200) {
          this.about = res['context'][0]['fields']['content']
          // 将信息提交到vuex
        } else {
          this.$message({
            type: 'info',
            message: '数据获取失败',
            duration: 1500
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px) {
  .container_body {
    width: 90% !important;
  }
}
.container_head {
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/backgound-img/about.png");
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

}
.about {
  @include background_color("background_color1");
  @include font_color("font_color1");
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container_body {

  width: 70%;
}



</style>

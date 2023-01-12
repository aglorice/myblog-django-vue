<template>
<div>
  <div class="container_head">
    <h1>分类</h1>
    <h4>{{this.$route.params.category}}</h4>
  </div>
  <div class="container_body">
    <h4>一共发现了{{category.length}}篇文章</h4>
    <div class="category_type">
      <el-timeline>
        <el-timeline-item v-for="(value) in category"
                          :timestamp="value.created_time"
                          :key="value.id"
                          placement="top">
          <el-card >
            <router-link  :to="`/article/details/${value.id}`"><h4 class="datetime-title-id">{{value.title}}</h4></router-link>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

  </div>
</div>
</template>

<script>



import {getCategoryArticle} from "@/api/http";

export default {
  name: `categoryArticle`,
  data(){
    return{
      category:[]
    }
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    this.getcategoryarticle()
  },
  methods:{
    getcategoryarticle() {
      let params = {
        category:this.$route.params.category
      }
      getCategoryArticle(params).then((res) => {
        if (res.code === 200) {
          this.category = res['context']
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
    }
  }

}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px) {
  .category_type {
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
.container_body {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include background_color("background_color1");
  @include font_color("font_color1");
  h4 {
    margin-top: 20px;
    font-family: Noto Serif SC,serif;
  }
}
.category_type {
  margin-top: 20px;
  width: 70%;
}
</style>

<template>
  <div>
    <div class="container_head">
      <h1>归档</h1>
    </div>
    <div class="datetime">
      <p class="datetime-head">时光荏苒，不知不觉已经过了下面这么多年了</p>
      <div class="datetime-body">
        <el-collapse accordion>
          <el-collapse-item v-for="(value,index) in datetimeArticle"
                            class="datetime-collapse"
                            :key="index">
            <template slot="title">
              {{index}}
              <div class="datetimeArticleNumber">
                <p >{{value.length}}篇</p>
              </div>
            </template>
            <el-timeline>
              <el-timeline-item v-for="(value_item) in value"
                                :timestamp="value_item.created_time"
                                :key="value_item.id"
                                placement="top">
                <el-card >
                  <router-link  :to="`/article/details/${value_item.id}`"><h4 class="datetime-title-id">{{value_item.title}}</h4></router-link>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-collapse-item>
        </el-collapse>
      </div>

    </div>

  </div>

</template>

<script>
import {datetime} from "@/utils/datetime";

export default {
  name: `datetime`,
  data(){
    return{
      datetimeArticle:[]
    }
  },
  mounted() {
    this.datetimeArticle = datetime(this.$store.state.OriginalArticles)

  },
  methods:{
  }
}
</script >

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px) {
  .datetime-body {
    width: 70% !important;
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

}
.datetime {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include background_color("background_color1");
  p {
    @include font_color("font_color1");
  }
  .datetime-head {
    margin: 50px 0 50px 0;
  }
}
.datetime-body {
  width: 80%;
}
.datetimeArticleNumber {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  p {
    margin-bottom: 0;
  }
}

.el-timeline {
  padding-left: 10px;
}
.el-collapse-item__header {
  @include background_color("background_color1");
  @include font_color("font_color1");
}

</style>

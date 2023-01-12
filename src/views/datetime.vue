<template>
  <div>
    <div class="container_head">
      <h1>归档</h1>
    </div>
    <div class="datetime">
      <p class="datetime-head">时光荏苒，不知不觉已经过了下面这么多年了</p>
      <div class="datetime-body">
        <ul >
          <li class="datetime-body-year" v-for="(value,index) in datetimeArticle"
                            :key="index">
            <div>{{index}}</div>
            <ul >
              <li class="datetime-body-article"  v-for="(value_item,index) in value"
                  :key="index">
                <div>
                  <p class="datetime-body-article-start"><i class="el-icon-date"></i>{{value_item.created_time}}</p>
                  <router-link :to="`/article/details/${value_item.id}`"><p class="datetime-body-article-end">{{value_item.title}}</p></router-link>
                </div>
              </li>
            </ul>
          </li>
        </ul>

      </div>

    </div>

  </div>

</template>

<script>

import {getArticleFiletime} from "@/api/http";

export default {
  name: `datetime`,
  data(){
    return{
      datetimeArticle:[]
    }
  },
  mounted() {
    this.getarticlefiletime()

  },
  methods:{
    getarticlefiletime(){
      getArticleFiletime(null).then((res) => {
        if (res.code === 200) {
          this.datetimeArticle = res['context']
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
</script >

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss"; // 主题文件
@import "@/assets/scss/minix.scss"; // ul样式美化
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
  background-image: url("@/assets/img/backgound-img/filetime.png");
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
  @include font_color("font_color1");
  .datetime-head {
    margin: 50px 0 50px 0;
  }
}
.datetime-body {
  width: 80%;
}
.datetime-body-year {
  @include background_color("background_color1");
  @include box_shadow("box_shadow_color1");
    padding-left: 2em;
    position: relative;
    list-style: none;
    &::before {
      @include ul_style
    }
    div {
      font-size: 1.2em;
      height: 2em;

    }
    &:hover:before {
      border: 0.3em darkorange solid;
    }
}
.datetime-body-article {
  padding-left: 2em;
  position: relative;
  list-style: none;
  &::before {
    @include ul_style
  }
  &::after {
    top:(0.28em+1em);
    bottom: 0;
    left: (0.5em-0.15em);
    width: 0.16em;
    background-color: steelblue;
    content: ''; // 伪类生效必须加上这个
    position: absolute;
    height: 3em;
  }
  div {
    font-size: 1em;
    height: 4em;
    padding-left: 5%;
    .datetime-body-article-start {
      font-size: 0.8em;
      .el-icon-date {
        height: 0.8em;
      }
    }
    .datetime-body-article-end{
      transition: 0.5s;
      font-size: 1.2em;

    }
    a {
      text-decoration: none;
      @include font_color("font_color1");
    }
    p {
      margin-bottom: 0;
    }
    &:hover {
      .datetime-body-article-end {
        margin-left: 2em;
      }
    }
  }
  &:hover:before {
    border: 0.3em darkorange solid;
  }

}

</style>

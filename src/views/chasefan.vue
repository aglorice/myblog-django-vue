<template>
<div>
  <div class="container_head">
    <h1>bilibili</h1>
  </div>

  <div class="fans_all">
    <h1 >追番列表</h1>
    <div class="fans row">
        <el-card class="fans-item box-card container-body-card col-xs-6  col-md-4 col-lg-3"
                 v-for="(value) in fansData" :key="value.media_id">
          <a style="text-decoration: none" :href="value.url">
            <div slot="header" class="clearfix">
              <img v-lazy="value.cover" :alt="value.title" referrerPolicy="no-referrer">
            </div>
            <div class="box-card-body">
              <h5>{{value.title}}</h5>
            </div>
          </a>

        </el-card>
    </div>
  </div>
</div>
</template>

<script>
import {getFans} from "@/api/http";
import {startSakura} from "@/utils/fullscreenflower";

export default {
  name: `chasefan`,
  data(){
    return{
      fansData:''
    }
  },
  mounted() {
    this.myStartSakura()
    this.getFans() // 获取番剧信息
  },
  destroyed() {
    // stopp() // 停止樱花
    document.getElementById('canvas_sakura').style.display = 'none'
  },
  methods:{
    // 开启樱花特效
    myStartSakura(){
      if (document.getElementById('canvas_sakura')){
        document.getElementById('canvas_sakura').style.display = 'block'
      }else {
        startSakura() // 樱花特效
      }

    },
    getFans(){
      let param = {
        vmid:1705222226,
      }
      getFans(param).then((res) => {
        if (res.code === 200) {
          let data = res['context']['data']['list']
          this.fansData = data
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@import "@/assets/scss/card/card";
@media (max-width: 750px) {
  .fans{
    width: 80%!important;
  }
}
.clearfix {
  height:100% ;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    max-height: 100%;
  }
}
.container_head {
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/backgound-img/chasefan.png");
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
.container_head {
}
.fans_all {
  padding: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include background_color("background_color1");
  h1 {
    text-align: center;
    margin: 20px 0 20px 0;
    font-family: Noto Serif SC,serif;
  }
}
.fans{
  width: 70%;
}
.fans-item {
  border: 0 ;
  margin-bottom: 20px;

  &:hover {
    transition: 0.8s;
    transform: scale(1.1); /*transform:变形属性，scale：缩放1.1倍 */
    z-index: 35;
  }
  a {
    @include font_color("font_color1");

  }
}
.box-card-body {

  display:-webkit-box;
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis;/*隐藏后添加省略号*/
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1; //想显示多少行
  h5 {
    font-weight: lighter;
    text-align: center;
  }
}

</style>

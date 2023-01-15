<template>
  <el-card  id="box-card" class="box-card container-body-card">
    <div slot="header" class="clearfix">
      <img src="@/assets/img/backgound-img/aglorice.png" alt="">
      <div class="box-card-name">
        <h1>aglorice</h1>
        <p v-text="mySign"></p>
      </div>
      <div class="box-card-count">
        <div class="box-card-count-item">
          <span>文章</span>
          <p>{{this.article.count}}</p>
        </div>
        <div class="box-card-count-item">
          <span>分类</span>
          <p>{{this.article.categorize}}</p>
        </div>
        <div class="box-card-count-item">
          <span>标签</span>
          <p>{{this.article.pag}}</p>
        </div>
      </div>
    </div>
    <div class="box-card-body">
      <el-button id="box-card-body-button" type="primary" @click="githubUrl">follow me</el-button>
      <div class="box-card-body-share">
        <div class="box-card-body-share-item">
          <a href="https://github.com/aglorice">
            <img src="@/assets/img/icon/github.png" alt="" >
          </a>
        </div>
        <div class="box-card-body-share-item">
          <a href="https://blog.csdn.net/aglorice?spm=1000.2115.3001.5343">
            <img src="@/assets/img/icon/csdn.png" alt="">
          </a>
        </div>
        <div class="box-card-body-share-item">
          <a href='https://m.bilibili.com/space/1705222226'>
            <img src="@/assets/img/icon/bilibili.png" alt="" >
          </a>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import {getArticleCount} from "@/api/http";

export default {
  name: `myInfo`,
  data(){
    return{
      mySign:'春暖花开，面朝大海',
      article:{
        count:5,
        categorize:2,
        pag:1
      },

    }
  },
  methods:{
    githubUrl(){
      console.log('123')
      window.open('https://github.com/aglorice','github')
    },
    getarticlecount(){
      getArticleCount(null).then((res) => {
        if (res.code === 200) {
          let data = res['context']
          this.article = data
          this.$store.dispatch('putarticleinfo', data)
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

  },
  mounted() {
    this.getarticlecount()
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/card/card";
.clearfix {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50px;
    transition: all 0.5s; /*transition:过度属性*/
    cursor: pointer;  /*当鼠标进入图片的时候，鼠标的样式变为手型 */
  }
}
.box-card-count {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: lighter;

}
.box-card-count-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin-bottom: 0;
  }
}
.box-card-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 1.7em;
  }
  p {
    font-size: 1em;
    font-weight: lighter;
  }

}
.box-card-body-share {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    width: 24px;
    margin: 0 10px 0 10px;
    height: 24px;
  }

}
#box-card-body-button {
  width: 100%;
  margin-bottom: 10px;
}

</style>

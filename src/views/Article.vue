<template>
  <div>
    <div class="container_head">
      <h1>文章</h1>
    </div>
    <div class="container-body">
      <div class="container-body-articles">
        <div class="container-body-article" v-for="(value,index) in articles" :key="index">
          <div class="container-body-article-cover">
            <router-link :to="`/article/details/${value.id}`"><img   v-lazy="value.imgsrc" alt=""></router-link>
          </div>
          <!--              文章简介-->
          <div class="container-body-article-body">
            <div class="container-body-article-body-div">
              <div class="article-body-head">
                <router-link class="container-body-article-router-link" :to="`/article/details/${value.id}`"><h2>{{value.title}}</h2></router-link>
              </div>
              <div class="container-body-article-body-div-mid">
                <div class="article-body-icon">
                  <i class="el-icon-date"></i>
                  <span >{{value.datetime}}</span>
                </div>
                <div class="split-line">
                  <el-divider direction="vertical"></el-divider>
                </div>
                <div class="article-body-icon">
                  <i class="el-icon-files"></i>
                  <span>{{value.category}}</span>
                </div>
                <div class="split-line">
                  <el-divider direction="vertical"></el-divider>
                </div>
                <div class="article-body-icon">
                  <i class="el-icon-view"></i>
                  <span >{{value.Pageview}}</span>
                </div>
              </div>
              <div class="article-body-content">
                <p>{{value.content}}</p>
              </div>
            </div>

          </div>
        </div>
        <!--    分页-->
        <el-pagination
            background
            :current-page="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-size="pagesize"
            :total="pagecount">
        </el-pagination>
      </div>

    </div >

  </div>

</template>

<script>
import {getArticlePage} from "@/api/http";
import variable from "@/assets/js/variable";

export default {
  name: `Article`,
  data(){
    return{
      articles:this.$store.state.Article,
      currentPage: 1, //  el-pagination 初始页
      pagesize: 10 ,//  el-pagination 每页的数据
      pagecount:0
    }
  },
  mounted() {
    // 获取文章数量
    this.pagecount = this.$store.state.article.count
    // 如果vuex中有数据就直接用,没有则重新请求
    this.handleCurrentChange(1)
  },
  methods:{
    // size-change	pageSize 改变时会触发	每页条数size
    // current-change	currentPage 改变时会触发	当前页currentPage
    handleSizeChange: function(size) {
      // 请求数据
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      document.documentElement.scrollTop = 0;
      //
      if(this.$store.state.Article.length > 0 && currentPage == 1){
        this.articles = this.$store.state.Article
      }else {
        this.currentPage = currentPage
        const params = {
          page:currentPage,
          page_size:this.pagesize
        }
        getArticlePage(params).then((res) => {
          if (res.code === 200) {
            const data = res['context']
            let articles = []
            for (let item in data){
              articles.push({
                id:data[item]['id'],
                title:data[item]['title'],
                datetime:data[item]['created_time'],
                category:data[item]['categorize'],
                Pageview:data[item]['page_view'],
                content:data[item]['describe'],
                imgsrc:variable.base_url_img+data[item]['head_img']
              })
            }
            this.articles = articles
            this.pagecount = res['pagedate']['count']
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
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
// 响应式
@media (max-width: 750px){
  .container-body-articles {
    width: 100vw !important;
  }
  .container-body-article {
    flex-direction:column;
    border-radius: 10px 10px 10px 10px!important;
  }
  .container-body-article-cover {
    border-radius: 10px 10px 0 0!important;
    width: 100% !important;
    img {
      border-radius: 10px 10px 0 0!important;
    }
  }

  .container-body-article-body{
    border-radius: 0 0 10px 10px!important;
  }
}

.container_head {
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/backgound-img/article.png");
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
.container-body-article {
  width: 100%;
  height: 200px;
  margin: 10px 0 10px 0;
  display: flex;
  @include box_shadow("box_shadow_color1");

  border-radius: 10px 10px 10px 10px ;
}
.container-body-all {
  width: 70%;
  margin-top: 20px;
}
.container-body-cards {
  display: flex;
  flex-direction: column;
}
// 首页文章的封面
.container-body-article-cover {
  width: 30%;
  height: 100%;
  background-color: lightskyblue;
  border-radius: 10px 0 0 10px ;
  display: inline-block;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px 0 0 10px;
    transition: all 0.5s; /*transition:过度属性*/
    cursor: pointer;  /*当鼠标进入图片的时候，鼠标的样式变为手型 */
    &:hover{
      /*transform:变形属性，scale：缩放1.1倍 */
      transform: scale(1.1); /*transform:变形属性，scale：缩放1.1倍 */
    }
  }
}
.container-body-article-body {
  flex: 1;
  border-radius: 0 10px 10px 0;
  @include background_color("background_color1");
  @include font_color("font_color1");
}
.container-body-article-body-div {
  margin: 0.8em 0.8em 0 0.8em;
}
//文章简介图标
.container-body-article-body-div-mid {
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: lighter;
  margin: 10px 0 10px 0;
}
.article-body-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    margin-right: 0.5em;
  }
}
.split-line {
  p {
    margin: 0 10px 0 10px;
  }

}
.article-body-content {
  margin: 10px 0 10px 0;
  font-weight: lighter;
  height: 3em;
  // 多行字数溢出省略号
  display:-webkit-box;
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis;/*隐藏后添加省略号*/
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; //想显示多少行
  // 缩进
  text-indent: 2em;
  p {


  }
}
.article-body-head {
  margin-top: 20px;

  h2 {
    display:-webkit-box;
    overflow: hidden; /*超出隐藏*/
    text-overflow: ellipsis;/*隐藏后添加省略号*/
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1; //想显示多少行
    font-size: 1.5em;
  }
}
.container-body-articles {
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container-body {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include background_color("background_color1");
}
.container-body-article-router-link {
  text-decoration: none;
  @include font_color("font_color1");
}
</style>

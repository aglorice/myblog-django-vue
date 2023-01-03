<template>
  <div class="detailarticle">
    <div v-if="!loading" :style="{backgroundImage:'url('+articles.imgsrc+')'}" id="article-body-head" class="container_head">
      <div class="container-body-article-body-div">
        <div  class="article-body-head">
          <span>{{articles.title}}</span>
        </div>
        <div class="container-body-article-body-div-mid">
          <div class="article-body-icon">
            <img  src="@/assets/img/icon/datetime.png" alt="">
            <span >{{articles.datetime}}</span>
          </div>
          <div class="split-line">
            <p>|</p>
          </div>
          <div class="article-body-icon">
            <img src="@/assets/img/icon/category_icon.png" alt="">
            <span>{{articles.category}}</span>
          </div>
          <div class="split-line">
            <p >|</p>
          </div>
          <div class="article-body-icon">
            <img src="@/assets/img/icon/eye.png" alt="">
            <span >{{articles.Pageview}}</span>
          </div>
        </div>
        <div class="article-body-content">
          <p>{{articles.content}}</p>
        </div>
      </div>
    </div>
<!--    <div v-for="(anchor,index) in titles" :key="index"-->
<!--        :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"-->
<!--        @click="handleAnchorClick(anchor)"-->
<!--    >-->
<!--      <a style="cursor: pointer">{{ anchor.title }}{{anchor.indent}}</a>-->
<!--    </div>-->
    <div class="row detailarticle-body">
      <v-md-preview class="detailarticle-body-main col-md-9 col-sm-12 "
                    v-if="!loading"
                    :text="articles.article"
                    ref="preview"
                    @copy-code-success="handleCopyCodeSuccess">
      </v-md-preview>
      <div class="list_tree col-md-3">
        <listtree :listtree="new_listtree" @handleAnchorClick="handleAnchorClick"></listtree>
      </div>
    </div>

  </div>

</template>

<script>
import {getDetailArticle} from "@/api/http";
import variable from "@/assets/js/variable";
import listtree from "@/components/rightCard/listtree";
import {transListToTreeData} from "@/utils/transListToTreeData";

export default {
  name: `detailarticle`,
  data(){
    return{
      articles:null,
      loading:true,
      titles:[],
      new_listtree:'',
      listref:''
    }
  },
  components:{
    listtree
  },
  props:['id'],
  mounted() {
    document.documentElement.scrollTop = 0;
    const params = {
      id:this.id
    }
    // 请求文章
    this.getdetailarticle(params)

  },
  methods:{
    handleAnchorClick(anchor) {

      const { preview } = this.$refs;

      const { lineIndex } = anchor;

      const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
    },
    // 处理目录数据
    handleAnchorData(){
      const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3');
      this.listref = this.$refs
      const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());

      if (!titles.length) {
        this.titles = [];
        return;
      }

      const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

      this.titles = titles.map((el) => ({
        title: el.innerText,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName),
      }));
      this.new_listtree = transListToTreeData(this.titles)
    },



    //复制成功的回调
    handleCopyCodeSuccess(){
      this.$notify({
        title: '成功',
        message: '复制成功',
        type: 'success',
        duration:'1000'
      });
    },
    // 请求文章
    getdetailarticle(params){
      getDetailArticle(params).then((res) => {
        if (res.code === 200) {
          this.$store.dispatch('modifypageview',this.id)
          let data = res['context']
          for (let item in data){
            this.articles={
              id:data[item]['pk'],
              title:data[item]['fields']['title'],
              datetime:data[item]['fields']['created_time'],
              category:data[item]['fields']['categorize'],
              Pageview:data[item]['fields']['page_view'],
              content:data[item]['fields']['describe'],
              pag:data[item]['fields']['pag'],
              article:data[item]['fields']['content'],
              imgsrc:variable.base_url_img+data[item]['fields']['head_img']
            }
          }
          this.loading = false
          // 必须等到dom加载完成后才能对其进行dom操作
          this.$nextTick(async ()=>{
            this.handleAnchorData()
          })


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

}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px){
  .detailarticle-body {
    width: 100% !important;
  }
  .container-body-article-body-div {
    width: 80vw!important;
  }
  .list_tree {
    display: none;
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
.container-body-article-body-div-mid {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.article-body-head {
  margin-top: 20px;

  span {
    text-align: center;
    display:-webkit-box;
    overflow: hidden; /*超出隐藏*/
    text-overflow: ellipsis;/*隐藏后添加省略号*/
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1; //想显示多少行
    font-size: 1.5em;
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
  img {
    width: auto;
    height: 1em;
    margin-right: 10px;
    margin-top: 0.25em;
  }
  span {
    height: 1.2em;
    display: block;
  }
}
.split-line {
  p {
    margin: 0 10px 0 10px;
  }

}

.detailarticle-body {
  width: 90%;

}
.detailarticle-body-main {
  position: relative;
  @include background_color("background_color1");
  @include box_shadow("box_shadow_color1");
  @include font_color("font_color1");
}
.detailarticle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.8s;
  @include background_color("background_color1");
  @include font_color("font_color1");
}
.container-body-article-body-div {
  width: 50vw;
  height: 20vh;
  border-radius: 10px;
  @include background_color("background_color1");
  @include font_color("font_color1");
}
</style>

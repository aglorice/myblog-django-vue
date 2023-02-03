<template>
  <div class="detailarticle">
    <div v-if="!loading" :style="{backgroundImage:'url('+articles.imgsrc+')'}" id="article-body-head" class="container_head">
      <div class="container-body-article-body-div">
        <div  class="article-body-head">
          <span>{{articles.title}}</span>
        </div>
        <div class="container-body-article-body-div-mid">
          <div class="article-body-icon">
            <i class="el-icon-date"></i>
            <span >{{articles.datetime}}</span>
          </div>
          <div class="split-line">
            <el-divider direction="vertical"></el-divider>
          </div>
          <div class="article-body-icon">
            <i class="el-icon-files"></i>
            <span>{{articles.category}}</span>
          </div>
          <div class="split-line">
            <el-divider direction="vertical"></el-divider>
          </div>
          <div class="article-body-icon">
            <i class="el-icon-view"></i>
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
      <el-skeleton class="loading" v-show="loading" :rows="15" animated :throttle="500" />
      <v-md-preview class="detailarticle-body-main col-md-9 col-sm-12 "
                    v-if="!loading"
                    :text="articles.article"
                    ref="preview"
                    @copy-code-success="handleCopyCodeSuccess">

      </v-md-preview>

      <div class="list_tree col-md-3">
        <listtree :listtree="new_listtree" @handleAnchorClick="handleAnchorClick"></listtree>
      </div>
      <div class="article_share_info col-md-9 col-sm-12" v-if="rederShare">
        <p><span>文章标题：</span>{{articles.title?articles.title:'四月是你的谎言'}}</p>
        <p><span>文章作者：</span>aglorice</p>
        <p><span>发布时间：</span>{{articles.datetime?articles.datetime:'????'}}</p>
        <p><span>原始链接：</span>
          <router-link class="container-body-article-router-link" :to="selfWbsite+'/article/details/'+id">
            {{selfWbsite}}/article/details/{{id}}
          </router-link>
        </p>
        <p><span>版权声明：</span>
          本网站发表的全部原创内容（不仅限于文章、图片），著作权均归其发表者所有，均采用
          <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh" rel="external nofollow" target="_blank">CC BY-NC-SA 4.0 CN</a>
          许可协议。转载请注明作者以及原文链接，商业授权请联系作者。
        </p>
      </div>
    </div>


    <mobileArticleMenus v-if="startRenderMenu" :listtree="new_listtree" @handleAnchorClick="handleAnchorClick"></mobileArticleMenus>

  </div>

</template>

<script>
import {getDetailArticle} from "@/api/http";
import variable from "@/assets/js/variable";
import listtree from "@/components/rightCard/listtree";

import {transListToTreeData} from "@/utils/transListToTreeData";
import mobileArticleMenus from "@/components/mobile-article-menus";

export default {
  name: `detailarticle`,
  data(){
    return{
      articles:null,
      loading:true,
      titles:[],
      new_listtree:'',
      listref:'',
      selfWbsite: variable.selfWbsite,
      rederShare:false, // 文章分享的状态
      startRenderMenu:false // 目录加载的时期
    }
  },
  components:{
    listtree,
    mobileArticleMenus
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
      this.startRenderMenu = true // 开始渲染目录
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
            this.rederShare = true;
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '数据获取失败',
          duration: 1500
        });
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
  .loading {
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

}
.split-line {
  p {
    margin: 0 10px 0 10px;
  }

}

.detailarticle-body {
  width: 90%;

}
.loading {
  height: 60vh;
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
.article_share_info {
  @include background_color("background_color1");
  @include font_color("font_color1");
  @include box_shadow("box_shadow_color1");
  border-radius: 10px;
  margin-top: 20px;
}
</style>

<template>
  <div>
    <div class="container_head">
      <h1>分类</h1>
    </div>
    <div class="category_list">
      <h4>文章分类</h4>
      <p>目前共计{{echartsData.length}}个分类</p>
      <el-skeleton class="loading" v-show="loading" :rows="6" animated :throttle="500" />
      <ul class="category_list_item" v-for="(category_item) in echartsData" :key="category_item.name">
        <li>
          <router-link :to="`/article/category/${category_item.name}/`">{{category_item.name}}</router-link>
          <span>({{category_item.value}})</span>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>
import {getCountCategorize} from "@/api/http";

export default {
  name: `category`,
  data(){
    return{
      echartsData:0,
      loading:true
    }
  },
  components:{

  },
  mounted: function () {
    this.getcountcategorize()
  },
  methods: {
    getcountcategorize() {
      if(this.$store.state.category.length > 0){
        this.echartsData= this.$store.state.category
        this.loading = false
      }else{
        getCountCategorize(null).then((res) => {
          if (res.code === 200) {
            this.echartsData = res['context']
            this.loading = false
            // 将信息提交到vuex
            this.$store.dispatch('put_category',this.echartsData)
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
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@import "@/assets/scss/minix.scss"; // ul样式美化
@media (max-width: 750px) {
  .category_list_item {
    width: 90%!important;
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
  background-image: url("@/assets/img/backgound-img/category.png");
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
.category_list {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include background_color("background_color1");
  @include font_color("font_color1");
  h4 {
    margin-top:  20px;
  }
}
.category_list_item {
  li {
    padding-left: 2em;
    position: relative;
    list-style: none;
    a {
      @include font_color("font_color1");
      &:hover {
        color: skyblue;
      }
    }
    span {
      color: #898a8a;
    }
  }
  li::before {
    @include ul_style
  }
  li:hover:before {
    border: 0.3em darkorange solid;
  }


  width: 70%;
}
.loading {
  height: 20em!important;
  width: 70% !important;
}
</style>

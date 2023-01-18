<template>

<div class="mobile-article-menus-main">
  <bgCover :showCover="showCover"></bgCover>
  <div id="mobile-article-menus-door" class="mobile-article-menus-door">

    <i @click="openMobileMenu" class="el-icon-notebook-1"></i>
    <div class="mobile-article-menus">
      <el-tree
          class="list_tree-mobile"
          :data="listtree"
          accordion
          @node-click="handleNodeClick">
      </el-tree>
    </div>
  </div>
</div>



</template>

<script>
import bgCover from "@/components/BgCover";
export default {
  name: `mobile-article-menus`,
  data(){
    return{
      openMobileMenuStatus:false, // 目录弹窗打开的状态
      showCover:false // 遮罩层
    }
  },
  components:{
    bgCover
  },
  props:['listtree'],
  mounted() {
    document.addEventListener("click", (e) => this.clickOutSide(e));
  },
  beforeDestroy() {
    document.removeEventListener("click", (e) => this.clickOutSide(e));
  },
  methods:{
    clickOutSide(e) {
      let mobile_article_menus_door = document.getElementById("mobile-article-menus-door");
      // 判断鼠标点击到触发按钮和弹出框外的区域 （是则关闭弹窗，反之亦然）
      if (this.showCover && !mobile_article_menus_door.contains(e.target) || this.menu_status) {
        this.colseMobileMenu()
      }
    },
    // 调用父组件的方法
    handleNodeClick(data) {
      this.$emit('handleAnchorClick',data)
    },
    // 打开菜单
    openMobileMenu(){
      document.getElementById('mobile-article-menus-door').style.bottom = '0';
      this.showCover = true
    },
    // 关闭菜单
    colseMobileMenu(){
      document.getElementById('mobile-article-menus-door').style.bottom = '-40vh';
      this.showCover = false
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px){
  .mobile-article-menus-door {

  }
  .el-icon-notebook-1 {
    visibility: visible!important;
  }
}
.mobile-article-menus {
  height: 100%;
  width: 100%;
  z-index: 101;
  overflow-y:scroll;
  @include background_color("background_color1");

}

.list_tree-mobile {
  @include background_color("background_color1");
  height: 100%;
}
.mobile-article-menus-door{
  width: 100vw;
  height: 40vh;
  position: fixed;
  bottom: -40vh;
  transition: 0.8s;
  z-index: 101;
  @include background_color("background_color1");
}
.el-icon-notebook-1 {
  position: fixed;
  left: 0;
  top:50vh;
  visibility: hidden;
  font-size: 2em;
  @include font_color("font_color1");
  margin-left: 5px;
  &:active{
    color: skyblue;
  }
  z-index: 99;
}
.mobile-article-menus-main {
  width: 100vw;

}
</style>
